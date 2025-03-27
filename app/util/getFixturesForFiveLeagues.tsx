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
                league.name === 'La Liga' ||
                league.name === 'BundesLiga' ||
                league.name === 'Serie A' ||
                league.name === 'Ligue 1' ||
                league.name === 'Europa League' ||
                league.name === 'Champions League' ||
                league.name === 'Conference League' ||
                league.name === 'UEFA Super Cup' ||
                league.name === 'Fifa Club World Cup' ||
                league.name === 'FA Cup' ||
                league.name === 'Carabao Cup' ||
                league.name === 'Community Shiedl' ||
                league.name === 'Copa Del Rey' ||
                league.name === 'Super Cup LaLiga' ||
                league.name === 'Super Cup BundesLiga' ||
                league.name === 'Super Cup Serie A' ||
                league.name === 'Coppa Italia' ||
                league.name === 'Coupe de la Ligue' ||
                league.name === 'Coupe de France' ||
                league.name === 'Trophee des Champions' ||
                league.name === 'Saudi Pro League' ||
                league.name === 'euro' 
                


            ) {
                fixturesForFiveLeagues.push(league);
            }
        }

        const filteredFixtures: AllFixtures[] = fixturesForFiveLeagues.filter((league) => {
            let fixturesLimit = 5; // Default fixture limit for most leagues
        
            // Customize fixture limits for each league
            if (league.name === "Serie A") {
                fixturesLimit = 5; // Serie A shows 9 games
            } else if (league.name === "La Liga") {
                fixturesLimit = 5; // La Liga shows 9 games
            }
        
            league.fixtures = league.fixtures
                .filter((fixture) => {
                    return moment(fixture.fixture.date).isAfter(moment().subtract(1, 'day'), 'day');
                })
                .slice(0, ); // Limit fixtures based on the league's custom limit
        
            return league.fixtures.length > 0; // Keep leagues with fixtures
        });
        
        return filteredFixtures;
        
        
        
    } catch (error) {
        console.error('An error occured while fetching fixtures: ', error);
        throw error;
    }
}