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

const createMatch = async (
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const homeTeam = await Team.findByPk(homeTeamId);
  const awayTeam = await Team.findByPk(awayTeamId);

  if (!homeTeam || !awayTeam) return { type: 404, response: 'There is no team with such id!' };

  const match = await Match.create({
    homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
  });

  if (!match) return { type: 500, response: 'Something went wrong' };

  return { type: 201, response: match };
};

const matchFinished = async (id: string) => {
  await Match.update({ inProgress: false }, { where: { id } });

  return { type: 200, response: 'Finished' };
};

const updateMatch = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
  await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

  return { type: 200, response: 'Updated' };
};

export default {
  getAllMatches,
  getMatchesInProgress,
  createMatch,
  matchFinished,
  updateMatch,
};
