import { Router } from 'express';
import teamsController from '../controllers/teams.controller';

const router = Router();

router.get('/', teamsController);

export default router;
