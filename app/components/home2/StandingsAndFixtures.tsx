'use client';

import { AllFixtures } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import FixturesByLeague from "./FixturesByLeague";
import moment from "moment";
import Link from "next/link";

export default function StandingsAndFixtures({ filteredFixtures }: { filteredFixtures: AllFixtures[] }) {
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    
    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDate(event.target.value);
    };

    const menuItems = [
        { league: 39, name: 'EPL', yearr: 0 },
        { league: 140, name: 'La Liga', yearr: 0 },
        { league: 78, name: 'BundesLiga', yearr: 0 },
        { league: 135, name: 'Serie A', yearr: 0 },
        { league: 61, name: 'Ligue 1', yearr: 0 }
    ];

    const [activeTab, setActiveTab] = useState(0);
    const [updatedFixtures, setUpdatedFixtures] = useState<AllFixtures[]>(filteredFixtures);
    const menuRef = useRef<HTMLDivElement>(null);

    const scrollToTab = (index: number) => {
        const container = menuRef.current;
        if (container) {
            const tab = container.children[index] as HTMLElement;
            tab?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    };

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        scrollToTab(index);
    };

    useEffect(() => {
        if (JSON.stringify(updatedFixtures) !== JSON.stringify(filteredFixtures)) {
            setUpdatedFixtures(filteredFixtures);
        }
    }, [filteredFixtures]);

    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            if (event.shiftKey) {
                event.preventDefault();
            }
        };

        const container = menuRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <div className="flex flex-wrap w-full bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-900">
            {/* Sidebar with League Buttons */}
            <div className="w-full md:w-1/4 bg-gray-600 shadow-md p-4 rounded-lg overflow-x-auto">
            <h1 className="text-black">Standings</h1>
                {menuItems.map((league, i) => (
                    <Link href={`/standing/${league.yearr}${league.league}`} key={league.league}>
                        <button
                            className="hidden md:flex w-full px-4 py-2 rounded-lg text-sm font-medium transition-all border-l-4 text-white border-transparent hover:bg-gray-700"
                            onClick={() => handleTabClick(i)}
                        >
                            <div className="flex items-center">
                                <img
                                    src={`https://media.api-sports.io/football/leagues/${league.league}.png`}
                                    alt={league.name}
                                    className="w-5 h-5 md:w-6 md:h-6 mr-2"
                                />
                                {league.name}
                            </div>
                        </button>
                    </Link>
                ))}
            </div>

            {/* Match Display Section */}
            <div className="w-full md:w-3/4 bg-gray-800 shadow-lg rounded-lg p-6 text-white">
                {/* Date Selector */}
                <div className="mb-4 flex items-center">
                    <label className="mr-2 font-medium text-gray-300"></label>
                    <select
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="bg-gray-700 text-white border border-gray-600 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
                    >
                        {Array.from({ length: 11 }).map((_, i) => {
                            const date = moment().subtract(7, 'days').add(i, 'days');
                            const formattedDate = date.format("DD/MM"); // Format as dd/mm
                            const dayOfWeek = date.format("ddd"); // Get the first three characters of the day name
                            const isToday = date.isSame(moment(), 'day'); // Check if it's today's date

                            return (
                                <option key={date.format("YYYY-MM-DD")} value={date.format("YYYY-MM-DD")}>
                                    {isToday ? "Today" : `${formattedDate} ${dayOfWeek}`}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Fixtures */}
                <div className="flex flex-col w-full max-w-4xl mx-auto pt-2 space-y-4">
                    {updatedFixtures.map((league, j) => (
                        <FixturesByLeague
                            fixturesByTeamId={league.fixtures}
                            key={league.name + j}
                            selectedDate={selectedDate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );  
}
