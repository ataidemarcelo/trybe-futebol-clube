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
}

export default AuthController;
