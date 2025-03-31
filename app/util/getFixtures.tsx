import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';
import { Redis } from "@upstash/redis";

const API_KEY = process.env.API_KEY as string;

// Redis setup
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!REDIS_URL || !REDIS_TOKEN) {
  throw new Error("🚨 Redis environment variables are missing.");
}

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

const leagues =    [
    { league: 253, name: 'EPL' ,yearr:0, startmonth: '2024-08-01', endmonth: '2025-06-01'},
     { league: 39, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
     { league: 140, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
     { league: 78, name: 'EPL' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
     { league: 5, name: 'euro' ,yearr:-1, startmonth: '2024-08-01', endmonth: '2025-06-01'},
     { league: 6, name: 'caf' ,yearr:0, startmonth: '2024-08-01', endmonth: '2025-06-01'},
]

async function fetchFixturesByLeague(
    year: number,
    league: number,
    yearr: number,
    lastWeek: string,
    nextWeek: string
): Promise<Fixture[]> {
    const url = `https://v3.football.api-sports.io/fixtures?league=${league}&season=${year + yearr}&from=${lastWeek}&to=${nextWeek}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
        },
        next: {
            revalidate: 1 * 1 * 15,
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.response ?? [];
    } catch (err) {
        console.log(`Error fetching ${league} fixtures in year ${year}: ${err}`);
        return [];
    }
}

export default async function getFixtures(): Promise<AllFixtures[]> {
    try {
        const allFixturesByLeague: AllFixtures[] = [];
        const currentTime = moment();
        const currentTimeFormat = moment().format('YYYY-MM-DD');
        const year = currentTime.year();
        const month = currentTime.month() + 1; // Month is 0-indexed, so add 1
        const lastWeek = currentTime.subtract(7, 'days').format('YYYY-MM-DD');
        const nextWeek = currentTime.add(10, 'days').format('YYYY-MM-DD');

        // Process 30 leagues at a time
        const leagueChunks = [];
        for (let i = 0; i < leagues.length; i += 80) {
            leagueChunks.push(leagues.slice(i, i + 80));
        }

        for (const chunk of leagueChunks) {
            // Fetch data in parallel for each chunk of 30 leagues
            const fixturePromises = chunk.map(async (league) => {
                // Check if league is within valid time range using `if`
                if (currentTimeFormat > league.startmonth && currentTimeFormat < league.endmonth) {
                    const cacheKey = `fixtures:league-${league.league}`;
                    const cachedDataPromise = redis.get(cacheKey); // Fetch async immediately
                    const cachedData = await cachedDataPromise; // Wait here, but started fetching earlier

                    if (cachedData) {
                        console.log(`✅ Returning cached data for ${league.name} from Redis`);

                        // If cached data is empty, delete it from Redis and fetch fresh data
                        if (typeof cachedData === 'string' && JSON.parse(cachedData).length === 2) {
                            console.log(`⚠️ Empty cache for ${league.name}. Deleting from Redis...`);
                            await redis.del(cacheKey); // Remove the empty data from Redis
                            console.log(`❌ Empty data in cache, fetching fresh data for ${league.name}`);
                            const fixtures = await fetchFixturesByLeague(year, league.league, league.yearr, lastWeek, nextWeek);
                            
                            // Store the fresh data in Redis
                            
                            return {
                                name: league.name,
                                fixtures,
                            };
                        }
                        
                        return {
                            name: league.name,
                            fixtures: typeof cachedData === 'string' ? JSON.parse(cachedData) : cachedData,
                        };
                    }

                    // Cache miss, fetch fresh data
                    console.log(`⏳ Fetching fresh data for ${league.name}...`);
                    const fixtures = await fetchFixturesByLeague(year, league.league, league.yearr, lastWeek, nextWeek);

                    // If fixtures are empty, don't cache and skip
                    if (fixtures.length === 0) {
                        console.log(`⚠️ No fixtures found for ${league.name}. Skipping cache.`);
                        return { name: league.name, fixtures: [] };
                    }

                   // Separate fixtures into finished (FT) and ongoing
                   const finishedFixtures = fixtures.filter(f => f.fixture.status.short === "FT");
                   const ongoingFixtures = fixtures.filter(f => f.fixture.status.short !== "FT");

                   // Store FT fixtures in Redis for 7 days
                   if (finishedFixtures.length > 0) {
                       await redis.set(`${cacheKey}:FTT`, JSON.stringify(finishedFixtures), {ex: 86400});
                   }

                   // Store ongoing fixtures in Redis for 3 minutes, ensuring they persist until refresh
                   if (ongoingFixtures.length > 0) {
                       await redis.set(`${cacheKey}:LIVEE`, JSON.stringify(ongoingFixtures), {ex: 60});
                   }

                    return {
                        name: league.name,
                        fixtures,
                    };
                }

                return { name: league.name, fixtures: [] };
            });

            // Wait for all 30 leagues in the chunk to finish before processing the next chunk
            const results = await Promise.all(fixturePromises);
            allFixturesByLeague.push(...results);
        }

        return allFixturesByLeague;
    } catch (error) {
        console.error('An error occurred while fetching fixtures:', error);
        throw error;
    }
}

