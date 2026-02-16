import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, searchProducts } from "../api/products";
import type { Product } from "../types";

// 홈페이지 - 상릭 목록 그리드
export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("상품 목록을 불러오는데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      loadProducts();
      return;
    }
    setLoading(true);
    try {
      const data = await searchProducts(query);
      setProducts(data);
    } catch (error) {
      console.error("검색에 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  // 가격 포맷팅 (월화)
  const formatPrice = (price: number) =>
    price.toLocaleString("ko-KR") + "원";

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>쇼핑첡</h1>

      {/* 검색 폼 */}
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="상품 검색..."
          style={{ padding: "8px 12px", width: "300px", marginRight: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          검색
        </button>
      </form>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              to={"/products/" + product.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }}
                />
                <h3 style={{ margin: "12px 0 4px" }}>{product.name}</h3>
                <p style={{ color: "#888", fontSize: "14px" }}>{product.category}</p>
                <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
