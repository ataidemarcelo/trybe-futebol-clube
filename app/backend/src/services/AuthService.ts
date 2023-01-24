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

    // usar o bcryptJS ...
    if (user.password !== password) {
      throw new AnauthorizedException('Incorrect email or password');
    }

    // gerar o token JWT
    // ...

    return { token: 'token' };
  }
}

export default AuthService;
