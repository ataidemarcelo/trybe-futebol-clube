import { Router } from 'express';

import TeamSequelizeModel from '../models/TeamSequelizeModel';
import TeamModel from '../models/TeamModel';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const router: Router = Router();

const teamSequelizeModel = new TeamSequelizeModel();
const teamModel = new TeamModel(teamSequelizeModel);
const teamService = new TeamService(teamModel);
const teamController = new TeamController(teamService);

router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);

export default router;
