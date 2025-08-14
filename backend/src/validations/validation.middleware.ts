import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = 
  (schema: ZodSchema, type: 'body' | 'params' | 'query' ) => 
    (req: Request, res: Response, next: NextFunction) => {
      try {

        const parsedData = schema.parse(req[type]);

        (req as any)[type] = parsedData;

        next();
      } catch (error) {
        return res.status(400).json(error);
      }
    };