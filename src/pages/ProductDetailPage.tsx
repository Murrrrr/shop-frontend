import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../api/products";
import { addToCart } from "../api/cart";
import LoadingSpinner from "../components/LoadingSpinner";
import type { Product } from "../types";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data);
      } catch {
        alert("상품 정보를 불러오는데 실패했습니다.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product.id, quantity);
      alert("장바구니에 추가되었습니다!");
    } catch {
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("ko-KR") + "원";

  if (loading) return <LoadingSpinner message="상품 정보를 불러오는 중..." />;
  if (!product) return null;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => navigate("/")}
        style={{ marginBottom: "16px", background: "none", border: "none", cursor: "pointer", color: "#2196F3" }}
      >
        ← 상품 목록으로
      </button>

      <h1>{product.name}</h1>
      <p style={{ color: "#888", marginBottom: "8px" }}>{product.category}</p>
      <p style={{ marginBottom: "16px" }}>{product.description}</p>
      <p style={{ fontSize: "24px", fontWeight: "bold", color: "#2196F3" }}>{formatPrice(product.price)}</p>
      <p style={{ color: product.stock > 0 ? "#4CAF50" : "#f44336", marginBottom: "24px" }}>
        {product.stock > 0 ? `재고 ${product.stock}개` : "품절"}
      </p>

      {product.stock > 0 && (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input
            type="number"
            min={1}
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            style={{ width: "80px", padding: "8px" }}
          />
          <button
            onClick={handleAddToCart}
            style={{
              padding: "12px 32px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            장바구니 담기
          </button>
        </div>
      )}
    </div>
  );
}
