import { IMatch } from '../interfaces';
import { IModel } from './interfaces/IModel';
import { NotFoundException } from '../exceptions';

type MatchModelProps<T> = {
  getAllInProgress(inProgress: boolean): Promise<T | null>
} & IModel<T>;

class MatchModel implements IModel<IMatch> {
  private _matcModel: MatchModelProps<IMatch>;

  constructor(matcModel: MatchModelProps<IMatch>) {
    this._matcModel = matcModel;
  }

  public async getAllInProgress(inProgress: boolean): Promise<IMatch> {
    const matches = await this._matcModel.getAllInProgress(inProgress);

    if (!matches) throw new NotFoundException('Matches in progress not found');

    return matches;
  }

  public async getAll(): Promise<IMatch[]> {
    const matches = await this._matcModel.getAll();

    if (!matches) throw new NotFoundException('Matches not found');

    return matches;
  }

  public async getById(id: number): Promise<IMatch> {
    const match = await this._matcModel.getById(id);

    if (!match) throw new NotFoundException('Matches not found');

    return match;
  }
}

export default MatchModel;
