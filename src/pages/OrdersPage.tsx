import { useEffect, useState } from "react";
import { getOrders } from "../api/orders";
import type { Order } from "../types";

// 주문 목록 페이지
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("주문 목록을 불러오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatPrice = (price: number) =>
    price.toLocaleString("ko-KR") + "�";

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("ko-KR");

  if (loading) return <p style={{ padding: "20px" }}>로딩 중...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>주문 내역</h1>

      {orders.length === 0 ? (
        <p>주문 내역이 없윽니다.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>주문번호: {order.id}</span>
                <span style={{ color: "#888" }}>{formatDate(order.createdAt)}</span>
              </div>
              <div style={{ marginBottom: "8px" }}>
                상파:{" "}
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    backgroundColor: order.status === "배송완료" ? "#e8f5e9" : "#fff3e0",
                    color: order.status === "배송완료" ? "#2e7d32" : "#e65100",
                  }}
                >
                  {order.status}
                </span>
              </div>
              <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product.name} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p style={{ fontWeight: "bold", textAlign: "right" }}>
                합계: {formatPrice(order.totalPrice)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
