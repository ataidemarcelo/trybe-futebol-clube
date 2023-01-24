import { Request, Response } from 'express';

import AuthService from '../services/AuthService';
import { UserLogin } from '../interfaces';

class AuthController {
  private service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  public login = async (req: Request, res: Response) => {
    const { email, password }: UserLogin = req.body;
    // fazer a validação dos dados da requisição
    // ...

    const token = await this.service.authenticateUser({ email, password });

    res.status(200).json(token);
  };
}

export default AuthController;
