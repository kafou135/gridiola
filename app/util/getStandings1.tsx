import "server-only";
import { Standing } from "@/types";
import moment from "moment";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function getStandings(teamName:string,season:number,leagueid:number): Promise<Standing[]> {
    const currentTime = moment();
    const month = currentTime.month();
    let year = month <= 6 ? currentTime.year() - 1 : currentTime.year();

    const API_KEY: string = process.env.API_KEY as string;
    const options = {
        method: "GET",
        headers: { "X-RapidAPI-Key": API_KEY },
        next: { revalidate: 60 * 60 * 24 }, // Revalidate every 24 hours
    };

    const standings: Standing[] = [];
    const leagues = [
        { league: 140, name: "EPL", yearr: -1 },


    ];

    // Fetch standings in batches of 30 leagues
    for (let i = 0; i < leagues.length; i += 70) {
        const batch = leagues.slice(i, i + 70);

        const fetchPromises = batch.map(async (league) => {
            const cacheKey = `standings11:league-${league.league}`;
            const cachedData = await redis.get(cacheKey);

            if (cachedData) {
                console.log(`✅ Returning cached data for ${league.name} standings from Redis`);
                const parsedData = typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData;

                // If cached data is empty or invalid, delete and fetch fresh data
                if (!parsedData || parsedData.length === 2) {
                    console.log(`⚠️ Empty cache detected for ${league.name}. Deleting...`);
                    await redis.del(cacheKey);
                } else {
                    return parsedData; // Return cached standings
                }
            }

            console.log(`⏳ Fetching fresh standings for ${league.name}...`);
            const url = `https://v3.football.api-sports.io/standings?season=${season}&league=${leagueid}`;

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                const standing = data.response?.[0];

                if (standing) {
                    await redis.set(cacheKey, JSON.stringify(standing), { ex: 172800 }); // Cache for 48 hours
                    return standing;
                } else {
                    console.log(`❌ No valid data for ${league.name}, skipping cache storage.`);
                    return null;
                }
            } catch (err) {
                console.error(`Error fetching ${league.name} standings: ${err}`);
                return null;
            }
        });

        // Process all fetched results in the batch
        const batchResults = await Promise.all(fetchPromises);
        standings.push(...batchResults.filter(Boolean));
    }

    return standings;
}





















