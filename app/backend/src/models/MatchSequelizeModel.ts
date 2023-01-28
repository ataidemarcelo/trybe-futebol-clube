import Match from '../database/models/Match';
import Team from '../database/models/Team';

import { IModel } from './interfaces/IModel';
import { IMatch, NewGameScoreboard, NewMatchData } from '../interfaces';
import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '../exceptions';

class MatchSequelizeModel implements IModel<IMatch> {
  private matches = Object();
  private match = Object();
  private newMatch = Object();
  private result = Object();

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

  public async create(newMatchData: NewMatchData) {
    const newMatch = await Match.create(newMatchData);

    if (!newMatch) throw new InternalServerErrorException();

    this.newMatch = newMatch;

    return this.newMatch;
  }

  public async finish(id: number) {
    const [result] = await Match.update({ inProgress: false }, { where: { id } });

    if (!result) throw new UnprocessableEntityException('Already finished');

    this.result = result;

    return this.result;
  }

  public async update(id: number, newGameScoreboard: NewGameScoreboard) {
    const { homeTeamGoals, awayTeamGoals } = newGameScoreboard;
    const [result] = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    if (!result) throw new UnprocessableEntityException('Already finished');

    this.result = result;

    return this.result;
  }
}

export default MatchSequelizeModel;
