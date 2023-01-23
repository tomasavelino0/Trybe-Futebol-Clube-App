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
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const decoded = jwt.verify(token, secret) as IVerifyToken;
      const { id } = decoded.data;

      const user = await this.model.findByPk(id);
      if (user) {
        const { role } = user.dataValues;
        req.body.user = user;

        return res.status(200).json({ role });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    return next();
  };
}
