import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types/product.types';
import { ProductCategory } from '../constants/app.constants';

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { 
      type: String, 
      enum: Object.values(ProductCategory),
      required: true 
    },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true } 
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);