import { Router } from 'express';
import Joi = require('joi');

import AuthSequelizeModel from '../models/AuthSequelizeModel';
import AuthModel from '../models/AuthModel';
import AuthService from '../services/AuthService';
import JoiValidation from '../services/validations/JoiValidation';
import AuthController from '../controllers/AuthController';
import { UserLogin } from '../interfaces';

const router: Router = Router();

const userLoginSchema = Joi.object<UserLogin>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const authSequelizeModel = new AuthSequelizeModel();
const authModel = new AuthModel(authSequelizeModel);
const authService = new AuthService(authModel);
const validation = new JoiValidation<UserLogin>(userLoginSchema);
const authController = new AuthController(authService, validation);

router.post('/', authController.login);
router.get('/validate', authController.validateLogin);

export default router;
