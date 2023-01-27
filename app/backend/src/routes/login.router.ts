import { Router } from 'express';
import LoginValidate from '../middlewares/loginMiddleware';
import UserloginServices from '../services/usersLogin.services';
import UserLoginControllers from '../controllers/userLogin.controllers';

const usersRouter = Router();
const userLoginService = new UserloginServices();
const UserLoginController = new UserLoginControllers(userLoginService);
const Loginvalidate = new LoginValidate();

usersRouter.post('/', Loginvalidate.checkBodyLogin, UserLoginController.userLogin);
usersRouter.get('/validate', Loginvalidate.checkToken, UserLoginController.roleUser);

export default usersRouter;
