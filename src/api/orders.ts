import client from "./client";
import type { Order } from "../types";

// 주문 목록 조회
export const getOrders = async (): Promise<Order[]> => {
  const response = await client.get<Order[]>("/orders");
  return response.data;
};

// 주문 생성 (장바구니 기반)
export const createOrder = async (cartId: number): Promise<Order> => {
  const response = await client.post<Order>("/orders", { cartId });
  return response.data;
};

// 주문 상세 조회
export const getOrder = async (id: number): Promise<Order> => {
  const response = await client.get<Order>("/orders/" + id);
  return response.data;
};
