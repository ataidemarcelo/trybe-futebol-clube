const matchMock = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true,
}

const matchMockRequest = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
};

const matchWithSameTeam = {
  homeTeamId: 16,
  awayTeamId: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2
};

export { 
  matchMock,
  matchMockRequest,
  matchWithSameTeam,
};
