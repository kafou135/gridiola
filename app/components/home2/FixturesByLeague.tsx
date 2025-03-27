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
            <div className="bg-gray-900 text-white rounded-lg shadow-md p-4">
                {/* League Header */}
                <div
                    className={`flex items-center justify-between p-2 rounded-md transition-all border-l-4 ${
                        fixturesByTeamId?.[0]?.league?.id
                            ? 'border-red-600 bg-gray-800 text-white'
                            : 'border-transparent text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    {/* League Logo & Name */}
                    <div className="flex items-center">
                        <img
                            src={`https://media.api-sports.io/football/leagues/${fixturesByTeamId?.[0]?.league?.id}.png`}
                            alt="league logo"
                            className="w-6 h-6 mr-2"
                        />
                        <span className="font-semibold">{fixturesByTeamId?.[0]?.league?.name}</span>
                    </div>

                    {/* Toggle Button */}
                    <button onClick={handleToggle} className="text-xl font-bold focus:outline-none">
                        {isOpen ? '˄' : '˅'}
                    </button>
                </div>

                {/* Fixture List */}
                <div className={`transition-all duration-500 ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="mt-2 flex flex-col">
                        {fixturesToday.map((match, i) => (
                            <FixtureItem match={match} index={i} key={match.fixture.id} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
