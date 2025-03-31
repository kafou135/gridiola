import { Team } from '@/types';
import 'server-only';
import getTeams from './getTeams';

export default async function getTeamInfoByTeamId(teamid: number,teamName:string,season:number,leagueid:number): Promise<Team | undefined> {
    try {
        const teams: Team[] = await getTeams(teamid,teamName,season,leagueid);

        for (const team of teams) {
            if (team.team.id === teamid) {
                return team;
            }
        }

        return undefined;
    } catch (error) {
        console.error('An Error occured while fetching team info by team Id: ', error);
        throw error;
    }
}