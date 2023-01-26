import Match from '../../database/models/Match.model';
import ITeamLeaderboard from '../../interfaces/ITeamLeaderboard';

export const calculateAwayMatchPoints = (match: Match, teamTotalPoints: number) => {
  const { homeTeamGoals, awayTeamGoals } = match;

  if (homeTeamGoals < awayTeamGoals) return teamTotalPoints + 3;

  if (homeTeamGoals === awayTeamGoals) return teamTotalPoints + 1;

  return teamTotalPoints;
};

const calculateAwayWins = (match: Match, teamTotalWins: number) => {
  const { homeTeamGoals, awayTeamGoals } = match;

  const awayWin = homeTeamGoals < awayTeamGoals ? 1 : 0;

  const wins = teamTotalWins + awayWin;

  return wins;
};

const calculateAwayDraws = (match: Match, teamTotalDraws: number) => {
  const { homeTeamGoals, awayTeamGoals } = match;

  const awayDraw = homeTeamGoals === awayTeamGoals ? 1 : 0;

  const draws = teamTotalDraws + awayDraw;

  return draws;
};

const calculateAwayLosses = (match: Match, teamTotalLosses: number) => {
  const { homeTeamGoals, awayTeamGoals } = match;

  const awayDefeat = homeTeamGoals > awayTeamGoals ? 1 : 0;

  const defeats = teamTotalLosses + awayDefeat;

  return defeats;
};

const teamAwayLeadeboard = (team: ITeamLeaderboard, match: Match) => {
  const { awayTeamGoals, homeTeamGoals } = match;

  const teamData = team;

  teamData.totalPoints = calculateAwayMatchPoints(match, teamData.totalPoints);
  teamData.totalGames += 1;
  teamData.totalVictories = calculateAwayWins(match, teamData.totalVictories);
  teamData.totalDraws = calculateAwayDraws(match, teamData.totalDraws);
  teamData.totalLosses = calculateAwayLosses(match, teamData.totalLosses);
  teamData.goalsFavor += awayTeamGoals;
  teamData.goalsOwn += homeTeamGoals;
  teamData.goalsBalance = teamData.goalsFavor - teamData.goalsOwn;
  teamData.efficiency = Number(
    ((teamData.totalPoints / (teamData.totalGames * 3)) * 100).toFixed(2),
  );

  return teamData;
};

export default teamAwayLeadeboard;
