import { Team } from "@/types";
import SearchBarForm from "./SearchBarForm";
import getTeams from "@/app/util/getTeams";

export default async function SearchBar(teamid: number,teamName:string,season:number,leagueid:number) {
    let teamsData: Team[] = await getTeams(teamid,teamName,season,leagueid);

    return (
        <div className="flex justify-between items-center w-full p-4 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
            <div className="flex items-center text-neutral-100">
                <a href="/" className="flex items-center gap-3">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="w-12 h-12 object-cover rounded-full border-2 border-gray-700 hover:scale-105 transition-transform"
                    />
                    <span className="hidden md:block font-extrabold text-xl text-white tracking-wide">
                       Gridiola
                    </span>
                </a>
            </div>
            <div className="flex-grow mx-5">
                <SearchBarForm teamsData={teamsData} />
            </div>
            <div className="hidden md:flex w-12 h-12"></div>
        </div>
    );
}
