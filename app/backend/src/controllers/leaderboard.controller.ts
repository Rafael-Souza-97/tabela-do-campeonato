import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const homeLeaderboard = async (_req: Request, res: Response) => {
  const { type, response } = await leaderboardService.homeLeadeboard();

  return res.status(type).json(response);
};

const awayLeaderboard = async (_req: Request, res: Response) => {
  const { type, response } = await leaderboardService.awayLeadeboard();

  return res.status(type).json(response);
};

export default { homeLeaderboard, awayLeaderboard };
