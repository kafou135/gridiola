import { AllFixtures, AllLiveStates } from '@/types'
import StandingsAndFixtures from './components/home2/StandingsAndFixtures'
import getFixturesForFiveLeagues from './util/getFixturesForFiveLeagues';
import RefreshButton from '@/my comopnents/RefreshButton';
import Stopwatch from '@/my comopnents/stopwatch';

export const revalidate = 1;

export default async function Home() {

  const filteredFixtures: AllFixtures[] = await getFixturesForFiveLeagues();

  if (!filteredFixtures?.length) {
    return null;
  }

  return (
    <div>
      <StandingsAndFixtures filteredFixtures={filteredFixtures} />
    </div>
  )
}