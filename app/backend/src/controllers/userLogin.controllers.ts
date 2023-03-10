import { Request, Response } from 'express';
import UserloginServices from '../services/usersLogin.services';

export default class UserLoginControllers {
  constructor(private userService: UserloginServices) {}

  public userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.userService.loginAcess(email, password);

    if (typeof user === 'string') {
      return res.status(401).json({ message: user });
    }

    return res.status(200).json(user);
  };

  public roleUser = async (req: Request, res: Response) => {
    const { role } = req.body.user;
    return res.status(200).json({ role });
  };
}
