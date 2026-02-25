import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/products";
import type { Product } from "../types";

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getProducts({ sort: "newest", page: 1 });
        setProducts(response.data);
      } catch {
        console.error("상품을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatPrice = (price: number) =>
    price.toLocaleString("ko-KR") + "원";

  if (loading) return <p style={{ padding: "20px" }}>로딩 중...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>쇼핑몰</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              cursor: "pointer",
            }}
          >
            <h3>{product.name}</h3>
            <p style={{ color: "#888" }}>{product.category}</p>
            <p style={{ fontWeight: "bold" }}>{formatPrice(product.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
