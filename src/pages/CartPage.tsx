import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart, updateCartItem } from "../api/cart";
import { createOrder } from "../api/orders";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Cart } from "../types";

// 장바구니 페이지
export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error("장바구니를 불러오는데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  // 아이템 삭제
  const handleRemove = async (itemId: number) => {
    try {
      const updated = await removeFromCart(itemId);
      setCart(updated);
    } catch (error) {
      console.error("삭제에 실패했습니다:", error);
    }
  };

  // 수량 변경
  const handleQuantityChange = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      const updated = await updateCartItem(itemId, quantity);
      setCart(updated);
    } catch (error) {
      console.error("수량 변경에 실패했습니다:", error);
    }
  };

  // 주문하기
  const handleOrder = async () => {
    if (!cart) return;
    try {
      await createOrder(cart.id);
      alert("주문이 완료되었습니다!");
      navigate("/orders");
    } catch (error) {
      console.error("주문에 실패했습니다:", error);
      alert("주문에 실패했습니다.");
    }
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("ko-KR") + "원";

  if (loading) return <LoadingSpinner message="장바구니를 불러오는 중..." />;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>장바구니</h1>

      {!cart || cart.items.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ddd" }}>
                <th style={{ textAlign: "left", padding: "12px" }}>상리</th>
                <th style={{ textAlign: "center", padding: "12px" }}>수량</th>
                <th style={{ textAlign: "right", padding: "12px" }}>가격</th>
                <th style={{ textAlign: "center", padding: "12px" }}>삭제</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>{item.product.name}</td>
                  <td style={{ textAlign: "center", padding: "12px" }}>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </td>
                  <td style={{ textAlign: "right", padding: "12px" }}>
                    {formatPrice(item.product.price * item.quantity)}
                  </td>
                  <td style={{ textAlign: "center", padding: "12px" }}>
                    <button onClick={() => handleRemove(item.id)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "24px", textAlign: "right" }}>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              합계: {formatPrice(cart.totalPrice)}
            </p>
            <button
              onClick={handleOrder}
              style={{
                marginTop: "12px",
                padding: "12px 32px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              주문하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
