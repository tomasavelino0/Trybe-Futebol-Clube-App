import * as jwt from 'jsonwebtoken';
import IJwtconfig, { IVerifyToken } from '../interfaces/tokenJwt';
import 'dotenv/config';

const secret = process.env.JWT_SECRET as string;

const jwtConfig: IJwtconfig = {
  expiresIn: '7d',
};

const createToken = (userWithoutPassword: object): string => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

const verifyToken = (authorization: string): IVerifyToken => {
  const payload = jwt.verify(authorization, secret);
  return payload as IVerifyToken;
};

export { createToken, verifyToken };
