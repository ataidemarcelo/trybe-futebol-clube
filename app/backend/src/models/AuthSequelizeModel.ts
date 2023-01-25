import { IUser } from '../interfaces';
import User from '../database/models/User';
import { AnauthorizedException } from '../exceptions';

class AuthSequelizeModel {
  private user: IUser = Object();

  public async getByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) {
      throw new AnauthorizedException('Incorrect email or password');
    }

    this.user = user;

    return this.user as IUser;
  }
}

export default AuthSequelizeModel;
