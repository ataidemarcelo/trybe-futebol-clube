import TeamModel from '../models/TeamModel';

class TeamService {
  private model: TeamModel;

  constructor(model: TeamModel) {
    this.model = model;
  }

  public async getAll() {
    const teams = await this.model.getAll();

    return teams;
  }

  public async getById(id: number) {
    const team = await this.model.getById(id);

    return team;
  }
}

export default TeamService;
