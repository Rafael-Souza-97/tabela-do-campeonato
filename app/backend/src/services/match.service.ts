import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';

const getAllMatches = async () => {
  const matches = await Match.findAll({
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });

  if (!matches) return { type: 404, response: 'Matches not found' };

  return { type: 200, response: matches };
};

const getMatchesInProgress = async (inProgress: boolean) => {
  const matches = await Match.findAll({
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where: { inProgress },
  });

  return { type: 200, response: matches };
};

export default { getAllMatches, getMatchesInProgress };
