import { AllFixtures } from "@/types";
import getFixtures from "./getFixtures";
import moment from 'moment';

export default async function getFixturesForFiveLeagues(): Promise<AllFixtures[]> {
    try {
        const allFixturesByLeague = await getFixtures();

        const fixturesForFiveLeagues: AllFixtures[] = [];
        for (const league of allFixturesByLeague) {
            if (
                league.name === 'EPL' ||
                league.name === 'euro' ||
                league.name === 'caf' 

            ) {
                fixturesForFiveLeagues.push(league);
            }
        }
        const filteredFixtures: AllFixtures[] = fixturesForFiveLeagues.filter((league) => {
            
        
            league.fixtures = league.fixtures
    .filter((fixture) => {
        return moment(fixture.fixture.date).isSameOrAfter(moment().subtract(10, 'years'), 'day');
    })

                 // Limit fixtures based on the league's custom limit
        
            return league.fixtures.length > 0; // Keep leagues with fixtures
        });
        
        
        

        
        return filteredFixtures;
        
        
        
    } catch (error) {
        console.error('An error occured while fetching fixtures: ', error);
        throw error;
    }
}