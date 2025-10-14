import mongoose from 'mongoose';
import {Note } from '../models/note.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getNotes = async ({
        userId,
        page = 1,
        perPage = 10,
        sortOrder = SORT_ORDER.ASC,
        sortBy = '_id',
        tag,
        search,
}) => {
        const limit = perPage;
        const skip = (page - 1) * perPage;
        const filter = { userId };

   if (tag) {
    filter.tag = tag;
  }

if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

        const notesQuery = Note.find(filter);

        const notesCount = await Note.countDocuments(filter);

        const notes = await notesQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();

        const paginationData = calculatePaginationData(notesCount, perPage, page);

        return {
               notes,
                ...paginationData,
        };

};

export const getNoteWithId = async (noteId,userId) => {

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
                return null;
        }

        return Note.findOne({ _id: noteId, userId });

};

export const createNewNote = async (payload) => {
        return Note.create(payload);

};

export const upgradeNote = async (noteId, payload,userId)=>{
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
                return null;
        }

        return Note.findOneAndUpdate(
                { _id: noteId, userId },
                payload,
                { new: true });
};

export const deleteNoteById = async (noteId,userId) => {
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
                return null;
        }
        return Note.findOneAndDelete({ _id: noteId, userId });
};
