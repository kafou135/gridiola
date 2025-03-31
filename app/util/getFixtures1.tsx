import { AllFixtures, Fixture } from "@/types";
import moment from 'moment';


const API_KEY = process.env.API_KEY as string;

async function fetchFixturesByLeague(year: number, id: number,season:number): Promise<Fixture[]> {

    const url = `https://v3.football.api-sports.io/fixtures?league=${id}&season=${season}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        },
        next: {
            // revalidate data every 24 hours
            revalidate: 60 * 60 * 24
        }
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const fixtures: Fixture[] = data.response;
        if (fixtures === null || fixtures === undefined) {
            return [];
        } else {
            return fixtures;
        }

    } catch (err) {
        console.log(`Error fetching  fixtures in year ${year}: ${err}`);
        return [];
    }
}

export default async function getFixtures(name:string,season:number,id:number): Promise<AllFixtures[]> {

    

    try {
        const currentTime = moment();
        const year = currentTime.year();
        const month = currentTime.month();

        const allFixturesByLeague: AllFixtures[] = [];


            if (month <= 5) {
                allFixturesByLeague.push({
                    name: name,
                    fixtures: await fetchFixturesByLeague(year - 1, id,season),
                });
            } else if (month >= 8) {
                allFixturesByLeague.push({
                    name: name,
                    fixtures: await fetchFixturesByLeague(year, id,season)
                });
            } else {
                allFixturesByLeague.push({
                    name: name,
                    fixtures: await fetchFixturesByLeague(year - 1, id,season)
                });
                const existingData = allFixturesByLeague.find((data) => data.name === name);
                if (existingData) {
                    existingData.fixtures.push(...(await fetchFixturesByLeague(year, id,season)));
                } else {
                    allFixturesByLeague.push({
                        name: name,
                        fixtures: await fetchFixturesByLeague(year, id,season)
                    });
                }
            }
        


        return allFixturesByLeague;
    } catch (error) {
        console.error("An error occured while fetching fixtures: ", error);
        throw error;
    }
}