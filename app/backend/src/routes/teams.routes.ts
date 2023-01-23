import { Router } from 'express';
import teamsController from '../controllers/teams.controller';

const router = Router();

router.get('/', teamsController.getAllTeams);
router.get('/:id', teamsController.getTeamById);

export default router;
