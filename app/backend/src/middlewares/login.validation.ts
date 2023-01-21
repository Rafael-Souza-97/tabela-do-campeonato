import { Request, Response, NextFunction } from 'express';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'All fields must be filled',
    });
  }

  const formattedEmail = email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);

  if (!formattedEmail) {
    return res.status(401)
      .json({ message: 'Incorrect email or password' });
  }

  return next();
};

export default loginValidation;
