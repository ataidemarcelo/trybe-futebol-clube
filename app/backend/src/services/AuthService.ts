import AuthModel from '../models/AuthSequelizeModel';
import { UserLogin } from '../interfaces';

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

    // corrigir msgs
    // criar classe de Erros com statusCode
    if (!user) {
      throw new Error('User invalid');
    }

    // usar o bcryptJS ...
    if (user.password !== password) {
      throw new Error('Password invalid');
    }

    // gerar o token JWT
    // ...

    return { token: 'token' };
  }
}

export default AuthService;
