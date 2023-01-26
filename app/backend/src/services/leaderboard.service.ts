import { teamData, sortWithLeaderboardRules } from '../utils/leadeboard/leaderboard';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';

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

  return { type: 200, response: updatedLeaderboard };
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
  console.log(leaderboard);
  const updatedLeaderboard = sortWithLeaderboardRules(leaderboard);

  return { type: 200, response: updatedLeaderboard };
};

export default { homeLeadeboard, awayLeadeboard };
