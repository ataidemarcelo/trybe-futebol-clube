import Team from '../database/models/Team';

import MatchModel from '../models/MatchModel';
import { NewMatchData } from '../interfaces';
import { NotFoundException } from '../exceptions';

class MatchService {
  private model: MatchModel;

  constructor(model: MatchModel) {
    this.model = model;
  }

  public async getAll() {
    const matches = await this.model.getAll();

    return matches;
  }

  public async getAllInProgress(inProgress: boolean) {
    const matchesInProgress = await this.model.getAllInProgress(inProgress);

    return matchesInProgress;
  }

  public async create(matchData: NewMatchData) {
    const { homeTeamId, awayTeamId } = matchData;
    const thereIsHomeTeam = await Team.findOne({ where: { id: homeTeamId } });
    const thereIsAwayTeam = await Team.findOne({ where: { id: awayTeamId } });

    if (!thereIsHomeTeam || !thereIsAwayTeam) {
      throw new NotFoundException('There is no team with such id!');
    }

    const newMatch = await this.model.create(matchData);

    return newMatch;
  }

  public async finish(id: number) {
    const result = await this.model.finish(id);

    return result;
  }
}

export default MatchService;
