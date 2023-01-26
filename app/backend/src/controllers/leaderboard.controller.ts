import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const homeLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
  const { type, homeResponse } = await leaderboardService.homeLeadeboard();

  return res.status(type).json(homeResponse);
};

const awayLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
  const { type, awayResponse } = await leaderboardService.awayLeadeboard();

  return res.status(type).json(awayResponse);
};

const leaderboard = async (_req: Request, res: Response): Promise<Response> => {
  const { type, response } = await leaderboardService.leaderboard();

  return res.status(type).json(response);
};

export default {
  leaderboard,
  homeLeaderboard,
  awayLeaderboard,
};
