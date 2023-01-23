import { Router } from 'express';
import matchController from '../controllers/match.controller';

const router = Router();

router.get('/', matchController.getMatches);

export default router;

// teste
