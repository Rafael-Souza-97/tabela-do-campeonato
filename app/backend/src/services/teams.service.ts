import Team from '../database/models/Team.model';

const getAllTeams = async () => {
  const teams = await Team.findAll();

  if (!teams) return { type: 404, response: 'Teams not found' };

  return { type: 200, response: teams };
};

export default getAllTeams;
