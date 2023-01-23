import { SignOptions, sign, verify } from 'jsonwebtoken';
import IToken from '../interfaces/IToken';

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

export const createNewToken = (user: IToken): string => {
  const token = sign({ ...user }, secret, jwtConfig);
  return token;
};

export const tokenVerify = (token: string): IToken => {
  try {
    const userDecoded = verify(token, secret);
    return userDecoded as IToken;
  } catch (error) {
    console.log(error);
    return { email: 'Token must be a valid token' };
  }
};
