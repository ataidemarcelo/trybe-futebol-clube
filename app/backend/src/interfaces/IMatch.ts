type NewGameScoreboard = { homeTeamGoals: number, awayTeamGoals: number };

type NewMatchData = {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
};

interface IMatch extends NewMatchData {
  id: number;
  homeTeam: {
    teamName: string;
  },
  awayTeam: {
    teamName: string;
  },
}

export { NewGameScoreboard, NewMatchData, IMatch };
