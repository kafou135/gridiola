import getTeamInfoByTeamId from "@/app/util/getTeamInfoByTeamId"
import { Fixture } from "@/types"
import type { Team } from "@/types"
import Image from "next/image"
import Fixtures from "./components/Fixtures"
import getFixturesByTeamId from "@/app/util/getFixturesByTeamId"

type PageProps = {
    params: {
        id: string
    }
}

export default async function Team({
    params
}: PageProps) {
    const match = params.id.match(/(\d+)nm(.*?)seas(\d+)lid(\d+)/);
    if (!match) {
        return (
            <div className="flex justify-center items-center text-neutral-100 py-5">
                <p className="text-red-500 text-lg">Invalid Team ID format</p>
            </div>
        );
    }
    const teamId = parseInt(match[1]); // Extracts the numeric team ID
    const teamName = match[2]; // Extracts the team name
    const season = parseInt(match[3]); // Extracts the season
    const leagueid = parseInt(match[4]); // Extracts the season
    let teamInfo: Team | undefined = await getTeamInfoByTeamId(teamId,teamName,season,leagueid);
    let fixturesByTeamId: Fixture[] = await getFixturesByTeamId(teamId,teamName,season,leagueid);

    if (!teamInfo) {
        return (
            <div className="flex w-full justify-center items-center py-5">
                <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100 bg-gray-900 rounded-lg shadow-lg">
                    Team Info Not Available
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center text-neutral-100 py-5">
            <div className="flex flex-col max-w-7xl p-5 w-full md:flex-row gap-5 bg-gray-900 rounded-lg shadow-lg">
                <div className="flex flex-col md:w-1/3 justify-center items-center bg-gray-800 rounded-lg p-5 shadow-md">
                    <img
                        src={teamInfo.team.logo}
                        alt="TeamLogo"
                        width={150}
                        height={150}
                        className="p-3 border-2 border-gray-700"
                    />
                    <div className="text-2xl font-bold mt-3">{teamInfo.team.name}</div>
                    <div className="flex justify-center items-center w-full mt-2 text-lg font-semibold">
                        <div className="w-1/3 text-center">#{teamInfo.rank}</div>
                        <div className="w-1/3 text-center">{teamInfo.group}</div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className="text-center">Form</div>
                            <div className="flex justify-center items-center">
                                {
                                    teamInfo.form?.split('').map((char, i) => (
                                        <div
                                            key={char + i}
                                            className={`opacity-80 w-4 h-4 m-1 rounded-full
                                            ${char === 'L' ? 'bg-red-500' : char === 'D' ?
                                                    'bg-gray-500' : 'bg-green-500'}`}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full p-2 mt-5">
                        <div className="flex w-full justify-center items-center text-lg font-semibold bg-gray-700 rounded-md p-2">
                            <div className="w-full text-center">P</div>
                            <div className="w-full text-center">M</div>
                            <div className="w-full text-center">W</div>
                            <div className="w-full text-center">D</div>
                            <div className="w-full text-center">L</div>
                            <div className="w-full text-center">GF</div>
                            <div className="w-full text-center">GA</div>
                            <div className="w-full text-center">GD</div>
                        </div>
                        <div className="flex w-full justify-center items-center text-lg font-semibold mt-2">
                            <div className="w-full text-center text-yellow-400">{teamInfo.points}</div>
                            <div className="w-full text-center">{teamInfo.all.played}</div>
                            <div className="w-full text-center">{teamInfo.all.win}</div>
                            <div className="w-full text-center">{teamInfo.all.draw}</div>
                            <div className="w-full text-center">{teamInfo.all.lose}</div>
                            <div className="w-full text-center">{teamInfo.all.goals.for}</div>
                            <div className="w-full text-center">{teamInfo.all.goals.against}</div>
                            <div className="w-full text-center">{teamInfo.goalsDiff}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:w-2/3 justify-center items-center bg-gray-800 rounded-lg p-5 shadow-md">
                    <Fixtures fixturesByTeamId={fixturesByTeamId} teamId={parseInt(params.id)} />
                </div>
            </div>
        </div>
    )
}
