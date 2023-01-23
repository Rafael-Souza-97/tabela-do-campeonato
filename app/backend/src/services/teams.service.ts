import Team from '../database/models/Team.model';

const getAllTeams = async () => {
  const teams = await Team.findAll();

  if (!teams) return { type: 404, response: 'Teams not found' };

  return { type: 200, response: teams };
};

const getTeamById = async (id: number) => {
  const team = await Team.findByPk(id);

  if (!team) return { type: 404, message: 'Team not found' };

  return { type: 200, response: team };
};

export default { getAllTeams, getTeamById };
