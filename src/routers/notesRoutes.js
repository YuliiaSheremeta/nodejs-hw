import { Router } from "express";
import { getAllNotes, getNoteById,createNote,deleteNote,updateNote } from "../controllers/notesController.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from "../validations/notesValidation.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);
router.get('/notes', ctrlWrapper(getAllNotes) );

router.get('/notes/:noteId', isValidId, ctrlWrapper(getNoteById));
router.post('/notes', validateBody(createContactSchema),ctrlWrapper(createNote));
router.patch('/notes/:noteId',isValidId,validateBody(updateContactSchema), ctrlWrapper(updateNote));
router.delete('/notes/:noteId', isValidId, ctrlWrapper(deleteNote));

export default router;
