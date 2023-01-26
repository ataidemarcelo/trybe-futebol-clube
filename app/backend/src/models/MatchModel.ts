import { IMatch } from '../interfaces';
import { IModel } from './interfaces/IModel';
import { NotFoundException } from '../exceptions';

class MatchModel implements IModel<IMatch> {
  private _authModel: IModel<IMatch>;

  constructor(authModel: IModel<IMatch>) {
    this._authModel = authModel;
  }

  public async getAll(): Promise<IMatch[]> {
    const matches = await this._authModel.getAll();

    if (!matches) throw new NotFoundException('Matches not found');

    return matches;
  }

  public async getById(id: number): Promise<IMatch> {
    const match = await this._authModel.getById(id);

    if (!match) throw new NotFoundException('Matches not found');

    return match;
  }
}

export default MatchModel;
