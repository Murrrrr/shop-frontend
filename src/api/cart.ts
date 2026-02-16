import client from "./client";
import type { Cart } from "../types";

// 장바구니 조회
export const getCart = async (): Promise<Cart> => {
  const response = await client.get<Cart>("/cart");
  return response.data;
};

// 장바구니에 상리 추가
export const addToCart = async (productId: number, quantity: number): Promise<Cart> => {
  const response = await client.post<Cart>("/cart/items", { productId, quantity });
  return response.data;
};

// 장바구니에서 상리 제거
export const removeFromCart = async (itemId: number): Promise<Cart> => {
  const response = await client.delete<Cart>("/cart/items/" + itemId);
  return response.data;
};

// 장바구니 아이템 수량 변경
export const updateCartItem = async (itemId: number, quantity: number): Promise<Cart> => {
  const response = await client.patch<Cart>("/cart/items/" + itemId, { quantity });
  return response.data;
};
