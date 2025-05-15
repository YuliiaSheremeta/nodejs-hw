import mongoose from 'mongoose';
import { Contact } from '../models/contacts.js';

export const getAllContacts = async () => {

        const contacts = await Contact.find();
        return contacts;

};

export const getContactById = async (contactId) => {

        if (!mongoose.Types.ObjectId.isValid(contactId)) {
                return null;
        }

        const contact = await Contact.findById(contactId);
        return contact;

};
