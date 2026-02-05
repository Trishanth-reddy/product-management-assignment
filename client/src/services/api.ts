import axios from 'axios';
import { IPaginatedResponse } from '@/types';

export const api = axios.create({
  baseURL: 'http://localhost:5001/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async ({ pageParam = null }: { pageParam?: string | null }) => {
  const { data } = await api.get<IPaginatedResponse>('/products', {
    params: {
      cursor: pageParam,
      limit: 10,
    },
  });
  return data;
};