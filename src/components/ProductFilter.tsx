import { useState } from "react";

interface FilterValues {
  category: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

interface ProductFilterProps {
  categories?: string[];
  onFilter: (filters: FilterValues) => void;
}

const sortOptions = [
  { value: "newest", label: "최신순" },
  { value: "price_asc", label: "가격 낮은순" },
  { value: "price_desc", label: "가격 높은순" },
  { value: "best_selling", label: "인기순" },
];

export default function ProductFilter({ categories = [], onFilter }: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterValues>({
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  });

  const update = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    const empty: FilterValues = { category: "", minPrice: "", maxPrice: "", sort: "newest" };
    setFilters(empty);
    onFilter(empty);
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#555",
    marginBottom: "4px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h3 style={{ margin: 0, fontSize: "16px" }}>필터</h3>

      {categories.length > 0 && (
        <div>
          <p style={labelStyle}>카테고리</p>
          <select
            value={filters.category}
            onChange={(e) => update("category", e.target.value)}
            style={inputStyle}
          >
            <option value="">전체</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <p style={labelStyle}>가격 범위</p>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="number"
            placeholder="최소"
            value={filters.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
            style={{ ...inputStyle, width: "auto", flex: 1 }}
          />
          <span style={{ color: "#888" }}>~</span>
          <input
            type="number"
            placeholder="최대"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
            style={{ ...inputStyle, width: "auto", flex: 1 }}
          />
        </div>
      </div>

      <div>
        <p style={labelStyle}>정렬</p>
        <select
          value={filters.sort}
          onChange={(e) => update("sort", e.target.value)}
          style={inputStyle}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={handleApply}
          style={{
            flex: 1,
            padding: "8px",
            backgroundColor: "#2196F3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          적용
        </button>
        <button
          onClick={handleReset}
          style={{
            flex: 1,
            padding: "8px",
            backgroundColor: "#fff",
            color: "#555",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
}
