import { Request, Response } from 'express';
import loginService from '../services/login.service';

const loginValidation = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { type, message } = await loginService(email, password);

  if (type === 401) {
    return res.status(type).json({ message });
  }
  return res.status(type).json({ token: message });
};

export default loginValidation;
