import { IUser } from '../interfaces';
import User from '../database/models/User';
import { InternalServerErrorException } from '../exceptions';

class AuthModel {
  private user: IUser = Object();

  public async getByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) {
      throw new InternalServerErrorException('Internal server error');
    }

    this.user = user;

    return this.user as IUser;
  }
}

export default AuthModel;
