import Match from '../database/models/Match';
import Team from '../database/models/Team';

import { IMatch } from '../interfaces';
import { IModel } from './interfaces/IModel';
import { NotFoundException } from '../exceptions';

class MatchSequelizeModel implements IModel<IMatch> {
  private matches = Object();
  private match = Object();

  public async getAllInProgress(inProgress: boolean) {
    const matches = await Match.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    if (!matches) throw new NotFoundException('Matches not found.');

    this.matches = matches;

    return this.matches;
  }

  public async getAll() {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    if (!matches) throw new NotFoundException('Matches not found.');

    this.matches = matches;

    return this.matches;
  }

  public async getById(id: number) {
    const match = await Match.findOne({ where: { id } });

    if (!match) throw new NotFoundException('Match not found.');

    this.match = match;

    return this.match;
  }
}

export default MatchSequelizeModel;
