import mongoose from "mongoose";
import { Schema } from "mongoose";
import { TAGS } from "../constants/tags.js";



const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
  type:String,
    required: false,
    default:'',

  },
  tag: {
    type: String,
    enum: TAGS,
    default:'Todo',
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
export const Note = mongoose.model('Note', noteSchema);
