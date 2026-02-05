import { Product } from '../models/Product.model';
import { IProduct } from '../types/product.types';
import { SortOrder } from '../constants/app.constants';

export const getProducts = async (limit: number, cursor?: string, search?: string, category?: string) => {
  const query: any = {};

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  if (category) {
    query.category = category;
  }

  if (cursor) {
    query._id = { $gt: cursor };
  }

  const products = await Product.find(query)
    .sort({ _id: SortOrder.ASC }) 
    .limit(limit + 1);

  const hasMore = products.length > limit;
  const nextCursor = hasMore ? products[limit - 1]._id : null;
  const data = hasMore ? products.slice(0, limit) : products;

  return {
    data,
    pagination: {
      nextCursor,
      hasMore
    }
  };
};

export const createProduct = async (productData: Partial<IProduct>) => {
  const product = new Product(productData);
  return await product.save();
};