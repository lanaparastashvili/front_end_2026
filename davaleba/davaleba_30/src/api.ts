import axios from 'axios';
import type { Item, PaginatedResponse } from './types';

export const API_BASE_URL = 'http://localhost:3000';

const client = axios.create({
  baseURL: API_BASE_URL,
});

export const api = {
  getItems: async (page: number, limit: number): Promise<PaginatedResponse<Item>> => {
    const res = await client.get<PaginatedResponse<Item>>('/items', {
      params: { page, limit },
    });
    return res.data;
  },

  createItem: async (payload: { name: string; description: string }): Promise<Item> => {
    const res = await client.post<Item>('/items', payload);
    return res.data;
  },

  updateItem: async (
    id: number,
    payload: { name: string; description: string }
  ): Promise<Item> => {
    const res = await client.put<Item>(`/items/${id}`, payload);
    return res.data;
  },

  deleteItem: async (id: number): Promise<void> => {
    await client.delete(`/items/${id}`);
  },

  getSecret: async (
    headerValue: string
  ): Promise<{ message: string; secretData: string }> => {
    const res = await client.get<{ message: string; secretData: string }>('/secret', {
      headers: { 'X-Role': headerValue },
    });
    return res.data;
  },
};
