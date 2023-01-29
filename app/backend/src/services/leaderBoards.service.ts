import { QueryTypes } from 'sequelize';
import IHomeInfo from '../interfaces/leaderBoards';
import sequelize from '../database/models';
import { homeTeamInfos, awayTeamInfo, homeAndAwayInfo } from '../helpers/querysLeaderBoards';

export default class LeaderBoardsService {
  public homeTeamInfos = async (): Promise<IHomeInfo[]> => {
    const leaderBoardHome = await sequelize.query(
      homeTeamInfos,
      { type: QueryTypes.SELECT },
    );
    return leaderBoardHome as IHomeInfo[];
  };

  public awayTeamInfos = async (): Promise<IHomeInfo[]> => {
    const leaderBoardAway = await sequelize.query(
      awayTeamInfo,
      { type: QueryTypes.SELECT },
    );
    return leaderBoardAway as IHomeInfo[];
  };

  public homeAndAwayInfo = async (): Promise<IHomeInfo[]> => {
    const leaderBoardHomeAway = await sequelize.query(
      homeAndAwayInfo,
      { type: QueryTypes.SELECT },
    );
    return leaderBoardHomeAway as IHomeInfo[];
  };
}

// const novo = new LeaderBoardsService();
// console.log(novo.homeTeamInfos().then(console.log));
