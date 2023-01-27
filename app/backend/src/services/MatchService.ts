import MatchModel from '../models/MatchModel';
import { NewMatchData } from '../interfaces';

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
    const newMatch = await this.model.create(matchData);

    return newMatch;
  }
}

export default MatchService;
