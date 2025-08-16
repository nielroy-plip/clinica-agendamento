export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Acesso negado');

  try {
    const decoded = jwt.verify(token, 'SEGREDO_SUPER_SECRETO');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Token inválido');
  }
};