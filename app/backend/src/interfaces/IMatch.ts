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

export { NewMatchData, IMatch };

// export default IMatch;
