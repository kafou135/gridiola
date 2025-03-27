import { AllFixtures, ResponseOdds } from '@/types'
import StandingsAndFixtures from './components/home2/StandingsAndFixtures'
import getFixturesForFiveLeagues from './util/getFixturesForFiveLeagues';

export const revalidate = 60;

export default async function Home() {

  const filteredFixtures: AllFixtures[] = await getFixturesForFiveLeagues();

  if (!filteredFixtures?.length) {
    return null;
  }

  return (
  <div>
        <StandingsAndFixtures filteredFixtures={filteredFixtures}/>
    </div>
  )
}