import "server-only";
import { Topscorers } from "@/types";
import moment from "moment";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

async function fetchTopScorers(id: number, yearr: number, API_KEY: string): Promise<Topscorers[]> {
    const currentTime = moment();
    const month = currentTime.month();
    const year = month <= 6 ? currentTime.year() - 1 : currentTime.year();
    const season = year + yearr;

    const url = `https://v3.football.api-sports.io/players/topscorers?season=${season}&league=${id}`;
    const options = {
        method: "GET",
        headers: { "X-RapidAPI-Key": API_KEY },
        next: { revalidate: 15 }, // Not needed with Redis caching
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data?.response ?? [];
    } catch (err) {
        console.error(`❌ Error fetching top scorers for league ${id}:`, err);
        return [];
    }
}

export default async function getTopScorersBatch(leagues: { id: number; yearr: number }[]): Promise<Record<number, Topscorers[]>> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY is missing in environment variables");
    }

    const API_KEY: string = process.env.API_KEY;
    const results: Record<number, Topscorers[]> = {};
    const cacheKeys = leagues.map(({ id, yearr }) => `topscorers:${id}:${yearr}`);

    try {
        // Check Redis cache for all requested leagues
        const cachedResults = await redis.mget(...cacheKeys);

        const leaguesToFetch: { id: number; yearr: number }[] = [];
        cachedResults.forEach((data, index) => {
            if (data) {
                const parsedData = typeof data === "string" ? JSON.parse(data) : data;

                // Prevent returning empty cache data
                if (!parsedData || parsedData.length === 2) {
                    console.log(`⚠️ Empty cache detected for league ${leagues[index].id}. Deleting...`);
                    redis.del(cacheKeys[index]); // Delete empty cache
                    leaguesToFetch.push(leagues[index]); // Mark for fresh fetch
                } else {
                    results[leagues[index].id] = parsedData;
                }
            } else {
                leaguesToFetch.push(leagues[index]); // No cache, fetch fresh
            }
        });

        if (leaguesToFetch.length === 2) {
            console.log("✅ All requested top scorer data found in Redis cache.");
            return results;
        }

        console.log(`⏳ Fetching fresh top scorer data for ${leaguesToFetch.length} leagues...`);

        // Fetch data in parallel
        const fetchPromises = leaguesToFetch.map(async ({ id, yearr }) => {
            const topScorers = await fetchTopScorers(id, yearr, API_KEY);
            return { id, yearr, topScorers };
        });

        // Process all fetched results
        const freshResults = await Promise.all(fetchPromises);
        const redisSetOperations = freshResults.map(({ id, yearr, topScorers }) => {
            results[id] = topScorers;

            // Store in Redis only if valid data exists
            if (topScorers.length > 2) {
                return redis.set(`topscorers:${id}:${yearr}`, JSON.stringify(topScorers), { ex: 86400 });
            } else {
                console.log(`❌ No valid top scorers data for league ${id}, skipping cache storage.`);
                return null;
            }
        });

        await Promise.all(redisSetOperations.filter(Boolean));

        return results;
    } catch (error) {
        console.error("❌ Error fetching top scorers batch:", error);
        return results;
    }
}
