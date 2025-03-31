import getTeamInfoByTeamId from "@/app/util/getTeamInfoByTeamId"
import { Fixture,Standing } from "@/types"
import type { Team, Topscorers } from "@/types"
import Image from "next/image"
import Fixtures from "./components/standing"

import getTopScorersBatch from "@/app/util/getPlayers"
import getStandingsBatch from "@/app/util/getStanding"

type PageProps = {
    params: {
        id: number
    }
}

export default async function Team({
    params
}: PageProps) {
    const idString = params.id.toString(); // Convert number to string
    const yearr = idString.slice(0, 1); // First three characters
    const id = idString.slice(1); // Remaining characters

    console.log("ID:", id, "Year:", yearr); // Debugging

// Assuming id and yearr are variables
// Assuming you have id and yearr variables for a single league
const standingsData: Standing[] = await getStandingsBatch(Number(yearr),Number(id))

// This retrieves the standings for the specific league by the id
    const topscorers:Topscorers[] = await getTopScorersBatch(Number(yearr),Number(id))

    return (

        <div className="laptop-only">
                    <Fixtures standingsData={standingsData} topscorers={topscorers}/>
            </div>
    );
}
