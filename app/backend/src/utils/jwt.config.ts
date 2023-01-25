import { SignOptions } from 'jsonwebtoken';

export const jwtSecret = {
  secret: process.env.JWT_SECRET || 'SenhaVindaDasVariaveisDeAmbiente',
};

export const jwtConfig = {
  expiresIn: '15Min',
  algorithm: 'HS256',
} as SignOptions;
