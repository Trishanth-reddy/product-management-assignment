import { Product } from '../models/Product.model';
import { IProduct, IPaginatedResponse, ICursorPaginationRequest } from '../types/product.types';
import { PAGINATION_CONSTANTS } from '../constants/app.constants';

export const getProductsService = async (
  query: ICursorPaginationRequest
): Promise<IPaginatedResponse> => {
  
  const limit = query.limit || PAGINATION_CONSTANTS.DEFAULT_LIMIT;
  const cursor = query.cursor;
  const search = query.search;

  let dbQuery: any = {};

  if (search) {
    dbQuery.name = { $regex: search, $options: 'i' };
  }

  if (cursor) {
    dbQuery._id = { $gt: cursor };
  }

  const products = await Product.find(dbQuery)
    .sort({ _id: 1 }) 
    .limit(limit + 1)
    .lean<IProduct[]>();

  const hasMore = products.length > limit;
  let nextCursor = null;
  let data = products;

  if (hasMore) {
    data = products.slice(0, limit); 
    nextCursor = data[data.length - 1]._id as string;
  } else if (products.length > 0) {
    nextCursor = products[products.length - 1]._id as string;
  }

  return {
    data,
    pagination: {
      nextCursor,
      hasMore
    }
  };
};