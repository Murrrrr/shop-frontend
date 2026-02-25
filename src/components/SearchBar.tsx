import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../api/products";
import type { Product } from "../types";

interface SearchBarProps {
  onResults?: (products: Product[]) => void;
  placeholder?: string;
}

export default function SearchBar({ onResults, placeholder = "상품 검색..." }: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (onResults) {
      setSearching(true);
      try {
        const response = await searchProducts(query);
        onResults(response.data);
      } catch {
        console.error("검색에 실패했습니다.");
      } finally {
        setSearching(false);
      }
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{ display: "flex", gap: "8px", width: "100%" }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: "10px 14px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      />
      <button
        type="submit"
        disabled={searching}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {searching ? "검색 중..." : "검색"}
      </button>
    </form>
  );
}
