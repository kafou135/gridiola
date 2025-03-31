'use client';

import LocalTime from "@/app/components/LocalTime";
import { Fixture } from "@/types";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

type PageProps = {
    fixturesByTeamId: Fixture[];
    teamId: number;
};

export default function Fixtures({ fixturesByTeamId, teamId }: PageProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItemsCount, setVisibleItemsCount] = useState(5);

    const handleShowMore = () => setVisibleItemsCount((prevCount) => prevCount + 5);

    const today = moment().format("YYYY-MM-DD");
    const fixturesDone = fixturesByTeamId.filter(fixture => moment(fixture.fixture.date).format("YYYY-MM-DD") < today).reverse();
    const fixturesToday = fixturesByTeamId.filter(fixture => moment(fixture.fixture.date).format("YYYY-MM-DD") === today);
    const fixturesFuture = fixturesByTeamId.filter(fixture => moment(fixture.fixture.date).format("YYYY-MM-DD") > today);
    const firstItemsFixturesFuture = fixturesFuture.slice(0, 5);
    
    const prevItem = () => setCurrentIndex(prev => Math.max(prev - 1, 0));
    const nextItem = () => setCurrentIndex(prev => Math.min(prev + 1, firstItemsFixturesFuture.length - 1));
    const getTranslateX = (index: number) => `-${index * 100}%`;

    return (
        <div className="flex flex-col w-full items-center text-neutral-100 bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="w-full text-center text-lg font-bold p-2 bg-red-700/80 rounded-t-md">Upcoming Matches</div>
            <div className="relative w-full overflow-hidden rounded-md bg-gray-900">
                <button className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-700/80 rounded-full" onClick={prevItem}>
                    <ChevronDoubleLeftIcon className="h-6 w-6 text-neutral-100" />
                </button>
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(${getTranslateX(currentIndex)})` }}>
                    {firstItemsFixturesFuture.map((fixture) => (
                        <Link key={fixture.fixture.id} href={`/match/${fixture.fixture.id}`} className="w-full flex-shrink-0 flex items-center bg-gray-700 hover:bg-red-800 rounded-md p-4">
                            <div className="flex flex-col items-center w-3/12 text-sm">
                                <Image src={fixture.teams.home.logo} alt="HomeLogo" width={50} height={50}  />
                                <div>{fixture.teams.home.name}</div>
                            </div>
                            <div className="flex flex-col items-center w-6/12 text-xs md:text-sm">
                                <div className="text-center">{fixture.league.name}</div>
                                <LocalTime fixture={fixture} />
                                <div className="text-lg font-bold">VS</div>
                                <div className="text-center">{fixture.fixture.venue.name}</div>
                            </div>
                            <div className="flex flex-col items-center w-3/12 text-sm">
                                <Image src={fixture.teams.away.logo} alt="AwayLogo" width={50} height={50}  />
                                <div>{fixture.teams.away.name}</div>
                            </div>
                        </Link>
                    ))}
                </div>
                <button className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-700/80 rounded-full" onClick={nextItem}>
                    <ChevronDoubleRightIcon className="h-6 w-6 text-neutral-100" />
                </button>
            </div>

            <div className="w-full text-center text-lg font-bold p-2 bg-red-700/80 mt-4 rounded-t-md">Match Results</div>
            {fixturesDone.slice(0, visibleItemsCount).map((fixture, i) => (
                <Link key={fixture.fixture.id} href={`/match/${fixture.fixture.id}`} className="w-full flex items-center bg-gray-700 hover:bg-red-800 rounded-md p-4 mb-2">
                    <div className="flex flex-col items-center w-3/12 text-sm">
                        <Image src={fixture.teams.home.logo} alt="HomeLogo" width={50} height={50}  />
                        <div>{fixture.teams.home.name}</div>
                    </div>
                    <div className="flex flex-col items-center w-6/12 text-xs md:text-sm">
                        <div className="text-center">{fixture.league.name}</div>
                        <LocalTime fixture={fixture} />
                        <div className="text-lg font-bold">{fixture.score.fulltime.home} - {fixture.score.fulltime.away}</div>
                        <div className="text-center">{fixture.fixture.venue.name}</div>
                    </div>
                    <div className="flex flex-col items-center w-3/12 text-sm">
                        <Image src={fixture.teams.away.logo} alt="AwayLogo" width={50} height={50}  />
                        <div>{fixture.teams.away.name}</div>
                    </div>
                </Link>
            ))}
            {visibleItemsCount < fixturesDone.length && (
                <button className="bg-gray-900 p-2 rounded-md mt-2 hover:bg-gray-700" onClick={handleShowMore}>
                    Show More
                </button>
            )}
        </div>
    );
}
