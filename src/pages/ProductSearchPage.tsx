import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../api/products";
import type { Product } from "../types";

export default function ProductSearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchProducts(
        query,
        minPrice ? Number(minPrice) : undefined,
        maxPrice ? Number(maxPrice) : undefined
      );
      setResults(data.data);
    } catch {
      alert("검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("ko-KR") + "원";

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>상품 검색</h1>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="상품명 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: "8px", minWidth: "200px" }}
        />
        <input
          type="number"
          placeholder="최소 가격"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ width: "120px", padding: "8px" }}
        />
        <input
          type="number"
          placeholder="최대 가격"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ width: "120px", padding: "8px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "8px 24px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "검색 중..." : "검색"}
        </button>
      </form>

      {searched && results.length === 0 && !loading && (
        <p style={{ textAlign: "center", color: "#888" }}>검색 결과가 없습니다.</p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {results.map((product) => (
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
            <h3 style={{ margin: "0 0 8px" }}>{product.name}</h3>
            <p style={{ color: "#888", fontSize: "14px" }}>{product.category}</p>
            <p style={{ fontWeight: "bold", color: "#2196F3" }}>{formatPrice(product.price)}</p>
            <p style={{ fontSize: "12px", color: product.stock > 0 ? "#4CAF50" : "#f44336" }}>
              {product.stock > 0 ? `재고 ${product.stock}개` : "품절"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
