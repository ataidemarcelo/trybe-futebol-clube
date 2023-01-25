import { Router } from 'express';

import TeamModel from '../models/TeamSequelizeModel';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const router: Router = Router();

const teamModel = new TeamModel();
const teamService = new TeamService(teamModel);
const teamController = new TeamController(teamService);

router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);

export default router;
