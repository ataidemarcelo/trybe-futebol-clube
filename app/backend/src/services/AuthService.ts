import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { jwtSecret, jwtConfig } from '../utils/jwt.config';
import AuthModel from '../models/AuthSequelizeModel';
import { UserLogin } from '../interfaces';
import { AnauthorizedException } from '../exceptions';

type Token = {
  token: string;
};

class AuthService {
  private model: AuthModel;

  constructor(model: AuthModel) {
    this.model = model;
  }

  public async authenticateUser({ email, password }: UserLogin): Promise<Token> {
    const user = await this.model.getByEmail(email);

    if (!user) {
      throw new AnauthorizedException('Incorrect email or password');
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new AnauthorizedException('Incorrect email or password');
    }

    const { username: name, id: userId } = user;

    const token = sign({ name, userId }, jwtSecret.secret, jwtConfig);

    return { token };
  }
}

export default AuthService;
