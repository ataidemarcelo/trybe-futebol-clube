import { Router } from 'express';

const router: Router = Router();

router.post('/', (_req, res) => res.status(200).json({ token: 'token' }));

export default router;
