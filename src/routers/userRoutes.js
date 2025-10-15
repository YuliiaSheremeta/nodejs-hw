import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { updateUserAvatar } from '../controllers/userController.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.patch('/me/avatar',authenticate,upload.single('avatar'),ctrlWrapper(updateUserAvatar));

export default router;
