import { IUser } from '../interfaces';
import { IModelEmail } from './interfaces/IModel';
import { AnauthorizedException } from '../exceptions';

export default class AuthModel implements IModelEmail<IUser> {
  private _authModel: IModelEmail<IUser>;

  constructor(authModel: IModelEmail<IUser>) {
    this._authModel = authModel;
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    const user = await this._authModel.getByEmail(email);

    if (!user) throw new AnauthorizedException('Incorrect email or password');

    return user;
  }
}
