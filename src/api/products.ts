import { client } from './client';
import type { Product } from '../types';

export const getProducts = (params?: { category?: string; search?: string; sort?: string; page?: number }) =>
  client.get<Product[]>('/products', { params });

export const getProduct = (id: string) =>
  client.get<Product>(`/products/${id}`);

export const createProduct = (data: Partial<Product>) =>
  client.post<Product>('/products', data);

export const updateProduct = (id: string, data: Partial<Product>) =>
  client.put<Product>(`/products/${id}`, data);

export const deleteProduct = (id: string) =>
  client.delete(`/products/${id}`);

export const searchProducts = (query: string, minPrice?: number, maxPrice?: number) =>
  client.get<Product[]>('/products', { params: { search: query, minPrice, maxPrice } });
