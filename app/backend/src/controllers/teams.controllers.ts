import { Request, Response } from 'express';
import TeamsServices from '../services/teams.services';

export default class TeamsControllers {
  constructor(private teamsService: TeamsServices) {}

  public listAllTeams = async (_req: Request, res: Response) => {
    const allTeams = await this.teamsService.getAllTeams();
    res.status(200).json(allTeams);
  };

  public listTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamById = await this.teamsService.getTeamById(Number(id));
    if (!teamById) {
      return res.status(401).json({ message: 'not found' });
    }
    res.status(200).json(teamById);
  };
}
