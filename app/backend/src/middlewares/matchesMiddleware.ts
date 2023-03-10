import { Request, Response, NextFunction } from 'express';

export default class ValidateMatches {
  public checkHomeTeamAndAway = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    return next();
  };

  public checkBodyUpdateResult = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    if (!homeTeamGoals || !awayTeamGoals) {
      return res.status(400).json({ message: 'missing fields' });
    }
    return next();
  };
}
