import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../api/products";
import { addToCart } from "../api/cart";
import type { Product } from "../types";

// 상리 상셸 페이지
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await getProduct(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("상품 정보를 빈러앤는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // 장바구니에 추가
  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product.id, quantity);
      alert("장바구니에 추가되었습니다!");
      navigate("/cart");
    } catch (error) {
      console.error("장바구니 추가에 실패했습니다:", error);
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("ko-KR") + "원";

  if (loading) return <p style={{ padding: "20px" }}>로딩 중...</p>;
  if (!product) return <p style={{ padding: "20px" }}>상품 찠을 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "16px" }}>
        &larr; 뒤로가기
      </button>

      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: "400px", height: "400px", objectFit: "cover", borderRadius: "8px" }}
        />

        <div style={{ flex: 1, minWidth: "250px" }}>
          <p style={{ color: "#888" }}>{product.category}</p>
          <h1 style={{ margin: "8px 0" }}>{product.name}</h1>
          <p style={{ fontSize: "24px", fontWeight: "bold", margin: "16px 0" }}>
            {formatPrice(product.price)}
          </p>
          <p style={{ lineHeight: 1.6, color: "#555" }}>{product.description}</p>

          <div style={{ marginTop: "24px" }}>
            <label>
              수량:&nbsp;
              <input
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ width: "60px", padding: "4px" }}
              />
            </label>
            <span style={{ marginLeft: "12px", color: "#888" }}>
              재고: {product.stock}개
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              marginTop: "20px",
              padding: "12px 32px",
              fontSize: "16px",
              backgroundColor: product.stock > 0 ? "#4CAF50" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: product.stock > 0 ? "pointer" : "not-allowed",
            }}
          >
            {product.stock > 0 ? "장바구니에 담기" : "품죈"}
          </button>
        </div>
      </div>
    </div>
  );
}
