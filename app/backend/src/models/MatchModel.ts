import { IModel } from './interfaces/IModel';
import { IMatch, NewGameScoreboard, NewMatchData } from '../interfaces';
import { NotFoundException, InternalServerErrorException } from '../exceptions';

type MatchModelProps<T> = {
  getAllInProgress(inProgress: boolean): Promise<T | null>;
  create(matchData: NewMatchData): Promise<IMatch>;
  finish(id: number): Promise<number>;
  update(id: number, newGameScoreboard: NewGameScoreboard): Promise<number>
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

    if (!newMatch) throw new InternalServerErrorException();

    return newMatch;
  }

  public async finish(id: number): Promise<number> {
    const result = await this._matcModel.finish(id);

    if (!result) throw new InternalServerErrorException();

    return result;
  }

  public async update(id: number, newGameScoreboard: NewGameScoreboard): Promise<number> {
    const { homeTeamGoals, awayTeamGoals } = newGameScoreboard;
    const result = await this._matcModel.update(id, { homeTeamGoals, awayTeamGoals });

    if (!result) throw new InternalServerErrorException();

    return result;
  }
}

export default MatchModel;
