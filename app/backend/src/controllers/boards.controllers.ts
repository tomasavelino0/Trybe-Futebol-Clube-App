import { Response, Request } from 'express';
import LeaderBoardsService from '../services/leaderBoards.service';

export default class LeaderBoardsControllers {
  constructor(private boardsService: LeaderBoardsService) {}

  public listInfosHomeTeam = async (_req: Request, res: Response) => {
    const IndoDataHome = await this.boardsService.homeTeamInfos();

    return res.status(200).json(IndoDataHome);
  };

  public listInfosAwayTeam = async (_req: Request, res: Response) => {
    const infoDataAway = await this.boardsService.awayTeamInfos();
    return res.status(200).json(infoDataAway);
  };

  public listInfosAwayAndHome = async (_req: Request, res:Response) => {
    const infoDataAwayHome = await this.boardsService.homeAndAwayInfo();
    return res.status(200).json(infoDataAwayHome);
  };
}
