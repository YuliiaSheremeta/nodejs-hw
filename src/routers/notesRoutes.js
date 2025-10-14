import { Router } from "express";
import { getAllNotes, getNoteById,createNote,deleteNote,updateNote } from "../controllers/notesController.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllNotesSchema,noteIdSchema,createNoteSchema,updateNoteSchema } from "../validations/notesValidation.js";
import { authenticate } from '../middlewares/authenticate.js';
import { celebrate } from "celebrate";

const router = Router();

router.use(authenticate);

router.get('/notes', celebrate(getAllNotesSchema), ctrlWrapper(getAllNotes));

router.get('/notes/:noteId', celebrate(noteIdSchema), ctrlWrapper(getNoteById));

router.post('/notes', celebrate(createNoteSchema), ctrlWrapper(createNote));

router.patch('/notes/:noteId', celebrate(updateNoteSchema), ctrlWrapper(updateNote));

router.delete('/notes/:noteId',celebrate(noteIdSchema), ctrlWrapper(deleteNote));

export default router;
