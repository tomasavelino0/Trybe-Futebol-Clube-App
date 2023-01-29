export const homeTeamInfos = `SELECT 
te.team_name as name,
  SUM(
  case
WHEN home_team_goals > away_team_goals then 3
        WHEN home_team_goals = away_team_goals then 1
        else 0
    end ) as totalPoints,
    count( ma.home_team_id ) as totalGames,
    count(
    case
    when home_team_goals > away_team_goals then 1
end) as totalVictories,
count(
    case
    when home_team_goals = away_team_goals then 1
    end) as totalDraws,
count(
    case
    when home_team_goals < away_team_goals then 1
     end) as totalLosses,
     SUM( ma.home_team_goals) as goalsFavor,
     SUM( ma.away_team_goals) as goalsOwn,
     SUM( ma.home_team_goals - ma.away_team_goals ) as goalsBalance,
   ROUND (((SUM(
  case
WHEN home_team_goals > away_team_goals then 3
        WHEN home_team_goals = away_team_goals then 1
        else 0
    end ) / (count( ma.home_team_id ) * 3)) * 100),2) as efficiency
    from TRYBE_FUTEBOL_CLUBE.teams as te
    INNER JOIN TRYBE_FUTEBOL_CLUBE.matches as ma 
    ON te.id = ma.home_team_id
    WHERE ma.in_progress != 1
    GROUP BY te.team_name
    ORDER BY totalPoints desc, goalsBalance desc ,goalsFavor desc, goalsOwn desc  `;

export const awayTeamInfo = `SELECT 
te.team_name as name,
  SUM(
  case
WHEN away_team_goals > home_team_goals then 3
        WHEN away_team_goals = home_team_goals then 1
        else 0
    end ) as totalPoints,
    count( ma.away_team_id ) as totalGames,
    count(
    case
    when away_team_goals > home_team_goals then 1
end) as totalVictories,
count(
    case
    when away_team_goals = home_team_goals then 1
    end) as totalDraws,
count(
    case
    when away_team_goals < home_team_goals then 1
     end) as totalLosses,
     SUM( ma.away_team_goals) as goalsFavor,
     SUM( ma.home_team_goals) as goalsOwn,
     SUM( ma.away_team_goals - ma.home_team_goals ) as goalsBalance,
   format (((SUM(
  case
WHEN away_team_goals > home_team_goals then 3
        WHEN away_team_goals = home_team_goals then 1
        else 0
    end ) / (count( ma.away_team_id ) * 3)) * 100),2) as efficiency
    from TRYBE_FUTEBOL_CLUBE.teams as te
    INNER JOIN TRYBE_FUTEBOL_CLUBE.matches as ma 
    ON te.id = ma.away_team_id
    WHERE ma.in_progress != 1
    GROUP BY te.team_name
    ORDER BY totalPoints desc, goalsBalance desc ,goalsFavor desc, goalsOwn desc  `;

export const homeAndAwayInfo = `SELECT TRYBE_FUTEBOL_CLUBE.teams.team_name as name,
SUM(
  CASE
    WHEN home_goals > away_goals THEN 3
    WHEN home_goals = away_goals THEN 1
    ELSE 0
  END
) as totalPoints,
COUNT(team) as totalGames,
SUM(
  CASE
    WHEN home_goals > away_goals THEN 1
    ELSE 0
  END
) as totalVictories, 
SUM(
  CASE
    WHEN home_goals = away_goals THEN 1
    ELSE 0
  END
) as totalDraws,
SUM(
  CASE
    WHEN home_goals < away_goals THEN 1
    ELSE 0
  END
) as totalLosses,
SUM(home_goals) as goalsFavor,
SUM(away_goals) as goalsOwn,
SUM(home_goals - away_goals) as goalsBalance,
ROUND(((SUM(
  CASE
    WHEN home_goals > away_goals THEN 3
    WHEN home_goals = away_goals THEN 1
    ELSE 0
  END
) / (COUNT(team)*3)) * 100),2) as efficiency
from
(SELECT home_team_id as team, home_team_goals as home_goals, 
      away_team_goals  as away_goals, 'home' as place
FROM TRYBE_FUTEBOL_CLUBE.matches
WHERE in_progress = 0
UNION ALL
SELECT away_team_id as team, away_team_goals as home_goals, 
     home_team_goals as away_goals, 'away' as place
FROM TRYBE_FUTEBOL_CLUBE.matches
WHERE in_progress = 0 ) AS progresso 
INNER JOIN teams ON teams.id = team
WHERE place IN ('home' ,'away' )
GROUP BY team
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC`;
