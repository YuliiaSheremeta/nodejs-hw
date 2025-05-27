import mongoose from 'mongoose';
import { Contact } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
        page = 1,
        perPage = 10,
        sortOrder = SORT_ORDER.ASC,
        sortBy = '_id',
}) => {
        const limit = perPage;
        const skip = (page - 1) * perPage;

        const contactsQuery = Contact.find();

        const contactsCount = await Contact.find().merge(contactsQuery).countDocuments();

        const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();

        const paginationData = calculatePaginationData(contactsCount, perPage, page);

        return {
                data: contacts,
                ...paginationData,
        };

};

export const getContactById = async (contactId) => {

        if (!mongoose.Types.ObjectId.isValid(contactId)) {
                return null;
        }

        const contact = await Contact.findById(contactId);
        return contact;

};

export const createContact = async (payload) => {
        return Contact.create(payload);

};

export const updateContact = async (contactId, payload)=>{
        return Contact.findByIdAndUpdate(contactId, payload, { new: true });
};

export const deleteContact = async (contactId) => {
        return Contact.findByIdAndDelete(contactId);
};
