'use client'
import Image from "next/image";
import Link from "next/link";
import getFixtureByFixtureId from "@/app/util/getFixtureByFixtureId";
import { Fixture, H2H, Lineups } from "@/types";
import LocalTime from "@/app/components/LocalTime";
import RefreshButton from "@/my comopnents/RefreshButton";
import getH2H from "@/app/util/getH2H";
import { log } from "console";
import getLineup from "@/app/util/getLineup";
import { useState } from "react";


type PageProps = {
    
    fixtureByFixtureId: Fixture | undefined;
    h2h:H2H[];
    lineups:Lineups[]
};

export default async function Match({ fixtureByFixtureId,h2h,lineups }: PageProps) {
  
    console.log('H2HHHH2H2H2H2H2H2',h2h[0]);
    
    if (!fixtureByFixtureId) {
        return (
            <div className="flex w-full justify-center items-center py-5">
                <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
                    No Fixture Info Available
                </div>
            </div>
        );
    }

    // Fetch lineups
    

    
    const getTopPositionForHome = (position: string, y: number, x: number) => {
        let topPosition = 0;
        
        if (lineups[0]?.formation === '4-2-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0]?.formation === '3-5-2') {
            switch (x) {
                case 1: topPosition = 50; break; // Goalkeeper
                case 2: topPosition = (y / 3) * 75; break; // 3 Attacking Midfielders
                case 3: topPosition = (y / 5) * 85; break; // Defenders
                case 4: topPosition = (y / 2) * 66; break; // 2 Midfielders
            }
        } 
        else if (lineups[0]?.formation === '4-4-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 2) * 66; break;
            }
        } 
        else if (lineups[0]?.formation === '4-3-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        } 
        else if (lineups[0]?.formation === '4-3-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0]?.formation === '4-3-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0]?.formation === '4-2-3-1') {
            switch (x) {
                case 1: topPosition = 50; break; // Goalkeeper
                case 2: topPosition = (y / 4) * 80; break; // Defenders
                case 3: topPosition = (y / 2) * 66; break; // 2 Midfielders
                case 4: topPosition = (y / 3) * 75; break; // 3 Attacking Midfielders
                case 5: topPosition = 50; break; // Striker
            }
        } 
        else if (lineups[0]?.formation === '4-1-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0]?.formation === '3-4-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0]?.formation === '4-1-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0]?.formation === '3-4-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0]?.formation === '4-1-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y/2)*66; break;
            }
        }
        else if (lineups[0]?.formation === '3-2-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 4) * 80; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0]?.formation === '3-2-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0]?.formation === '3-1-4-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 4) * 80; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0]?.formation === '5-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y/2)*66; break;
            }
        }
        else if (lineups[0]?.formation === '5-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
            }
        }
        else if (lineups[0]?.formation === '3-4-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0]?.formation === '4-5-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 5) * 85; break;
                case 4: topPosition = 50; break;
            }
        }
        else if (lineups[0]?.formation === '5-2-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0]?.formation === '5-2-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0]?.formation === '3-2-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[0]?.formation === '3-3-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0]?.formation === '4-1-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[0]?.formation === '4-2-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0]?.formation === '5-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition =50; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0]?.formation === '5-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0]?.formation === '3-1-1-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[0]?.formation === '3-1-2-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0]?.formation === '3-1-3-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0]?.formation === '3-1-5-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 5) * 85; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0]?.formation === '3-2-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0]?.formation === '3-2-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0]?.formation === '3-3-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0]?.formation === '3-3-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0]?.formation === '3-3-3-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0]?.formation === '3-5-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 5) * 85; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0]?.formation === '4-1-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[0]?.formation === '4-2-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0]?.formation === '4-4-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0]?.formation === '5-1-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[0]?.formation === '5-1-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[0]?.formation === '5-1-3-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[0]?.formation === '5-3-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }

        return `${topPosition}%`;
    };

    const getTopPositionForAway = (position: string, y: number, x: number) => {
        let topPosition = 0;
    
        if (lineups[1]?.formation === '4-2-3-1') {
            switch (x) {
                case 1: topPosition = 50; break; // Goalkeeper
                case 2: topPosition = (y / 4) * 80; break; // Defenders
                case 3: topPosition = (y / 2) * 66; break; // 2 Midfielders
                case 4: topPosition = (y / 3) * 75; break; // 3 Attacking Midfielders
                case 5: topPosition = 50; break; // Striker
            }
        }
        else if (lineups[1]?.formation === '3-5-2') {
            switch (x) {
                case 1: topPosition = 50; break; // Goalkeeper
                case 2: topPosition = (y / 3) * 75; break; // 3 Attacking Midfielders
                case 3: topPosition = (y / 5) * 85; break; // Defenders
                case 4: topPosition = (y / 2) * 66; break; // 2 Midfielders
            }
        }
        else if (lineups[1]?.formation === '4-4-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 2) * 66; break;
            }
        } 
        else if (lineups[1]?.formation === '4-3-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        } 
        else if (lineups[1]?.formation === '4-3-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1]?.formation === '4-3-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1]?.formation === '4-2-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1]?.formation === '4-5-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 5) * 85; break;
                case 4: topPosition = 50; break;
            }
        }
        else if (lineups[1]?.formation === '4-1-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1]?.formation === '4-1-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1]?.formation === '3-4-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1]?.formation === '3-4-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1]?.formation === '3-2-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[1]?.formation === '3-3-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1]?.formation === '4-1-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[1]?.formation === '4-2-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1]?.formation === '5-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition =50; break;
                case 4: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1]?.formation === '5-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1]?.formation === '3-2-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 4) * 80; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1]?.formation === '3-2-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1]?.formation === '3-1-4-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 4) * 80; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1]?.formation === '5-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y/2)*66; break;
            }
        }
        else if (lineups[1]?.formation === '4-1-3-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y/2)*66; break;
            }
        }
        else if (lineups[1]?.formation === '5-4-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
            }
        }
        else if (lineups[1]?.formation === '3-4-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1]?.formation === '5-2-2-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1]?.formation === '5-2-1-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1]?.formation === '3-1-1-5') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 5) * 85; break;
            }
        }
        else if (lineups[1]?.formation === '3-1-2-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1]?.formation === '3-1-3-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1]?.formation === '3-1-5-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 5) * 85; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1]?.formation === '3-2-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1]?.formation === '3-2-2-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1]?.formation === '3-3-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1]?.formation === '3-3-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1]?.formation === '3-3-3-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1]?.formation === '3-5-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 3) * 75; break;
                case 3: topPosition = (y / 5) * 85; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1]?.formation === '4-1-1-4') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 4) * 80; break;
            }
        }
        else if (lineups[1]?.formation === '4-2-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 2) * 66; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1]?.formation === '4-4-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 4) * 80; break;
                case 3: topPosition = (y / 4) * 80; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1]?.formation === '5-1-1-3') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = (y / 3) * 75; break;
            }
        }
        else if (lineups[1]?.formation === '5-1-2-2') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 2) * 66; break;
                case 5: topPosition = (y / 2) * 66; break;
            }
        }
        else if (lineups[1]?.formation === '5-1-3-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = 50; break;
                case 4: topPosition = (y / 3) * 75; break;
                case 5: topPosition = 50; break;
            }
        }
        else if (lineups[1]?.formation === '5-3-1-1') {
            switch (x) {
                case 1: topPosition = 50; break;
                case 2: topPosition = (y / 5) * 85; break;
                case 3: topPosition = (y / 3) * 75; break;
                case 4: topPosition = 50; break;
                case 5: topPosition = 50; break;
            }
        }
    
        return `${topPosition}%`;
    };
    

    return (
        <div className="flex flex-col w-full justify-center items-center bg-gray-900 text-neutral-100 py-5 md:py-6">

             <div className="flex w-full max-w-3xl items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md">
                {/* Home Team */}
                <div className="w-1/3 flex flex-col justify-center items-center">
                    <Link href={`../team/${fixtureByFixtureId.teams.home.id}`}>
                        <Image
                            src={fixtureByFixtureId.teams.home.logo}
                            alt="HomeLogoMatch"
                            width={80}
                            height={80}
                        />
                    </Link>
                    <div className="text-center text-sm font-semibold mt-1">
                        {fixtureByFixtureId.teams.home.name}
                    </div>
                </div>

                {/* Match Score */}
                <div className="w-1/3 flex flex-col justify-center items-center text-center">
                    <div className="text-xs md:text-sm text-gray-400">
                        <LocalTime fixture={fixtureByFixtureId} />
                    </div>
                    <div className="text-xl md:text-2xl font-bold py-1">
                        {fixtureByFixtureId.fixture.status.short === "NS" ? (
                            "VS"
                        ) : fixtureByFixtureId.fixture.status.short === "1H" || fixtureByFixtureId.fixture.status.short === "2H"|| fixtureByFixtureId.fixture.status.short === "HT"|| fixtureByFixtureId.fixture.status.short === "ET" || fixtureByFixtureId.fixture.status.short === "BT"|| fixtureByFixtureId.fixture.status.short === "P"|| fixtureByFixtureId.fixture.status.short === "SUSP" || fixtureByFixtureId.fixture.status.short === "INT" ? (
                            <span className="text-red-500">
                                {fixtureByFixtureId.goals.home} - {fixtureByFixtureId.goals.away}
                            </span>
                        ) : (
                            <span className={fixtureByFixtureId.fixture.status.short === "FT" || fixtureByFixtureId.fixture.status.short === "EAT" ||fixtureByFixtureId.fixture.status.short === "PEN"  ? "text-white" : "text-red-500"}>
                                {fixtureByFixtureId.score.fulltime.home} - {fixtureByFixtureId.score.fulltime.away}
                            </span>
                        )}
                    </div>
                    {fixtureByFixtureId.fixture.status.short === "FT" || fixtureByFixtureId.fixture.status.short === "AET" || fixtureByFixtureId.fixture.status.short === "PEN" && (
                        <div className="text-xs text-gray-400">Match Finished</div>
                    )}
                    {fixtureByFixtureId.fixture.status.long === "Halftime" && (
                        <div className="text-xs text-gray-400">Halftime</div>
                    )}
                    {fixtureByFixtureId.fixture.status.short === "BT" && (
                        <div className="text-xs text-gray-400">Break Time</div>
                    )}
                    {fixtureByFixtureId.fixture.status.short === "P" && (
                        <div className="text-xs text-red-500">PENALTIES!!</div>
                    )}
                </div>

                {/* Away Team */}
                <div className="w-1/3 flex flex-col justify-center items-center">
                    <Link href={`../team/${fixtureByFixtureId.teams.away.id}`}>
                        <Image
                            src={fixtureByFixtureId.teams.away.logo}
                            alt="AwayLogoMatch"
                            width={80}
                            height={80}
                        />
                    </Link>
                    <div className="text-center text-sm font-semibold mt-1">
                        {fixtureByFixtureId.teams.away.name}
                    </div>
                </div>
            </div>

            {/* League Info Section */}
            <div className="flex flex-col w-full max-w-3xl justify-center items-center mt-4 p-2 bg-gray-700 rounded-lg shadow-md">
                <div className="text-sm font-semibold text-gray-200">{fixtureByFixtureId.league.name}</div>
                <div className="text-xs text-gray-400">{fixtureByFixtureId.league.round}</div>
            </div>

            {/* Lineups Section */}
            
            {/* Field with Players Positioned */}
            {lineups[0]?.startXI[1]?.player.grid.length === 3 ? (
                <div className="relative w-full max-w-3xl h-[500px]">
    {/* Home Team Formation (Top Left) */}
    <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-bold z-10">
        {lineups[0]?.formation}
    </div>

    {/* Away Team Formation (Top Right) */}
    <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold z-10">
        {lineups[1]?.formation}
    </div>

    {/* Field Image */}
    
    <Image
        src="/field.jpg"
        alt="Football Field"
        layout="fill"
        objectFit="contain"
        className="z-0"
    />

    {/* Home Team Players */}
    {lineups[0]?.startXI.map((player) => {
        if (player.player.grid.length!=3) return null
                    const [x, y] = player.player.grid.split(":").map(Number);
                    const positionTop = getTopPositionForHome(player.player.pos, y,x);
        let leftPosition;
        if (lineups[0]?.formation.length === 5) {
            leftPosition = `${(x / 5) * 50}%`;
        } else if (lineups[0]?.formation.length === 7) {
            leftPosition = `${(x / 6.5) * 50}%`;
        }

        return (
            <div
                key={player.player.id}
                className="absolute flex flex-col items-center text-xs text-white"
                style={{
                    top: positionTop,
                    left: leftPosition,
                    transform: "translate(-50%, -50%)",
                    minHeight: "40px",
                    paddingRight: "0px"
                }}
            >
                {/* Player Image */}
                <img
                    src={`https://media.api-sports.io/football/players/${player.player.id}.png`}
                    alt={player.player.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />

                {/* Player Number */}
                <div className="bg-blue-600 px-2 py-1 rounded-full mt-1">
                    {player.player.number}
                </div>

                {/* Player Name */}
                <div className="mt-2 bg-black/50 rounded text-xs p-0">{player.player.name}
</div>
        </div>
        );
    })}

    {/* Away Team Players */}
    {lineups[1]?.startXI.map((player) => {
        if (!player?.player?.grid) return null
        const [x, y] = player.player.grid.split(":").map(Number);
        const positionTop = getTopPositionForAway(player.player.pos, y, x);
        let leftPosition;
        if (lineups[1]?.formation.length === 5) {
            leftPosition = `${100 - (x / 5) * 50}%`;
        } else if (lineups[1]?.formation.length === 7) {
            leftPosition = `${100 - (x / 6.5) * 50}%`;
        }

        return (
            <div
                key={player.player.id}
                className="absolute flex flex-col items-center text-xs text-white"
                style={{
                    top: positionTop,
                    left: leftPosition,
                    transform: "translate(-50%, -50%)",
                    minHeight: "40px",
                    paddingRight: "0px"
                }}
            >
                {/* Player Image */}
                <img
                    src={`https://media.api-sports.io/football/players/${player.player.id}.png`}
                    alt={player.player.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />

                {/* Player Number */}
                <div className="bg-red-600 px-2 py-1 rounded-full mt-1">
                    {player.player.number}
                    
                </div>

                {/* Player Name */}
                <div className="mt-2 bg-black/50 rounded text-xs p-0">{player.player.name}
</div>

        </div>
        );
    })}
</div> ) : (
                <div className="text-xs text-gray-400 mt-4"></div>
            )}

            {lineups.length > 0 ? (
                <div className="flex flex-col w-full max-w-3xl justify-center items-center mt-6 p-4 bg-gray-800 rounded-lg shadow-md"> 
                <h2 className="text-lg font-semibold mb-3 text-white">Lineups</h2>
                <div className="w-full flex justify-between text-white">
                    {/* Home Team Lineup */}
                    <div className="w-1/2 p-2">
                        <h3 className="text-sm font-bold text-center">{fixtureByFixtureId.teams.home.name}</h3>
                        <p className="text-xs text-center text-gray-400">
                            {lineups[0]?.formation ? `Formation: ${lineups[0].formation}` : "Formation data not available"}
                        </p>
                        
                        {/* Starting XI */}
                        <div className="mt-3 bg-gray-700 p-2 rounded-md shadow">
                            <h4 className="text-xs font-semibold text-center text-yellow-400">Starting XI</h4>
                            <ul className="text-xs">
                                {lineups[0]?.startXI.map((player) => (
                                    <li key={player.player.id} className="py-1">
                                        {player.player.name} ({player.player.number})
                                    </li>
                                ))}
                            </ul>
                        </div>
            
                        {/* Substitutes */}
                        <div className="mt-3 bg-gray-900 p-2 rounded-md shadow">
                            <h4 className="text-xs font-semibold text-center text-blue-400">Substitutes</h4>
                            <ul className="text-xs text-gray-300 italic">
                                {lineups[1]?.substitutes?.length > 0 ? (
                                    lineups[1].substitutes.map((player) => (
                                        <li key={player.player.id} className="py-1">
                                            {player.player.name} ({player.player.number})
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No substitutes available</li>
                                )}
                            </ul>
                        </div>
                    </div>
            
                    {/* Away Team Lineup */}
                    <div className="w-1/2 p-2">
                        <h3 className="text-sm font-bold text-center">{fixtureByFixtureId.teams.away.name}</h3>
                        <p className="text-xs text-center text-gray-400">
                            {lineups[1]?.formation ? `Formation: ${lineups[1].formation}` : "Formation data not available"}
                        </p>
                        
                        {/* Starting XI */}
                        <div className="mt-3 bg-gray-700 p-2 rounded-md shadow">
                            <h4 className="text-xs font-semibold text-center text-yellow-400">Starting XI</h4>
                            <ul className="text-xs">
                                {lineups[1]?.startXI.map((player) => (
                                    <li key={player.player.id} className="py-1">
                                        {player.player.name} ({player.player.number})
                                    </li>
                                ))}
                            </ul>
                        </div>
            
                        {/* Substitutes */}
                        <div className="mt-3 bg-gray-900 p-2 rounded-md shadow">
                            <h4 className="text-xs font-semibold text-center text-blue-400">Substitutes</h4>
                            <ul className="text-xs text-gray-300 italic">
                                {lineups[1]?.substitutes?.length > 0 ? (
                                    lineups[1].substitutes.map((player) => (
                                        <li key={player.player.id} className="py-1">
                                            {player.player.name} ({player.player.number})
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No substitutes available</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            ) : (
                <div className="text-xs text-gray-400 mt-4">No lineup info available</div>
            )}
            {/* Lineup Formations */}

            {/* Head-to-Head Matches Section */}
<div className="flex flex-col w-full max-w-3xl justify-center items-center mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-3 text-white">Head-to-Head Matches</h2>

    {h2h.length > 0 ? (
        h2h.slice(0, 5).map((match, index) => ( // Display last 5 matches
            <div key={index} className="flex w-full justify-between items-center bg-gray-700 p-3 my-1 rounded-md">
                
                {/* Match Date */}
                <div className="text-xs text-gray-400">
                    {new Date(match.fixture.date).toLocaleDateString()}
                </div>

                {/* Home Team */}
                <div className="w-1/3 flex flex-col items-center">
                    <Image
                        src={match.teams.home.logo}
                        alt={match.teams.home.name}
                        width={40}
                        height={40}
                    />
                    <div className="text-xs text-white">{match.teams.home.name}</div>
                </div>

                {/* Score */}
                <div className="text-lg font-bold text-white">
                    {match.fixture.status.short === "FT" ? (
                        `${match.goals.home} - ${match.goals.away}`
                    ) : (
                        "VS"
                    )}
                </div>

                {/* Away Team */}
                <div className="w-1/3 flex flex-col items-center">
                    <Image
                        src={match.teams.away.logo}
                        alt={match.teams.away.name}
                        width={40}
                        height={40}
                    />
                    <div className="text-xs text-white">{match.teams.away.name}</div>
                </div>
            </div>
        ))
    ) : (
        <div className="text-xs text-gray-400">No previous matches found</div>
    )}
</div>

            
        </div>
    );
}
