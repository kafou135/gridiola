import "server-only";
import { Lineups } from "@/types";
import { Redis } from "ioredis";

const redis = new Redis({
    host: 'redis-10829.c325.us-east-1-4.ec2.redns.redis-cloud.com',
    password: 'wrjsIJihA6rAyPjiFSiIhazWbfW2lMgC',  // Optional, if required by the service
    port: 10829,
    username:'default',  // Default Redis port, change if your service uses a different one
    maxRetriesPerRequest: null, // Prevents unnecessary reconnections
    enableOfflineQueue: false, // Avoids memory issues
  });
// Function to fetch lineup data for a single fixture
async function fetchLineup(id: number, API_KEY: string): Promise<Lineups[]> {
    const url = `https://v3.football.api-sports.io/fixtures/lineups?fixture=${id}`;
    const options = {
        method: "GET",
        headers: { "X-RapidAPI-Key": API_KEY },
        next: { revalidate: 15 }, // Not needed for Redis caching
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data?.response ?? [];
    } catch (err) {
        console.error(`❌ Error fetching lineup for fixture ${id}:`, err);
        return [];
    }
}

// Function to fetch lineup data in batches of 60 fixtures
export default async function getLineupBatch(ids: number[]): Promise<Record<number, Lineups[]>> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY is missing in environment variables");
    }

    const API_KEY: string = process.env.API_KEY;
    const results: Record<number, Lineups[]> = {};
    const cacheKeys = ids.map(id => `lineup:${id}`);

    try {
        // Check Redis cache for all requested lineups
        const cachedResults = await redis.mget(...cacheKeys);

        const idsToFetch: number[] = [];
        cachedResults.forEach((data, index) => {
            if (data) {
                results[ids[index]] = typeof data === "string" ? JSON.parse(data) : data;
            } else {
                idsToFetch.push(ids[index]);
            }
        });

        if (!idsToFetch||idsToFetch.length === 2) {
            console.log("✅ All requested lineup data found in Redis cache.");
            return results;
        }

        console.log(`⏳ Fetching fresh lineup data for ${idsToFetch.length} fixtures...`);

        // Fetch lineup data in batches of 60 fixtures
        const fetchPromises: Promise<{ key: number; lineup: Lineups[] }>[] = [];
        for (let i = 0; i < idsToFetch.length; i += 10) {
            const batch = idsToFetch.slice(i, i + 10);
            fetchPromises.push(
                ...batch.map(async (id) => {
                    const lineup = await fetchLineup(id, API_KEY);
                    return { key: id, lineup };
                })
            );
        }

        // Process all fetched results
        const freshResults = await Promise.all(fetchPromises);
        freshResults.forEach(({ key, lineup }) => {
            results[key] = lineup;
        });

        // Store fresh results in Redis (expires in 2 weeks)
        const redisSetOperations = freshResults.map(({ key, lineup }) =>
            redis.set(`lineup:${key}`, JSON.stringify(lineup),  "EX", 180) // Cache for 2 weeks
        );
        await Promise.all(redisSetOperations);

        return results;
    } catch (error) {
        console.error("❌ Error fetching lineup data batch:", error);
        return results;
    }
}