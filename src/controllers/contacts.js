import { getAllContacts, getContactById, updateContact, createContact, deleteContact } from "../services/contacts.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getAllContactsController = async (req, res) => {

    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
    });

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts
    });

};

export const getContactByIdController = async (req, res) => {

    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, "Contact not found");

    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,

    });
};
export const createContactController = async (req, res) => {
    const contactAdded = await createContact (req.body);

    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
		data: contactAdded,
    });
};

export const updateContactController = async (req, res) => {
    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body);

    if (result === null) {

            throw createHttpError(404, "Contact not found");

    };

    res.json({
        status: 200,
	    message: "Successfully patched a contact!",
	    data:result,
    });
 };

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;

    const contactDeleded = await deleteContact(contactId);

    if (contactDeleded === null) {

        throw createHttpError(404, "Contact not found");

}


    res.status(204).end();

};
