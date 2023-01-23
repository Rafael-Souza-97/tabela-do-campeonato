import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

const getAllTeams = async (_req: Request, res: Response): Promise<Response> => {
  const { type, response } = await teamsService.getAllTeams();

  if (type !== 200) return res.status(type).json({ message: response });

  return res.status(type).json(response);
};

const getTeamById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const teamId = Number(id);

  const { type, response } = await teamsService.getTeamById(teamId);

  if (type !== 200) return res.status(type).json({ message: response });

  return res.status(type).json(response);
};

export default { getAllTeams, getTeamById };
