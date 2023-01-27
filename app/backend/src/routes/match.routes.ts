import { Router } from 'express';

import MatchSequelizeModel from '../models/MatchSequelizeModel';
import MatchModel from '../models/MatchModel';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const router: Router = Router();

const matchSequelizeModel = new MatchSequelizeModel();
const matchModel = new MatchModel(matchSequelizeModel);
const matchService = new MatchService(matchModel);
const matchController = new MatchController(matchService);

router.get('/', matchController.getAll);
router.post('/', matchController.create);

export default router;
