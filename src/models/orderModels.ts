import mongoose , { Schema }  from 'mongoose';
import { Order } from '../interfaces/ordersInterfaces';

const orderSchema = new mongoose.Schema<Order>({
    userId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    items : [
        {
          _id: Schema.Types.ObjectId,
          amount: Number,
          price : Number
        },
      ],
    timestamp : {
        type : Number, 
        default : Date.now()
    },
    status : {
      type : String,
      default : "Generado",
      required : true,
    }
})