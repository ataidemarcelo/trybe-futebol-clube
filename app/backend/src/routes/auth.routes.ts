import { Router } from 'express';

import AuthSequelizeModel from '../models/AuthSequelizeModel';
import AuthService from '../services/AuthService';
import AuthController from '../controllers/AuthController';

const router: Router = Router();

const authModel = new AuthSequelizeModel();
const authService = new AuthService(authModel);
const authController = new AuthController(authService);

router.post('/', authController.login);

export default router;
