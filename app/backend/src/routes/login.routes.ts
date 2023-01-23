import { Router } from 'express';
import loginController from '../controllers/login.controller';
import loginValidation from '../middlewares/login.validation';

const router = Router();

router.get('/validate', loginController.tokenControllerValidation);
router.post('/', loginValidation, loginController.loginValidation);

export default router;
