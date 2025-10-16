import { Router } from "express";
import notesRouter from './notesRoutes.js';
import authRouter from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/notes', notesRouter);
router.use('/auth', authRouter);
router.use('/users',userRoutes);

export default router;
