import axios from 'axios';
import { IPaginatedResponse } from '@/types';

export const api = axios.create({
  baseURL: 'http://localhost:5001/api', 
  headers: { 'Content-Type': 'application/json' },
});

export const fetchProducts = async ({ pageParam = null, queryKey }: any) => {
  const [_, search, category] = queryKey; 

  const { data } = await api.get<IPaginatedResponse>('/products', {
    params: {
      cursor: pageParam,
      limit: 10,
      search: search || undefined,
      category: category || undefined,
    },
  });
  return data;
};