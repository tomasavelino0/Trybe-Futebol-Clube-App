import { Request, Response } from 'express';
import UserloginServices from '../services/usersLogin.services';

export default class UserLoginControllers {
  constructor(private userService: UserloginServices) {}

  public userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.userService.loginAcess(email, password);
    console.log();

    if (typeof user === 'string') {
      return res.status(401).json({ message: user });
    }

    return res.status(200).json(user);
  };
}
