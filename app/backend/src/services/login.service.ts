import { compare } from 'bcryptjs';
import { createNewToken, tokenVerify } from '../auth/loginToken';
import IToken from '../interfaces/IToken';
import User from '../database/models/User.model';

const loginValidation = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user) return { type: 401, message: 'Incorrect email or password' };

  const validPassword = await compare(password, user.password);

  if (!validPassword) return { type: 401, message: 'Incorrect email or password' };

  const token: string = createNewToken({ email, id: user.id, username: user.username });

  return { type: 200, message: token };
};

export const tokenServiceValidation = async (token: string) => {
  const { email }: IToken = tokenVerify(token);

  if (email === 'Invalid Token') return { type: 401, result: email };

  const user = await User.findOne({ where: { email } });

  if (!user) return { type: 404, result: 'User not found' };

  return { type: 200, result: user.role };
};

export default loginValidation;
