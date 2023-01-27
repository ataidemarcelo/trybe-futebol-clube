type TeamName = {
  teamName: string;
};

interface ITeam extends TeamName {
  id: number;
}

export { ITeam, TeamName };
