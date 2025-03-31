"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Standing, Topscorers } from "@/types";
import Link from "next/link";

type PageProps = {
    standingsData: Standing[];
    topscorers:Topscorers[];
};

export default function Match({ standingsData,topscorers }: PageProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("standings");
    const [loading, setLoading] = useState(false);

    const handleTabClick = (tab: string) => {
        if (activeTab === tab) return;

        setLoading(true);
        setTimeout(() => {
            setActiveTab(tab);
            setLoading(false);
        }, 500);
    };

    return (
        <div className="flex flex-col w-full justify-center items-center bg-gray-900 text-neutral-100 py-5 md:py-6">
            <div className="flex w-full max-w-3xl items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md">
                <div ref={menuRef} className="w-full flex overflow-x-hidden snap-x scrollbar-none scroll-smooth text-xs md:text-sm">
                    {standingsData.map((responseData) => (
                        <div key={responseData.league.id} className="flex-shrink-0 w-full snap-center flex justify-center items-center">
                            <div className="flex flex-col justify-between p-4 w-full bg-gray-800 rounded-lg shadow-md mb-4">
                                
                                {/* League Name and Logo */}
                                <div className="flex w-full justify-between items-center p-2 bg-gray-700 rounded-t-lg mb-4">
                                    <div className="flex items-center text-xl font-bold text-white">
                                        <img src={responseData.league.logo} alt={responseData.league.name} className="w-8 h-8 mr-2" />
                                        {responseData.league.name}
                                    </div>
                                </div>

                                {/* Tab Buttons */}
                                <div className="flex w-full justify-center gap-4 mb-4">
                                    <button
                                        onClick={() => handleTabClick("standings")}
                                        className={`px-4 py-2 rounded-md ${activeTab === "standings" ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                                        disabled={activeTab === "standings"}
                                    >
                                        Standings
                                    </button>
                                    <button
                                        onClick={() => handleTabClick("top-scorers")}
                                        className={`px-4 py-2 rounded-md ${activeTab === "top-scorers" ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} text-white`}
                                        disabled={activeTab === "top-scorers"}
                                    >
                                        Top Scorers
                                    </button>
                                </div>

                                {/* Content Transition */}
                                <AnimatePresence mode="wait">
                                    {loading ? (
                                        <motion.div
                                            key="loading"
                                            className="flex justify-center items-center h-40"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Loading Animation */}
                                            <div className="flex space-x-2">
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-4 h-4 rounded-full bg-blue-500"
                                                        animate={{ y: [0, -10, 0] }}
                                                        transition={{
                                                            duration: 0.6,
                                                            repeat: Infinity,
                                                            delay: i * 0.2,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {activeTab === "standings" ? (
                                                <div>
                                                    {/* Header Row */}
                                                    <div className="flex w-full p-1 bg-gray-700 rounded-t-lg">
                                                        <div className="w-1/12"></div>
                                                        <div className="w-3/12"></div>
                                                        <div className="w-6/12 flex justify-evenly">
                                                            <div className="w-full text-center text-xs md:text-sm font-bold">P</div>
                                                            <div className="w-full text-center text-xs md:text-sm">M</div>
                                                            <div className="w-full text-center text-xs md:text-sm">W</div>
                                                            <div className="w-full text-center text-xs md:text-sm">D</div>
                                                            <div className="w-full text-center text-xs md:text-sm">L</div>
                                                            <div className="w-full text-center text-xs md:text-sm">GF</div>
                                                            <div className="w-full text-center text-xs md:text-sm">GA</div>
                                                            <div className="w-full text-center text-xs md:text-sm">GD</div>
                                                        </div>
                                                        <div className="w-2/12 text-center text-xs md:text-sm">Form</div>
                                                    </div>

                                                    {/* Teams */}
                                                    {responseData.league.standings[0].map((team, j) => (
                                                        <Link href={`/team/${team.team.id}nm${team.team.name}seas${responseData.league.season}lid${responseData.league.id}`} key={j + team.team.name} className={`flex w-full p-2 hover:bg-red-800/50 rounded-lg ${j % 2 === 0 ? 'bg-black/40' : 'bg-gray-700'}`}>
                                                            <div className="w-1/12 flex px-2 justify-center items-center text-xs md:text-sm">{j + 1}</div>
                                                            <div className="w-3/12 flex text-xs md:text-sm items-center">
                                                                <img src={team.team.logo} alt={team.team.name} className="w-6 h-6 mr-2" />
                                                                {team.team.name}
                                                            </div>
                                                            <div className="w-6/12 flex justify-center items-center">
                                                                <div className="w-full text-center font-bold">{team.points}</div>
                                                                <div className="w-full text-center">{team.all.played}</div>
                                                                <div className="w-full text-center">{team.all.win}</div>
                                                                <div className="w-full text-center">{team.all.draw}</div>
                                                                <div className="w-full text-center">{team.all.lose}</div>
                                                                <div className="w-full text-center">{team.all.goals.for}</div>
                                                                <div className="w-full text-center">{team.all.goals.against}</div>
                                                                <div className="w-full text-center">{team.goalsDiff}</div>
                                                            </div>
                                                            <div className="w-2/12 flex justify-center items-center">
                                                                {team.form?.split('').map((char, i) => (
                                                                    <div
                                                                        key={char + i}
                                                                        className={`opacity-80 w-3 h-3 m-[1px] rounded-full ${char === 'L' ? 'bg-red-500' : char === 'D' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
<div className="flex flex-col w-full text-white">
    {/* Top Scorers Header */}
    <div className="flex w-full p-2 bg-gray-700 rounded-t-lg font-bold">
        <div className="w-1/12 text-center">#</div>
        <div className="w-4/12">Player</div>
        <div className="w-2/12 text-center">Goals</div>
        <div className="w-2/12 text-center">Assists</div>
        <div className="w-3/12 text-center">Club</div>
    </div>

    {/* Top Scorers List */}
    {topscorers.map((player, index) => (
        <div key={player.player.id} className={`flex w-full p-2 items-center ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}`}>
            <div className="w-1/12 text-center font-bold">{index + 1}</div>
            <div className="w-4/12 flex items-center">
                <img src={player.player.photo} alt={player.player.name} className="w-6 h-6 rounded-full mr-2" />
                {player.player.name}
            </div>
            <div className="w-2/12 text-center">{player.statistics[0].goals.total}</div>
            <div className="w-2/12 text-center">{player.statistics[0].goals.assists}</div>
            <div className="w-3/12 flex items-center">
                <img src={player.statistics[0].team.logo} alt={player.statistics[0].team.name} className="w-6 h-6 mr-2" />
                {player.statistics[0].team.name}
            </div>
        </div>
    ))}
</div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
