import { Request, Response } from 'express';
import { tokenVerify } from '../auth/loginToken';
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

const createMatch = async (req: Request, res: Response): Promise<Response> => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  const token = req.headers.authorization;
  const { email } = tokenVerify(token as string);

  if (email === 'Invalid Token') {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const { type, response } = await matchService
    .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

  if (type !== 201) return res.status(type).json({ message: response });

  return res.status(type).json(response);
};

const matchFinished = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { type, response } = await matchService.matchFinished(id);

  return res.status(type).json({ response });
};

const updateMatch = async (req: Request, res: Response) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { id } = req.params;

  const { type, response } = await matchService.updateMatch(id, homeTeamGoals, awayTeamGoals);

  return res.status(type).json({ response });
};

export default {
  getMatches,
  createMatch,
  matchFinished,
  updateMatch,
};
