import Match from '../../database/models/Match.model';
import ITeamLeaderboard from '../../interfaces/ITeamLeaderboard';

export const calculateHomeMatchPoints = (match: Match, teamTotalPoints: number) => {
  const { homeTeamGoals, awayTeamGoals } = match;

  if (homeTeamGoals > awayTeamGoals) return teamTotalPoints + 3;

  if (homeTeamGoals === awayTeamGoals) return teamTotalPoints + 1;

  return teamTotalPoints;
};

const calculateHomeWins = (match: Match, teamTotalWins: number) => {
  const { homeTeamGoals, awayTeamGoals } = match;

  const homeWin = homeTeamGoals > awayTeamGoals ? 1 : 0;

  const wins = teamTotalWins + homeWin;

  return wins;
};

const calculateHomeDraws = (match: Match, teamTotalDraws: number) => {
  const { homeTeamGoals, awayTeamGoals } = match;

  const homeDraw = homeTeamGoals === awayTeamGoals ? 1 : 0;

  const draws = teamTotalDraws + homeDraw;

  return draws;
};

const calculateHomeLosses = (match: Match, teamTotalLosses: number) => {
  const { homeTeamGoals, awayTeamGoals } = match;

  const homeDefeat = homeTeamGoals < awayTeamGoals ? 1 : 0;

  const defeats = teamTotalLosses + homeDefeat;

  return defeats;
};

const teamHomeLeadeboard = (team: ITeamLeaderboard, match: Match) => {
  const { homeTeamGoals, awayTeamGoals } = match;

  const teamData = team;

  teamData.totalPoints = calculateHomeMatchPoints(match, team.totalPoints);
  teamData.totalGames += 1;
  teamData.totalVictories = calculateHomeWins(match, team.totalVictories);
  teamData.totalDraws = calculateHomeDraws(match, team.totalDraws);
  teamData.totalLosses = calculateHomeLosses(match, team.totalLosses);
  teamData.goalsFavor += homeTeamGoals;
  teamData.goalsOwn += awayTeamGoals;
  teamData.goalsBalance = teamData.goalsFavor - teamData.goalsOwn;
  teamData.efficiency = Number(((teamData
    .totalPoints / (teamData.totalGames * 3)) * 100).toFixed(2));

  return team;
};

export default teamHomeLeadeboard;
