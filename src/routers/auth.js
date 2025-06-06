import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import { registerUserController, loginUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { refreshUserSessionController } from '../controllers/auth.js';


const router = Router();

router.post('/auth/register', validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);
router.post('/auth/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController),
);
router.post('/auth/logout', ctrlWrapper(loginUserController));
router.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
