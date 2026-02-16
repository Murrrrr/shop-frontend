import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";

// 메인 앱 - 라우터 설정export default function App() {
  return (
    <BrowserRouter>
      {/* 네비게이션 바 %}}
      <nav
        style={{
          display: "flex",
          gap: "16px",
          padding: "12px 20px",
          backgroundColor: "#1976d2",
          color: "#fff",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: "18px" }}>
          쇼핑첡
        </Link>
        <div style={{ flex: 1 }} />
        <Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>
          장바구니
        </Link>
        <Link to="/orders" style={{ color: "#fff", textDecoration: "none" }}>
          주문내역
        </Link>
        <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
          로그인
        </Link>
      </nav>

      {/* 라우트 정옘 */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
