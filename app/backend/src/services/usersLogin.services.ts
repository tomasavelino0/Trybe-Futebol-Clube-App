import * as bcrypt from 'bcryptjs';
import IUserToken from '../interfaces/userLogin';
import { createToken } from '../auth/jwtFunctions';
import UserModel from '../database/models/users';

export default class UserloginServices {
  private model = UserModel;

  public async findByEmailDb(email: string): Promise<IUserToken | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user?.email) return null;
    return user;
  }

  public async loginAcess(email: string, password: string): Promise<string | object> {
    const user = await this.findByEmailDb(email);
    if (!user) return 'Incorrect email or password';

    const verifyPassword = await bcrypt.compare(password, user.dataValues.password);

    if (!verifyPassword) return 'Incorrect email or password';

    const {
      password: _password,
      username: _username,
      email: _email,
      ...userWithoutPassword } = user.dataValues;

    const token = createToken(userWithoutPassword);

    return { token };
  }
}
