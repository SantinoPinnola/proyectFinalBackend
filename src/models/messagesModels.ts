import mongoose from "mongoose";
import {Messages} from '../interfaces/messagesInterfaces'

const messagesCollection = 'messages';

export const MessagesSchema = new mongoose.Schema<Messages>({
    email : {type : String, require : true, max : 64},
    msg : {type : String, require : true, min : 1},
    timestamp : {type : Date, default : Date.now()},
})

export const mensajes = mongoose.model(messagesCollection, MessagesSchema);