import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

const getAllTeams = async (_req: Request, res: Response): Promise<Response> => {
  const { type, response } = await teamsService();

  if (type !== 200) return res.status(type).json({ message: response });

  return res.status(type).json(response);
};

export default getAllTeams;
