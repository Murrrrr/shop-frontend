import client from "./client";
import type { Product } from "../types";

// 상릭 목록 조회
export const getProducts = async (): Promise<Product[]> => {
  const response = await client.get<Product[]>("/products");
  return response.data;
};

// 상릭 상칩 조회
export const getProduct = async (id: number): Promise<Product> => {
  const response = await client.get<Product>("/products/" + id);
  return response.data;
};

// 상품 검색
export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await client.get<Product[]>("/products", {
    params: { q: query },
  });
  return response.data;
};
