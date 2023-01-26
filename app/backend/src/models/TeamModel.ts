import { ITeam } from '../interfaces';
import { IModel } from './interfaces/IModel';

export default class TeamModel implements IModel<ITeam> {
  private _teamModel: IModel<ITeam>;

  constructor(teamModel: IModel<ITeam>) {
    this._teamModel = teamModel;
  }

  public async getAll(): Promise<ITeam[]> {
    const teams = await this._teamModel.getAll();

    return teams;
  }

  public async getById(id: number): Promise<ITeam | null> {
    const team = await this._teamModel.getById(id);

    return team;
  }
}
