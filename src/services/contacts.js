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

export const createContact = async (payload) => {
        const newContact = await Contact.create(payload);
        return newContact;
};

export const updateContact = async (contactId, payload)=>{
        return Contact.findByIdAndUpdate(contactId, payload, { new: true });
};

export const deleteContact = async (contactId) => {
        return Contact.findByIdAndDelete(contactId);
};
