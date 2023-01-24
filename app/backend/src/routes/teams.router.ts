import { Router } from 'express';
import TeamsControllers from '../controllers/teams.controllers';
import TeamsServices from '../services/teams.services';

const teamsRouter = Router();

const teamServices = new TeamsServices();
const teamControllers = new TeamsControllers(teamServices);

teamsRouter.get('', teamControllers.listAllTeams);
teamsRouter.get('/:id', teamControllers.listTeamById);

export default teamsRouter;
