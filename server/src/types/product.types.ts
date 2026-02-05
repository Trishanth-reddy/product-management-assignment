import { ProductCategory } from '../constants/app.constants';

export interface IProduct {
  _id?: string; 
  name: string;
  description: string;
  price: number;
  category: ProductCategory; 
  stock: number;
  createdAt?: Date;
}

export interface IPaginatedResponse {
  data: IProduct[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
  };
}

export interface ICursorPaginationRequest {
  limit?: number;
  cursor?: string;
  search?: string;
}