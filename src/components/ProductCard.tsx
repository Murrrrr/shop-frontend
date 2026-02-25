import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../api/cart";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  const formatPrice = (price: number) =>
    price.toLocaleString("ko-KR") + "원";

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdding(true);
    try {
      await addToCart(product.id, 1);
      alert("장바구니에 추가되었습니다!");
    } catch {
      alert("장바구니 추가에 실패했습니다.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3 style={{ margin: 0 }}>{product.name}</h3>
      <p style={{ color: "#888", margin: 0 }}>{product.category}</p>
      <p style={{ fontWeight: "bold", margin: 0, fontSize: "18px" }}>
        {formatPrice(product.price)}
      </p>
      <p
        style={{
          color: product.stock > 0 ? "#4CAF50" : "#f44336",
          margin: 0,
          fontSize: "13px",
        }}
      >
        {product.stock > 0 ? `재고 ${product.stock}개` : "품절"}
      </p>
      {product.stock > 0 && (
        <button
          onClick={handleAddToCart}
          disabled={adding}
          style={{
            marginTop: "8px",
            padding: "8px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {adding ? "추가 중..." : "장바구니 담기"}
        </button>
      )}
    </div>
  );
}
