import { Router } from 'express';

import authRouter from './auth.routes';
import teamRouter from './team.routes';
import matchRouter from './match.routes';

const routers = Router();

routers.use('/login', authRouter);
routers.use('/teams', teamRouter);
routers.use('/matches', matchRouter);

export default routers;
