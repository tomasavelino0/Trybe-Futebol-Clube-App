import { NextFunction, Request, Response } from 'express';
import MatchesServices from '../services/matches.services';

export default class MatchesControllers {
  constructor(private matchesService: MatchesServices) {}

  public listAllMatches = async (_req: Request, res:Response) => {
    const allMatches = await this.matchesService.getAllMatches();

    return res.status(200).json(allMatches);
  };

  public listMatchesInProgress = async (req: Request, res:Response, next: NextFunction) => {
    const progress = req.query.inProgress as string;
    if (!progress) return next();

    const boleanInprogress = (progress === 'true');
    const filteredMatchByProgress = await this.matchesService.filterByProgress(boleanInprogress);
    return res.status(200).json(filteredMatchByProgress);
  };

  public createMatch = async (req: Request, res:Response) => {
    const payload = req.body;
    const match = await this.matchesService.createMatch(payload);
    if (typeof match === 'string') {
      return res.status(404).json({ message: match });
    }
    return res.status(201).json(match);
  };

  public updateProgressToFalse = async (req: Request, res:Response) => {
    const { id } = req.params;
    const updatedMatchToProgressFalse = await this.matchesService
      .updateProgressMatchToFalse(Number(id));

    return res.status(200).json({ message: updatedMatchToProgressFalse });
  };

  public updateMatchResult = async (req: Request, res:Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const matchUpdated = await this.matchesService
      .updateResultMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));

    if (matchUpdated === null) {
      return res.status(400).json({ message: 'bad request' });
    }
    return res.status(200).json({ message: 'match has been updated' });
  };
}
