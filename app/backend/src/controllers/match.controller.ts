import { Request, Response } from 'express';
import matchService from '../services/match.service';

const getAllMatches = async (_req: Request, res: Response): Promise<Response> => {
  const { type, response } = await matchService.getAllMatches();

  if (type !== 200) return res.status(type).json({ message: 'Matches not found' });

  return res.status(type).json(response);
};

export default { getAllMatches };
