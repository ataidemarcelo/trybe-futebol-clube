import { Router } from 'express';

import authRouter from './auth.routes';
import teamRouter from './team.routes';

const router = Router();

router.use('/login', authRouter);
router.use('/teams', teamRouter);

export default router;
