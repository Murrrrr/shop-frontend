import { cancelOrder } from "../api/orders";
import type { Order } from "../types";

interface OrderStatusBadgeProps {
  order: Order;
  onCancelled?: (orderId: number) => void;
}

const statusColors: Record<string, { bg: string; color: string }> = {
  결제대기: { bg: "#fff3e0", color: "#e65100" },
  결제완료: { bg: "#e3f2fd", color: "#1565c0" },
  배송중: { bg: "#f3e5f5", color: "#7b1fa2" },
  배송완료: { bg: "#e8f5e9", color: "#2e7d32" },
  취소: { bg: "#ffebee", color: "#c62828" },
};

export default function OrderStatusBadge({ order, onCancelled }: OrderStatusBadgeProps) {
  const style = statusColors[order.status] ?? { bg: "#eee", color: "#333" };

  const handleCancel = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("주문을 취소하시겠습니까?")) return;
    try {
      await cancelOrder(order.id);
      onCancelled?.(order.id);
    } catch {
      alert("주문 취소에 실패했습니다.");
    }
  };

  const canCancel = order.status === "결제대기" || order.status === "결제완료";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
      <span
        style={{
          padding: "4px 10px",
          borderRadius: "4px",
          backgroundColor: style.bg,
          color: style.color,
          fontSize: "13px",
          fontWeight: "bold",
        }}
      >
        {order.status}
      </span>
      {canCancel && (
        <button
          onClick={handleCancel}
          style={{
            padding: "2px 8px",
            fontSize: "12px",
            color: "#f44336",
            background: "none",
            border: "1px solid #f44336",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          취소
        </button>
      )}
    </span>
  );
}
