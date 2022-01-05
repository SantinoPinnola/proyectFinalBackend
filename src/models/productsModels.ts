import mongoose from 'mongoose';
import {
  ProductI,
} from '../interfaces/productsInterfaces';


export const productsSchema = new mongoose.Schema<ProductI>({
    name : {type : String, required : true, max : 50},
    price : {type : Number, required : true},
    description : {type : String, required : true, max : 240} ,
    thumbnail : {type : String, required : true, max : 64},
    timestamp : {type : Number, default : Date.now()},
    photos : [{
      photoId : String
    }]
});

