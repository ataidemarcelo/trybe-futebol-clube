import { Router } from 'express';

import MatchSequelizeModel from '../models/MatchSequelizeModel';
import MatchModel from '../models/MatchModel';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import authMiddleware from '../middlewares/auth.middleware';

const router: Router = Router();

const matchSequelizeModel = new MatchSequelizeModel();
const matchModel = new MatchModel(matchSequelizeModel);
const matchService = new MatchService(matchModel);
const matchController = new MatchController(matchService);

router.get('/', matchController.getAll);
router.post('/', authMiddleware, matchController.create);
router.patch('/:id/finish', matchController.finish);

export default router;
