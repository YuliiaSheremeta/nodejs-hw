import { getNotes,getNoteWithId,createNewNote,deleteNoteById,upgradeNote  } from "../services/notes.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';



export const getAllNotes  = async (req, res) => {

    const { _id: userId } = req.user;
    const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { tag, search } = req.query;

    const notes = await getNotes({
        userId,
        page,
        perPage,
        sortBy,
        sortOrder,
        tag,
        search,
    });

    res.json({
        status: 200,
        message: "Retrieved all notes",
        data: notes
    });

};

export const getNoteById = async (req, res) => {
    const { _id: userId } = req.user;
    const { noteId } = req.params;

    const note = await getNoteWithId(noteId, userId);

    if (!note) {
        throw createHttpError(404, "Note not found");

    }

    res.json({
        status: 200,
        message: `Retrieved note with ID: ${noteId}!`,
        data: note,

    });
};
export const createNote = async (req, res) => {

    const { _id: userId } = req.user;

    const noteAdded = await createNewNote({...req.body, userId});

    res.status(201).json({
        status: 201,
		message: "Successfully created a note!",
		data: noteAdded,
    });
};

export const updateNote = async (req, res) => {
    const { _id: userId } = req.user;
    const { noteId } = req.params;

    const result = await upgradeNote(noteId,req.body, userId);

    if (result === null) {

            throw createHttpError(404, "Note not found");

    };

    res.json({
      status: 200,
	    message: "Successfully patched a note!",
	    data:result,
    });
 };

export const deleteNote = async (req, res) => {
    const { noteId } = req.params;
    const { _id: userId } = req.user;

    const noteDeleded = await deleteNoteById(noteId, userId);

    if (noteDeleded === null) {

        throw createHttpError(404, "Note not found");

}


    res.status(204).end();

};
