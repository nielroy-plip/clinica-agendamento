import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Acesso negado');

  try {
    const decoded = jwt.verify(token, 'SEGREDO_SUPER_SECRETO') as { id: number };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Token inválido');
  }
};