import mongoose from "mongoose";
import { Schema } from "mongoose";



const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        required: true,
        default: 'personal',
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
},
    {
        timestamps: true,
    }
);
export const Contact = mongoose.model('Contact', contactSchema);
