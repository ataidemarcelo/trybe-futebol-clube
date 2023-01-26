import MatchModel from '../models/MatchModel';

class MatchService {
  private model: MatchModel;

  constructor(model: MatchModel) {
    this.model = model;
  }

  public async getAll() {
    const matches = await this.model.getAll();

    return matches;
  }
}

export default MatchService;
