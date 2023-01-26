import { Router } from 'express';

import TeamModelSequelize from '../models/TeamSequelizeModel';
import TeamModel from '../models/TeamModel';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const router: Router = Router();

const teamModelSequelize = new TeamModelSequelize();
const teamModel = new TeamModel(teamModelSequelize);
const teamService = new TeamService(teamModel);
const teamController = new TeamController(teamService);

router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);

export default router;
