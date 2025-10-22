import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUser,loginUser,logoutUser,refreshUserSession,requestResetEmail,resetPassword } from "../controllers/authController.js";
import { requestResetEmailSchema,registerUserSchema, loginUserSchema, resetPasswordSchema } from "../validations/authValidation.js";
import { celebrate } from "celebrate";



const router = Router();

router.post('/register', celebrate(registerUserSchema),
    ctrlWrapper(registerUser),
);
router.post('/login', celebrate(loginUserSchema), ctrlWrapper(loginUser));
router.post('/logout', ctrlWrapper(logoutUser));
router.post('/refresh', ctrlWrapper(refreshUserSession));

router.post('/request-reset-email', celebrate(requestResetEmailSchema), ctrlWrapper(requestResetEmail));

router.post('/reset-password', celebrate(resetPasswordSchema), ctrlWrapper(resetPassword));

export default router;
