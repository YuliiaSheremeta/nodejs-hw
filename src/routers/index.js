import { Router } from "express";
import notesRouter from './notesRoutes.js';
import authRouter from './authRoutes.js';

const router = Router();

router.use('/notes', notesRouter);
router.use('/auth', authRouter);

export default router;
