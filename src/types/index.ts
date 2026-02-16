// 쇼핑몰 공통 타입 정의

/** 상품 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: string;
}

/** 장바구니 아이템 */
export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
}

/** 장바구니 */
export interface Cart {
  id: number;
  items: CartItem[];
  totalPrice: number;
}

/** 주문 */
export interface Order {
  id: number;
  items: CartItem[];
  totalPrice: number;
  status: '결제대기' | '결제완료' | '배송중' | '배송완료' | '취소';
  createdAt: string;
}

/** 사용자 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/** 인증 응답 */
export interface AuthResponse {
  token: string;
  user: User;
}
