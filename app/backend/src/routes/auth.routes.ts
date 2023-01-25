import { Router } from 'express';
import Joi = require('joi');

import AuthSequelizeModel from '../models/AuthSequelizeModel';
import AuthService from '../services/AuthService';
import AuthController from '../controllers/AuthController';
import JoiValidation from '../services/validations/JoiValidation';
import { UserLogin } from '../interfaces';

const router: Router = Router();

const userLoginSchema = Joi.object<UserLogin>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const authModel = new AuthSequelizeModel();
const authService = new AuthService(authModel);
const validation = new JoiValidation<UserLogin>(userLoginSchema);
const authController = new AuthController(authService, validation);

router.post('/', authController.login);

export default router;
