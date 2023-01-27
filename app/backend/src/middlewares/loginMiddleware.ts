import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/users';
import { IVerifyToken } from '../interfaces/tokenJwt';
import 'dotenv/config';

const secret = process.env.JWT_SECRET as string;

export default class LoginValidate {
  private model = UserModel;
  public checkBodyLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    return next();
  };

  public checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const decoded = jwt.verify(token, secret) as IVerifyToken;
      const { id } = decoded.data;

      const user = await this.model.findByPk(id);
      if (user) {
        req.body.user = user;
        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    return next();
  };
}
