import Team from '../database/models/Team';
import { InternalServerErrorException } from '../exceptions';

class AuthSequelizeModel {
  private teams = Object();
  private team = Object();

  public async getAll() {
    const teams = await Team.findAll();

    if (!teams) {
      throw new InternalServerErrorException();
    }

    this.teams = teams;

    return this.teams;
  }

  public async getById(id: number) {
    const team = await Team.findOne({ where: { id } });

    if (!team) {
      throw new InternalServerErrorException();
    }

    this.team = team;

    return this.team;
  }
}

export default AuthSequelizeModel;
