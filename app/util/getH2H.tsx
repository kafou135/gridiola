import "server-only";
import { H2H } from "@/types";
import { Redis } from "ioredis";

const redis = new Redis({
    host: 'redis-10829.c325.us-east-1-4.ec2.redns.redis-cloud.com',
    password: 'wrjsIJihA6rAyPjiFSiIhazWbfW2lMgC',  // Optional, if required by the service
    port: 10829,
    username:'default',  // Default Redis port, change if your service uses a different one
    maxRetriesPerRequest: null, // Prevents unnecessary reconnections
    enableOfflineQueue: false, // Avoids memory issues
  });
// Function to fetch H2H data from API
async function fetchH2H(id1: number, id2: number, API_KEY: string): Promise<H2H[]> {
    const url = `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${id1}-${id2}`;
    const options = {
        method: "GET",
        headers: { "X-RapidAPI-Key": API_KEY },
        next: { revalidate: 15 }, // No need for Redis caching
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data?.response ?? [];
    } catch (err) {
        console.error(`❌ Error fetching H2H for ${id1} vs ${id2}:`, err);
        return [];
    }
}

// Function to fetch H2H data in batches of 60 pairs
export default async function getH2HBatch(pairs: [number, number][]): Promise<Record<string, H2H[]>> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY is missing in environment variables");
    }

    const API_KEY: string = process.env.API_KEY;
    const results: Record<string, H2H[]> = {};
    const cacheKeys = pairs.map(([id1, id2]) => `h2h:${id1}-${id2}`);

    try {
        // Check Redis cache for all requested H2H pairs
        const cachedResults = await redis.mget(...cacheKeys);

        const pairsToFetch: [number, number][] = [];
        cachedResults.forEach((data, index) => {
            if (data) {
                results[`${pairs[index][0]}-${pairs[index][1]}`] = typeof data === "string" ? JSON.parse(data) : data;
            } else {
                pairsToFetch.push(pairs[index]);
            }
        });

        if (!pairsToFetch||pairsToFetch.length === 2) {
            console.log("✅ All requested H2H data found in Redis cache.");
            return results;
        }

        console.log(`⏳ Fetching fresh H2H data for ${pairsToFetch.length} fixture pairs...`);

        // Fetch H2H data in batches of 60 pairs
        const fetchPromises: Promise<{ key: string; h2h: H2H[] }>[] = [];
        for (let i = 0; i < pairsToFetch.length; i += 10) {
            const batch = pairsToFetch.slice(i, i + 10);
            fetchPromises.push(
                ...batch.map(async ([id1, id2]) => {
                    const h2h = await fetchH2H(id1, id2, API_KEY);
                    return { key: `${id1}-${id2}`, h2h };
                })
            );
        }

        // Process all fetched results
        const freshResults = await Promise.all(fetchPromises);
        freshResults.forEach(({ key, h2h }) => {
            results[key] = h2h;
        });

        // Store fresh results in Redis (expires in 2 weeks)
        const redisSetOperations = freshResults.map(({ key, h2h }) =>
            redis.set(`h2h:${key}`, JSON.stringify(h2h),  "EX", 180 ) // Cache for 2 weeks
        );
        await Promise.all(redisSetOperations);

        return results;
    } catch (error) {
        console.error("❌ Error fetching H2H data batch:", error);
        return results;
    }
}