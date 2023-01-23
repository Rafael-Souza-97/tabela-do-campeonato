import { Router } from 'express';
import loginController from '../controllers/login.controller';
import loginValidation from '../middlewares/login.validation';

const router = Router();

router.post('/', loginValidation, loginController);

export default router;
