import "server-only";
import { Events } from "@/types";
import { Redis } from "ioredis";

const redis = new Redis({
    host: 'redis-10829.c325.us-east-1-4.ec2.redns.redis-cloud.com',
    password: 'wrjsIJihA6rAyPjiFSiIhazWbfW2lMgC',  // Optional, if required by the service
    port: 10829,
    username:'default',  // Default Redis port, change if your service uses a different one
    maxRetriesPerRequest: null, // Prevents unnecessary reconnections
    enableOfflineQueue: false, // Avoids memory issues
  });
// Function to fetch events for a single fixture
async function getH2H(id: number, API_KEY: string): Promise<Events[]> {
    const url = `https://v3.football.api-sports.io/fixtures/events?fixture=${id}`;
    const options = {
        method: "GET",
        headers: { "X-RapidAPI-Key": API_KEY },
        next: { revalidate: 15 },
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data?.response ?? [];
    } catch (err) {
        console.error(`❌ Error fetching H2H events for fixture ${id}:`, err);
        return [];
    }
}

// Function to fetch events in batches of 60
export default async function getEventsBatch(fixtureIds: number[]): Promise<Record<number, Events[]>> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY is missing in environment variables");
    }

    const API_KEY: string = process.env.API_KEY;
    const results: Record<number, Events[]> = {};
    const cacheKeys = fixtureIds.map((id) => `event:${id}`);

    try {
        // Check Redis cache for all requested fixtures
        const cachedResults = await redis.mget(...cacheKeys);

        const fixturesToFetch: number[] = [];
        cachedResults.forEach((data, index) => {
            if (data) {
                results[fixtureIds[index]] = typeof data === "string" ? JSON.parse(data) : data;
            } else {
                fixturesToFetch.push(fixtureIds[index]);
            }
        });

        if (fixturesToFetch.length === 2) {
            console.log("✅ All requested events found in Redis cache.");
            return results;
        }

        console.log(`⏳ Fetching fresh events for ${fixturesToFetch.length} fixtures...`);

        // Fetch events in batches of 60 fixtures
        const fetchPromises: Promise<{ id: number; events: Events[] }>[] = [];
        for (let i = 0; i < fixturesToFetch.length; i += 10) {
            const batch = fixturesToFetch.slice(i, i + 10);
            fetchPromises.push(
                ...batch.map(async (id) => {
                    const events = await getH2H(id, API_KEY);
                    return { id, events };
                })
            );
        }

        // Process all fetched results
        const freshResults = await Promise.all(fetchPromises);
        freshResults.forEach(({ id, events }) => {
            results[id] = events;
        });

        // Store fresh results in Redis (expires in 2 weeks)
        const redisSetOperations = freshResults.map(({ id, events }) =>
            redis.set(`event:${id}`, JSON.stringify(events),  "EX", 180 ) // 2 weeks
        );
        await Promise.all(redisSetOperations);

        return results;
    } catch (error) {
        console.error("❌ Error fetching events batch:", error);
        return results;
    }
}