import Team from '../database/models/Team';
import { InternalServerErrorException } from '../exceptions';

class AuthSequelizeModel {
  private teams = Object();

  public async getAll() {
    const teams = await Team.findAll();

    if (!teams) {
      throw new InternalServerErrorException();
    }

    this.teams = teams;

    return this.teams;
  }
}

export default AuthSequelizeModel;
