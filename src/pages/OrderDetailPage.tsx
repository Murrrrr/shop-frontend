import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder, cancelOrder } from "../api/orders";
import type { Order } from "../types";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await getOrder(Number(id));
        setOrder(data);
      } catch {
        alert("주문 정보를 불러오는데 실패했습니다.");
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleCancel = async () => {
    if (!order) return;
    if (!confirm("주문을 취소하시겠습니까?")) return;
    try {
      const updated = await cancelOrder(order.id);
      setOrder(updated);
      alert("주문이 취소되었습니다.");
    } catch {
      alert("주문 취소에 실패했습니다. 이미 배송 중일 수 있습니다.");
    }
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("ko-KR") + "원";

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) return <p style={{ padding: "20px" }}>로딩 중...</p>;

  if (!order) return null;

  const canCancel = order.status === "결제대기" || order.status === "결제완료";

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => navigate("/orders")}
        style={{ marginBottom: "16px", background: "none", border: "none", cursor: "pointer", color: "#2196F3" }}
      >
        ← 주문 목록으로
      </button>

      <h1>주문 상세</h1>

      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "24px", marginTop: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <p style={{ color: "#888", fontSize: "14px" }}>주문번호</p>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>#{order.id}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "#888", fontSize: "14px" }}>주문일시</p>
            <p>{formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              backgroundColor: order.status === "배송완료" ? "#e8f5e9" : order.status === "취소" ? "#ffebee" : "#fff3e0",
              color: order.status === "배송완료" ? "#2e7d32" : order.status === "취소" ? "#c62828" : "#e65100",
              fontWeight: "bold",
            }}
          >
            {order.status}
          </span>
        </div>

        <h3 style={{ marginTop: "24px", marginBottom: "12px" }}>주문 상품</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>상품</th>
              <th style={{ textAlign: "center", padding: "8px" }}>수량</th>
              <th style={{ textAlign: "right", padding: "8px" }}>가격</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{item.product.name}</td>
                <td style={{ textAlign: "center", padding: "8px" }}>{item.quantity}</td>
                <td style={{ textAlign: "right", padding: "8px" }}>
                  {formatPrice(item.product.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: "right", marginTop: "16px", borderTop: "2px solid #ddd", paddingTop: "16px" }}>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>합계: {formatPrice(order.totalPrice)}</p>
        </div>

        {canCancel && (
          <button
            onClick={handleCancel}
            style={{
              marginTop: "16px",
              padding: "10px 24px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            주문 취소
          </button>
        )}
      </div>
    </div>
  );
}
