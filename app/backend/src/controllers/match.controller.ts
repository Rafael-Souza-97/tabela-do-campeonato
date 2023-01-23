import { Request, Response } from 'express';
import matchService from '../services/match.service';

const getMatches = async (req: Request, res: Response): Promise<Response> => {
  const { inProgress } = req.query;

  if (inProgress !== undefined) {
    const booleanInProgress = JSON.parse(inProgress as string);

    const { type, response } = await matchService.getMatchesInProgress(booleanInProgress);

    return res.status(type).json(response);
  }
  const { type, response } = await matchService.getAllMatches();

  if (type !== 200) return res.status(type).json({ message: 'Matches not found' });

  return res.status(type).json(response);
};

export default { getMatches };
