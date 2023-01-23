import { compare } from 'bcryptjs';
import { createNewToken } from '../auth/loginToken';
import User from '../database/models/User.model';

const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user) return { type: 401, message: 'Incorrect email or password' };

  const validPassword = await compare(password, user.password);

  if (!validPassword) {
    return { type: 401, message: 'Incorrect email or password' };
  }

  const token: string = createNewToken({ email, id: user.id, username: user.username });

  return { type: 200, message: token };
};

export default loginService;
