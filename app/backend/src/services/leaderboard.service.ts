import { teamData, sortWithLeaderboardRules } from '../utils/leadeboard/leaderboard';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import ITeamLeaderboard from '../interfaces/ITeamLeaderboard';
import ITeams from '../interfaces/ITeams';

const homeLeadeboard = async () => {
  const homeMatches = await Match.findAll({
    where: {
      inProgress: false,
    },
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
    ],
  });

  const allTeams = await Team.findAll();
  const leaderboard = allTeams.map((team) => teamData(team, homeMatches, 'homeTeam'));
  const updatedLeaderboard = sortWithLeaderboardRules(leaderboard);

  return { type: 200, homeResponse: updatedLeaderboard };
};

const awayLeadeboard = async () => {
  const awayMatches = await Match.findAll({
    where: {
      inProgress: false,
    },
    include: [
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  const allTeams = await Team.findAll();
  const leaderboard = allTeams.map((team) => teamData(team, awayMatches, 'awayTeam'));
  const updatedLeaderboard = sortWithLeaderboardRules(leaderboard);

  return { type: 200, awayResponse: updatedLeaderboard };
};

const calculateTeamStats = (combinedArray: ITeamLeaderboard[]) => {
  const teams: ITeams = {};

  combinedArray.forEach((team: ITeamLeaderboard) => {
    if (!teams[team.name]) {
      teams[team.name] = team;
    } else {
      teams[team.name].totalPoints += team.totalPoints;
      teams[team.name].totalGames += team.totalGames;
      teams[team.name].totalVictories += team.totalVictories;
      teams[team.name].totalDraws += team.totalDraws;
      teams[team.name].totalLosses += team.totalLosses;
      teams[team.name].goalsFavor += team.goalsFavor;
      teams[team.name].goalsOwn += team.goalsOwn;
      teams[team.name].goalsBalance += team.goalsBalance;
      teams[team.name].efficiency = Number(((teams[team.name].totalPoints * 100)
        / (teams[team.name].totalGames * 3)).toFixed(2));
    }
  });

  return teams;
};

const createLeadeboard = async () => {
  const { homeResponse } = await homeLeadeboard();
  const { awayResponse } = await awayLeadeboard();

  const combinedArray = homeResponse.concat(awayResponse);
  const teams = calculateTeamStats(combinedArray);
  const objectTeams = Object.values(teams);

  return objectTeams;
};

const leaderboard = async () => {
  const finalArray = await createLeadeboard();

  const updatedLeaderboard = sortWithLeaderboardRules(finalArray);

  return { type: 200, response: updatedLeaderboard };
};

export default {
  leaderboard,
  homeLeadeboard,
  awayLeadeboard,
};
