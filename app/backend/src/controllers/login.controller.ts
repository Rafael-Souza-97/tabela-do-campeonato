import { Request, Response } from 'express';
import loginService, { tokenServiceValidation } from '../services/login.service';

const loginValidation = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { type, message } = await loginService(email, password);

  if (type === 401) {
    return res.status(type).json({ message });
  }
  return res.status(type).json({ token: message });
};

const tokenControllerValidation = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization) res.status(400).json({ response: 'Token inexistente' });

  const { type, result } = await tokenServiceValidation(authorization as string);

  if (type === 401 || type === 404) return res.status(type).json({ result });

  return res.status(type).json({ role: result });
};

export default { loginValidation, tokenControllerValidation };
