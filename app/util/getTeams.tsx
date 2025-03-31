import { Standing, Team } from '@/types';
import 'server-only';
import getStandings from './getStandings1';

export default async function getTeams(teamid: number,teamName:string,season:number,leagueid:number): Promise<Team[]> {

    try {
        const standings: Standing[] = await getStandings(teamName,season,leagueid);

        const teams: Team[] = [];

        for (const league of standings) {
            for (const standing of league.league.standings) {
                if (Array.isArray(standing)) {
                    for (const team of standing) {
                        teams.push(team);
                    }
                } else {
                    throw new Error("Invalid standings data");
                }
            }
        }

        return teams;
    } catch (error) {
        console.error("Error occured while fetching teams: ", error);
        throw error;
    }
}