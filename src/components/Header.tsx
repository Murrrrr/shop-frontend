import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCart } from "../api/cart";
import { getProfile } from "../api/auth";
import type { User } from "../types";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCart()
      .then((cart) => setCartCount(cart.items.length))
      .catch(() => setCartCount(0));

    getProfile()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, [location.pathname]);

  const navItems = [
    { label: "홈", path: "/" },
    { label: "검색", path: "/search" },
    { label: "주문내역", path: "/orders" },
  ];

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <span
          onClick={() => navigate("/")}
          style={{ fontSize: "20px", fontWeight: "bold", cursor: "pointer" }}
        >
          ShopMall
        </span>
        <nav style={{ display: "flex", gap: "16px" }}>
          {navItems.map((item) => (
            <span
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                cursor: "pointer",
                color: location.pathname === item.path ? "#2196F3" : "#555",
                fontWeight: location.pathname === item.path ? "bold" : "normal",
              }}
            >
              {item.label}
            </span>
          ))}
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer", position: "relative" }}
        >
          장바구니
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-12px",
                backgroundColor: "#f44336",
                color: "#fff",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                fontSize: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartCount}
            </span>
          )}
        </span>
        {user ? (
          <span
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer", color: "#2196F3" }}
          >
            {user.name}
          </span>
        ) : (
          <span
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "#2196F3" }}
          >
            로그인
          </span>
        )}
      </div>
    </header>
  );
}
