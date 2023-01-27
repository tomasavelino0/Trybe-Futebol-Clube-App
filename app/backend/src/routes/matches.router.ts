import { Router } from 'express';
import ValidateMatches from '../middlewares/matchesMiddleware';
import MatchesControllers from '../controllers/matches.controllers';
import MatchesServices from '../services/matches.services';
import LoginValidate from '../middlewares/loginMiddleware';

const matchesRouter = Router();

const matchesService = new MatchesServices();
const matchesController = new MatchesControllers(matchesService);
const matchesMiddlewares = new ValidateMatches();
const loginMiddlewares = new LoginValidate();

matchesRouter.get('', matchesController.listMatchesInProgress);

matchesRouter.get('', matchesController.listAllMatches);

matchesRouter.post(
  '',
  loginMiddlewares.checkToken,
  matchesMiddlewares.checkHomeTeamAndAway,
  matchesController.createMatch,
);

matchesRouter.patch('/:id/finish', matchesController.updateProgressToFalse);

matchesRouter.patch(
  '/:id',
  matchesMiddlewares.checkBodyUpdateResult,
  matchesController.updateMatchResult,
);

export default matchesRouter;
