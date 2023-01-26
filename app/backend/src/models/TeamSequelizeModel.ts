import { ITeam } from '../interfaces';
import Team from '../database/models/Team';
import { InternalServerErrorException } from '../exceptions';
import { IModel } from './interfaces/IModel';

class TeamSequelizeModel implements IModel<ITeam> {
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
      throw new InternalServerErrorException('Internal Server error.');
    }

    this.team = team;

    return this.team;
  }
}

export default TeamSequelizeModel;
