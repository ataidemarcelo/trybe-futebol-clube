import User from '../database/models/User';
import { IUser } from '../interfaces';
import { IModelEmail } from './interfaces/IModel';
import { AnauthorizedException } from '../exceptions';

class AuthSequelizeModel implements IModelEmail<IUser> {
  private user = Object();

  public async getByEmail(email: string) {
    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) throw new AnauthorizedException('Incorrect email or password');

    this.user = user;

    return this.user;
  }
}

export default AuthSequelizeModel;
