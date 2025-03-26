type Standing = {
    league: League;
}

type League = {
    id: number,
    name: string,
    country: string,
    logo: string,
    flag: string,
    season: number,
    standings: [
        Team[]
    ]
}

type Team = {
    rank: number,
    team: {
        id: number,
        name: string,
        logo: string
    },
    points: number,
    goalsDiff: number,
    group: string,
    form: string,
    status: {
      long:string;
    },
    description: string,
    all: Games,
    home: Games,
    away: Games,
    update: string
}
type Games = {
    played: number,
    win: number,
    draw: number,
    lose: number,
    goals: {
        for: number,
        against: number
    }
}
// Fixtures

type FixtureInfo = {
    id: number,
    referee: string,
    timezone: string,
    date: string,
    timestamp: number,
    periods: {
        fisrt: number,
        second: number
    },
    venue: {
        id: number,
        name: string,
        city: string
    },
    status: {
        long: string,
        short: string,
        elapsed: number
    }
}

type LeagueFixtures = {
    id: number,
    name: string,
    country: string,
    logo: string,
    flag: string,
    season: number,
    round: string
}

type Teams = {
    home: {
        id: number,
        name: string,
        logo: string,
        winner: boolean
    },
    away: {
        id: number,
        name: string,
        logo: string,
        winner: boolean
    }
}

type Goals = {
    home: number,
    away: number
}

type Score = {
    halftime: Goals,
    fulltime: Goals,
    extratime: Goals,
    penalty: Goals
}

type Fixture = {
    fixture: FixtureInfo,
    league: LeagueFixtures,
    teams: Teams,
    goals: Goals,
    score: Score
}

type AllFixtures = {
    name: string,
    results?:number,
    fixtures: Fixture[]
}
 // Odds
 type ResponseOdds = {
  name:string,
  response:LiveOdds[]
}

type Odds = {
  fixture:FixtureOdds,
  league:LeagueOdds,
  teams:TeamOdds,
  status:StatusOdds,
  update:string
}

type FixtureOdds = {  
            id: number,
            status: {
                long: string,
                elapsed: number,
                seconds: string
             }
}

type LeagueOdds = {
          id: number,
          season: number
}

type TeamOdds = {
      home: {
            id: number,
            goals: number
                },
      away: {
            id: number,
            goals: number
                }
}

type StatusOdds = {
      stopped: boolean,
      blocked: boolean,
      finished: boolean
}

//Live

type AllLiveStates = {
    name:string,
    response:Livestates[]
  }
  
  type Livestates = {
    fixture:Livefixture,
    league:Liveleague,
    teams:Liveteams,
    goals: {
        home: number,
        away: number
        },
    score:Livescore
    }
  
  
  type Livescore = {
    halftime: {
      home: number,
      away: number
    },
    fulltime: {
        home: number,
        away: number
    },
    extratime: {
        home: number,
        away: number
    },
    penalty: {
        home: number,
        away: number
    }
  }
  
  
  
  
  type Liveteams = {
    home: {
      id: number,
      name: string,
      logo: string,
      winner: boolean
   },
    away: {
      id: number,
      name: string,
      logo: string,
      winner: boolean
   }
  }
  
  
  
  
  
  type Livefixture = {
    id: number,
    referee: string,
    timezone: string,
    date: string,
    timestamp: number,
    periods: {
        first: number,
        second: number
    },
    venue: {
        id: number,
        name: string,
        city: string
    },
    status: {
        long: string,
        short: string,
        elapsed: number,
        extra: number
    } 
    
  }
  
  type Liveleague = {
    id: number,
    name: string,
    country: string,
    logo: string,
    flag: string,
    season: number,
    round: string,
    standings: boolean
  }

  //Lineup

  type Lineupsreponse={
    response:Lineups[]
}
type Lineups={
    team:TeamLineup,
    formation:string,
    startXI:StartXILineup[],
    substitutes:StartXILineup[],
    coach:CoachLineup,
}

type TeamLineup={
    id: number,
    name: string,
    logo: string,
    colors: {
      player: {
        primary: string,
        number: string,
        border: string
      },
      goalkeeper: {
        primary: string,
        number: string,
        border: string
      }
    }
}

type StartXILineup= {
    player: {
      id: number,
      name: string,
      number: number,
      pos: string,
      grid: string
    }
}

type CoachLineup= {
    id: number,
    name: string,
    photo: string
}

//top scorers
  
  type Topscorers={
    player:playerscore,
    statistics:statisticsscore[]
  
  }
  
  type playerscore={
    id: number,
    name: string,
    firstname: string,
    lastname: string,
    age: number,
    birth: {
      date: string,
      place: string,
      country: string
    },
    nationality: string,
    height: string,
    weight: string,
    injured: boolean,
    photo: string
  }
  
  type statisticsscore={
    team: {
          id: number,
          name: string,
          logo: string
            },
    league: {
      id: number,
      name: string,
      country: string,
      logo: string,
      flag: string,
      season: number
    },
    games: {
      appearences: number,
      lineups: number,
      minutes: number,
      number: null,
      position: string,
      rating: string,
      captain: boolean
    },
    substitutes: {
      in: number,
      out: number,
      bench: number
    },
    shots: {
      total: number,
      on: number
    },
    goals: {
      total: number,
      conceded: null,
      assists: number,
      saves: number
    },
    passes: {
      total: number,
      key: number,
      accuracy: number
    },
    tackles: {
      total: number,
      blocks: number,
      interceptions: number
    },
    duels: {
      total: number,
      won: number
    },
    dribbles: {
      attempts: number,
      success: number,
      past: null
    },
    fouls: {
      drawn: number,
      committed: number
    },
    cards: {
      yellow: number,
      yellowred: number,
      red: number
    },
    penalty: {
      won: number,
      commited: null,
      scored: number,
      missed: number,
      saved: null
    }
  }

  //h2h

  type H2H={
    fixture:fixtureh2h
    league:leagueh2h
    teams:teamsh2h
    goals:goalsh2h
    score:scoreh2h
 }
 
 type fixtureh2h={
     
         id: number,
         referee: string,
         timezone: string,
         date: string,
         timestamp: number,
         periods: {
           first: number,
           second: number
         },
         venue: {
           id: number,
           name: string,
           city: string,
         },
         status: {
           long: string,
           short: string,
           elapsed: number,
           extra: null
         }
 }
 type leagueh2h={
         id: number,
         name: string,
         country: string,
         logo: string,
         flag: string
         season: number,
         round: string,
         }
 type teamsh2h={
         home: {
           id: number,
           name: string,
           logo: string,
           winner: boolean
         },
         away: {
           id: number,
           name: string,
           logo: string,
           winner: boolean
         }}
 type goalsh2h={
         home: number,
         away: number
         }
 type scoreh2h={
     
         halftime: {
           home: number,
           away: number
         },
         fulltime: {
           home: number,
           away: number
         },
         extratime: {
           home: number,
           away: number
         },
         penalty: {
           home: number,
           away: number
         }
 }

 //EVENTS

type EventsRes={
  response:Events[]
}
 type Events ={
  time: {
      elapsed: number,
      extra: number
    },
    team: {
      id: number,
      name: string,
      logo: string
    },
    player: {
      id: number,
      name: string
    },
    assist: {
      id: number,
      name: string
    },
    type: string,
    detail: string,
    comments: string    
}

export { AllFixtures, Fixture , Team,Standing, ResponseOdds,Odds, Livestates, AllLiveStates,Lineupsreponse,Lineups,League,Topscorers,H2H,Events,EventsRes}