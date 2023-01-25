import { compare } from 'bcryptjs';

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

    // gerar o token JWT
    // ...

    return { token: 'token' };
  }
}

export default AuthService;
