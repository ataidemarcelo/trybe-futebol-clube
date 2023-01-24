import { Router } from 'express';

import authRouter from './auth.routes';

const router = Router();

router.use('/login', authRouter);

export default router;
