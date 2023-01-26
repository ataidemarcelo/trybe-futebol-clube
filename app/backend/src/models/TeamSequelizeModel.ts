import Team from '../database/models/Team';
import { ITeam } from '../interfaces';
import { IModel } from './interfaces/IModel';
import { NotFoundException } from '../exceptions';

class TeamSequelizeModel implements IModel<ITeam> {
  private teams = Object();
  private team = Object();

  public async getAll() {
    const teams = await Team.findAll();

    if (!teams) throw new NotFoundException('team not found.');

    this.teams = teams;

    return this.teams;
  }

  public async getById(id: number) {
    const team = await Team.findOne({ where: { id } });

    if (!team) throw new NotFoundException('team not found.');

    this.team = team;

    return this.team;
  }
}

export default TeamSequelizeModel;
