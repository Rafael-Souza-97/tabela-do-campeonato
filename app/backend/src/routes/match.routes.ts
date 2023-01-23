import { Router } from 'express';
import matchController from '../controllers/match.controller';

const router = Router();

router.get('/', matchController.getMatches);
router.post('/', matchController.createMatch);
router.patch('/:id/finish', matchController.matchFinished);
router.patch('/:id', matchController.updateMatch);

export default router;
