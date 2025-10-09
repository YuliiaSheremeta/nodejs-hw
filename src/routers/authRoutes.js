import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController, loginUserController,logoutUserController,refreshUserSessionController, sendResetEmailController, resetPasswordController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { requestdResetEmailSchema,registerUserSchema, loginUserSchema, resetPasswordSchema } from "../validations/authValidation.js";



const router = Router();

router.post('/register', validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController),
);
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/request-reset-email', validateBody(requestdResetEmailSchema), ctrlWrapper(sendResetEmailController),);

router.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default router;
