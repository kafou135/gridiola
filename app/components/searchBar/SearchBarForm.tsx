'use client';

import { Team } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

export default function SearchBarForm({ teamsData }: { teamsData: Team[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showFilteredBox, setShowFilteredBox] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  let router = useRouter();

  const filteredTeams = teamsData.filter((team) =>
    team.team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setFocusedIndex(-1);
    setShowFilteredBox(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setFocusedIndex((prevIndex) => (prevIndex < filteredTeams.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (event.key === "Enter" && focusedIndex !== -1) {
      router.push(`/team/${filteredTeams[focusedIndex].team.id}`);
      setSearchTerm("");
      setIsExpanded(false);
    }
  };

  const handleTeamItemClick = () => {
    setSearchTerm("");
    setIsExpanded(false);
  };

  const teamListRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (teamListRef.current && !teamListRef.current.contains(event.target as Node)) {
      setShowFilteredBox(false);
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative flex items-center w-full max-w-lg">
      <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all">
        <Search size={24} />
      </button>
      <div
        className={`absolute left-10 top-0 w-64 transition-all duration-300 ${
          isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a team"
          className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400"
        />
        {searchTerm && filteredTeams.length > 0 && showFilteredBox && (
          <div ref={teamListRef} className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md z-20">
            {filteredTeams.slice(0, 10).map((standing, i) => (
              <Link
                href={`/team/${standing.team.id}`}
                key={standing.team.id}
                className={`block p-2 text-gray-900 hover:bg-gray-200 ${i === focusedIndex ? "bg-gray-300" : ""}`}
                onClick={handleTeamItemClick}
              >
                {standing.team.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
