import Team from './ITeam';

type TeamName = Omit<Team, 'id'>;

interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    teamName: TeamName;
  },
  awayTeam: {
    teamName: TeamName;
  },
}

export default IMatch;
