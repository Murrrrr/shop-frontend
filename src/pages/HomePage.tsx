import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import ProductFilter from "../components/ProductFilter";
import type { Product } from "../types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ category: "", minPrice: "", maxPrice: "", sort: "newest" });

  const fetchProducts = async (page: number, filterValues = filters) => {
    setLoading(true);
    try {
      const response = await getProducts({
        sort: filterValues.sort || "newest",
        page,
        category: filterValues.category || undefined,
        search: undefined,
      });
      const data = response.data;
      if (Array.isArray(data)) {
        setProducts(data);
        setTotalPages(Math.max(1, Math.ceil(data.length / 20)));
      } else {
        setProducts((data as any).items || []);
        setTotalPages((data as any).pagination?.totalPages || 1);
      }
    } catch {
      console.error("상품을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    fetchProducts(1, newFilters);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <SearchBar />
      </div>

      <h2>신상품</h2>

      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        <div style={{ width: "240px", flexShrink: 0 }}>
          <ProductFilter onFilter={handleFilter} />
        </div>

        <div style={{ flex: 1 }}>
          {loading ? (
            <LoadingSpinner message="상품을 불러오는 중..." />
          ) : products.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888", padding: "40px" }}>
              상품이 없습니다.
            </p>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "16px",
                }}
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
