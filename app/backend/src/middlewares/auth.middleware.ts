import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AnauthorizedException } from '../exceptions';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AnauthorizedException('Token must be a valid token');
  }

  const payload = verify(token, jwtSecret);

  req.body.user = payload;

  return next();
};

export default authMiddleware;
