import { IMatch, NewMatchData } from '../interfaces';
import { IModel } from './interfaces/IModel';
import { NotFoundException, InternalServerErrorException } from '../exceptions';

type MatchModelProps<T> = {
  getAllInProgress(inProgress: boolean): Promise<T | null>;
  create(matchData: NewMatchData): Promise<IMatch>;
  finish(id: number): Promise<number>;
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

    if (!match) throw new NotFoundException('Match not found');

    return match;
  }

  public async create(matchData: NewMatchData): Promise<IMatch> {
    const newMatchData = { ...matchData, inProgress: true };
    const newMatch = await this._matcModel.create(newMatchData);

    if (!newMatch) throw new InternalServerErrorException('Internal server error');

    return newMatch;
  }

  public async finish(id: number): Promise<number> {
    const result = await this._matcModel.finish(id);

    if (!result) throw new InternalServerErrorException('Internal server error');

    return result;
  }
}

export default MatchModel;
