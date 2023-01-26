import { Router } from 'express';

const router: Router = Router();

router.get('/', (_req, res) => res.json({ message: 'Matches' }));

export default router;
