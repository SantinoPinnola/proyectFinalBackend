import { Schema } from 'mongoose';

export type userIdReference = Schema.Types.ObjectId | string;

export interface Order {
    _id : string;
    userId : userIdReference;
    items : Array<any>;
    timestamp : number;
    status : string;
}