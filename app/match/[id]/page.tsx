import getEvents from "@/app/util/getEvents";
import Match from "./components/test";
import getFixtureByFixtureId from "@/app/util/getFixtureByFixtureId";
import getH2H from "@/app/util/getH2H";
import getLineup from "@/app/util/getLineup";
import { Events, Fixture, H2H,Lineups } from "@/types";
import getH2HBatch from "@/app/util/getH2H";
import getLineupBatch from "@/app/util/getLineup";
import getEventsBatch from "@/app/util/getEvents";

type PageProps = {
    params: {
        id: string;
    };
};

export default async function page({ params }: PageProps){
    let fixtureByFixtureId: Fixture | undefined = await getFixtureByFixtureId(parseInt(params.id));
// Define pairs of home and away team IDs
const pairs: [number, number][] = [
  [Number(fixtureByFixtureId?.teams.home.id), Number(fixtureByFixtureId?.teams.away.id)]
];

// Fetch H2H data for the pairs
let h2hData = await getH2HBatch(pairs);

// Get the H2H data for the specific fixture pair
let h2h = h2hData[`${pairs[0][0]}-${pairs[0][1]}`]; // Access data using the correct key
// Define the fixture ID to fetch lineups for
const fixtureId = Number(fixtureByFixtureId?.fixture.id);

// Fetch lineup data for the given fixture ID using getLineupBatch
let lineupsData = await getLineupBatch([fixtureId]);

// Access the lineups for the specific fixture ID
let lineups = lineupsData[fixtureId]; // Get the lineups using the fixture ID
// If fixtureId is already declared elsewhere, use a different name here
const fixtureID = Number(fixtureByFixtureId?.fixture.id); // Renamed to fixtureID

// Fetch event data for the given fixture ID using getEventsBatch
let eventsData = await getEventsBatch([fixtureID]);

// Access the events for the specific fixture ID
let events = eventsData[fixtureID]; // Get the events using the fixture ID
    return (
        <div>
            <Match fixtureByFixtureId={fixtureByFixtureId} h2h={h2h} lineups={lineups} events={events}/>
        </div>
    )

}