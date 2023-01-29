import { Router } from 'express';
import LeaderBoardsControllers from '../controllers/boards.controllers';
import LeaderBoardsService from '../services/leaderBoards.service';

const leaderBoardRouter = Router();
const leaderBoardService = new LeaderBoardsService();
const leaderBoardController = new LeaderBoardsControllers(leaderBoardService);

leaderBoardRouter.get('/home', leaderBoardController.listInfosHomeTeam);
leaderBoardRouter.get('/away', leaderBoardController.listInfosAwayTeam);
leaderBoardRouter.get('', leaderBoardController.listInfosAwayAndHome);

export default leaderBoardRouter;
