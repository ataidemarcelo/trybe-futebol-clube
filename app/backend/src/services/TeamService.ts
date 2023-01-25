import TeamModel from '../models/TeamSequelizeModel';

class TeamService {
  private model: TeamModel;

  constructor(model: TeamModel) {
    this.model = model;
  }

  public async getAll() {
    const teams = await this.model.getAll();

    return teams;
  }
}

export default TeamService;
