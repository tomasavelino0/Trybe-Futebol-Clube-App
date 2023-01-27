export interface IMatch {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchesFull extends IMatch {
  homeTeam: {
    teamName:string,
  }
  awayTeam: {
    teamName:string,
  }
}

export interface IUpdateMatch {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
}
