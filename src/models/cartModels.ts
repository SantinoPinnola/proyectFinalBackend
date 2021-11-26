import mongoose, { Schema } from 'mongoose';
import { CartI } from '../interfaces/cartInterfaces';


export const cartSchema = new mongoose.Schema<CartI>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  products: [
    {
      _id: Schema.Types.ObjectId,
      amount: Number,
    },
  ],
});

