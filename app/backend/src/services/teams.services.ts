import ITeams from '../interfaces/teams';
import TeamModel from '../database/models/teams';

export default class TeamsServices {
  private model = TeamModel;

  public getAllTeams = async (): Promise<ITeams[] | null> => {
    const allTeams = await this.model.findAll();

    return allTeams;
  };

  public getTeamById = async (id: number): Promise<ITeams | null> => {
    const teamById = await this.model.findByPk(id);
    if (!teamById) return null;

    return teamById;
  };
}
