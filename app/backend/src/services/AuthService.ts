import { compare } from 'bcryptjs';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { jwtSecret, jwtConfig } from '../utils/jwt.config';
import AuthModel from '../models/AuthSequelizeModel';
import { UserLogin } from '../interfaces';
import { AnauthorizedException } from '../exceptions';

type Token = {
  token: string;
};

class AuthService {
  private model: AuthModel;
  private payload: string | JwtPayload = String();

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

    const { role } = user;

    const token = sign({ sub: role }, jwtSecret.secret, jwtConfig);

    return { token };
  }

  public async validateLogin(token: string) {
    this.payload = verify(token, jwtSecret.secret);

    return this.payload;
  }
}

export default AuthService;
