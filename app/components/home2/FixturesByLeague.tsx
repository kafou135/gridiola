import { useEffect, useState, useMemo } from "react";
import { Fixture } from "@/types";
import FixtureItem from "./FixtureItem";
import moment from "moment";

type PageProps = {
    fixturesByTeamId: Fixture[];
    selectedDate: string;
};

export default function FixturesByLeague({ fixturesByTeamId, selectedDate }: PageProps) {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(prevState => !prevState);
    };

    // Optimize filtering & sorting with useMemo
    const fixturesToday = useMemo(() => {
        return fixturesByTeamId
            .filter(fixture => moment(fixture.fixture.date).format("YYYY-MM-DD") === selectedDate)
            .sort((a, b) => moment(a.fixture.date).valueOf() - moment(b.fixture.date).valueOf());
    }, [fixturesByTeamId, selectedDate]);

    if (fixturesToday.length > 0) {
        return (
            <div className="bg-white-200 bm-0">
                <div
                    className={`w-full px-4 py-2 rounded-md bm-0 text-sm font-medium transition-all border-l-4 ${
                        fixturesByTeamId?.[0]?.league?.id
                            ? 'border-red-600 bg-gray-200 text-black'
                            : 'border-transparent text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    {/* League logo and name */}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <img
                                src={`https://media.api-sports.io/football/leagues/${fixturesByTeamId?.[0]?.league?.id}.png`}
                                alt="league logo"
                                style={{ width: '24px', height: 'auto', marginRight: '8px' }}
                            />
                            {fixturesByTeamId?.[0]?.league?.name}
                        </div>

                        {/* Toggle button */}
                        <div
                            onClick={handleToggle}
                            className="flex items-center cursor-pointer"
                            style={{ marginLeft: '8px' }}
                        >
                            <span className="text-xl font-bold">
                                {isOpen ? '˄' : '˅'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Pivot window for fixtures */}
                <div
                    className={`transition-all duration-500 ease-in-out ${
                        isOpen ? 'max-h-none' : 'max-h-0'
                    }`}
                >
                    {isOpen && (
                        <div className="flex flex-col mt-2">
                            {fixturesToday.map((match, i) => (
                                <FixtureItem match={match} index={i} key={match.fixture.id} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
