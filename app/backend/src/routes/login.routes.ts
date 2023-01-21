import { Router } from 'express';
import loginValidation from '../middlewares/login.validation';

const router = Router();

router.post('/', loginValidation);

export default router;
