import { Request, Response } from 'express';

import AuthService from '../services/AuthService';
import { UserLogin } from '../interfaces';
import JoiValidation from '../services/validations/JoiValidation';

class AuthController {
  private service: AuthService;
  private validation: JoiValidation<UserLogin>;

  constructor(service: AuthService, validation: JoiValidation<UserLogin>) {
    this.service = service;
    this.validation = validation;
  }

  public login = async (req: Request, res: Response) => {
    const requestData: UserLogin = req.body;
    const { email, password } = this.validation.validate(requestData);

    const token = await this.service.authenticateUser({ email, password });

    res.status(200).json(token);
  };

  public validateLogin = async (req: Request, res: Response) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('token not exist!');
    }
    const payload = await this.service.validateLogin(token);

    const { sub } = payload;

    const role = sub;

    res.status(200).json({ role });
  };
}

export default AuthController;
