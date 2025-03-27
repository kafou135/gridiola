import "server-only";
import { Topscorers } from "@/types";
import moment from "moment";

export default async function fetchTopScorers(yearr: number,id: number): Promise<Topscorers[]> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY is missing in environment variables");
    }

    

    const API_KEY: string = process.env.API_KEY;
    
    const url = `https://v3.football.api-sports.io/players/topscorers?season=2024&league=${id}`;
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

