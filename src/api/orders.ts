import client from "./client";
import type { Order } from "../types";

// 주문 목록 조회
export const getOrders = async (status?: string): Promise<Order[]> => {
  const response = await client.get<Order[]>("/orders", { params: { status } });
  return response.data;
};

// 주문 생성 (장바구니 기반)
export const createOrder = async (cartId: number, shippingAddress?: string): Promise<Order> => {
  const response = await client.post<Order>("/orders", { cartId, shippingAddress });
  return response.data;
};

// 주문 상세 조회
export const getOrder = async (id: number): Promise<Order> => {
  const response = await client.get<Order>("/orders/" + id);
  return response.data;
};

// 주문 취소
export const cancelOrder = async (id: number): Promise<Order> => {
  const response = await client.patch<Order>("/orders/" + id + "/cancel");
  return response.data;
};
