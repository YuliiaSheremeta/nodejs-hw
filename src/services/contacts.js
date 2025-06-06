import mongoose from 'mongoose';
import { Contact } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
        userId,
        page = 1,
        perPage = 10,
        sortOrder = SORT_ORDER.ASC,
        sortBy = '_id',
}) => {
        const limit = perPage;
        const skip = (page - 1) * perPage;
        const filter = { userId };

        const contactsQuery = Contact.find(filter);

        const contactsCount = await Contact.countDocuments(filter);

        const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();

        const paginationData = calculatePaginationData(contactsCount, perPage, page);

        return {
                data: contacts,
                ...paginationData,
        };

};

export const getContactById = async (contactId,userId) => {

        if (!mongoose.Types.ObjectId.isValid(contactId)) {
                return null;
        }

        return Contact.findOne({ _id: contactId, userId });

};

export const createContact = async (payload) => {
        return Contact.create(payload);

};

export const updateContact = async (contactId, payload,userId)=>{
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
                return null;
        }

        return Contact.findOneAndUpdate(
                { _id: contactId, userId },
                payload,
                { new: true });
};

export const deleteContact = async (contactId,userId) => {
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
                return null;
        }
        return Contact.findOneAndDelete({ _id: contactId, userId });
};
