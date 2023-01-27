import { IMatchesFull, IUpdateMatch, IMatch } from '../interfaces/matches';
import MatchModel from '../database/models/matches';
import TeamsModel from '../database/models/teams';

export default class MatchesServices {
  private model = MatchModel;
  private modelTeam = TeamsModel;

  public getAllMatches = async ():Promise<IMatchesFull[] | null> => {
    const allMatches = await this.model.findAll({ include: [{
      model: TeamsModel,
      as: 'homeTeam',
      attributes: {
        exclude: ['id'],
      } },
    {
      model: TeamsModel,
      as: 'awayTeam',
      attributes: {
        exclude: ['id'],
      } }],
    });

    if (!allMatches) return null;
    return allMatches as MatchModel[] & IMatchesFull[];
  };

  public filterByProgress = async (query: boolean): Promise<IMatchesFull[] | null> => {
    const filterByProgressTrue = await this.model.findAll({
      where: { inProgress: query },
      include: [{
        model: TeamsModel,
        as: 'homeTeam',
        attributes: {
          exclude: ['id'],
        } },
      {
        model: TeamsModel,
        as: 'awayTeam',
        attributes: {
          exclude: ['id'],
        } },
      ] });
    if (!filterByProgressTrue) return null;
    return filterByProgressTrue as MatchModel[] & IMatchesFull[];
  };

  public createMatch = async (payload: IUpdateMatch): Promise<IMatch | string> => {
    const teams = await this.modelTeam.findAll();
    const homeTeamExist = teams.some((team) => team.id === Number(payload.homeTeamId));
    const awayTeamExist = teams.some((team) => team.id === Number(payload.awayTeamId));

    if (!homeTeamExist || !awayTeamExist) {
      return 'There is no team with such id!';
    }
    const match = await this.model.create({ inProgress: true, ...payload });

    return match;
  };

  public updateProgressMatchToFalse = async (id: number): Promise<string | null> => {
    const updatedMatch = await this.model.update({ inProgress: false }, { where: { id } });
    if (updatedMatch) return 'Finished';
    return null;
  };

  public updateResultMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number)
  : Promise<void | null> => {
    const updatedMatch = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    if (updatedMatch[0] === 0) return null;
  };
}

// const novo = new MatchesServices();
// console.log(novo.updateResultMatch(1, 1, 1));
