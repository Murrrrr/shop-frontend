import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../api/orders";
import OrderStatusBadge from "../components/OrderStatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Order } from "../types";

export default function OrdersPage() {
  const navigate = useNavigate();
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
    price.toLocaleString("ko-KR") + "원";

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("ko-KR");

  const handleCancelled = (orderId: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "취소" as const } : o))
    );
  };

  if (loading) return <LoadingSpinner message="주문 내역을 불러오는 중..." />;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>주문 내역</h1>

      {orders.length === 0 ? (
        <p>주문 내역이 없습니다.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(`/orders/${order.id}`)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontWeight: "bold" }}>주문번호: {order.id}</span>
                <span style={{ color: "#888" }}>{formatDate(order.createdAt)}</span>
              </div>
              <div style={{ marginBottom: "8px" }}>
                상태: <OrderStatusBadge order={order} onCancelled={handleCancelled} />
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
