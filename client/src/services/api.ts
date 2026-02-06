import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import { IPaginatedResponse } from '@/types';

export const api = axios.create({
  baseURL: 'http://localhost:5001/api', 
  headers: { 'Content-Type': 'application/json' },
});

export const fetchProducts = async ({ 
  pageParam, 
  queryKey 
}: QueryFunctionContext<readonly [string, string | null, string | null], string | null>) => {
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