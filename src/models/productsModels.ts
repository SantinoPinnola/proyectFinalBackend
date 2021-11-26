import mongoose from 'mongoose';
import {
  ProductI,
} from '.././interfaces/productsInterfaces';


export const productsSchema = new mongoose.Schema<ProductI>({
    name : {type : String, require : true, max : 50},
    price : {type : Number, require : true},
    description : {type : String, require : true, max : 240} ,
    thumbnail : {type : String, require : true, max : 64},
    timestamp : {type : Number, default : Date.now()}
});

