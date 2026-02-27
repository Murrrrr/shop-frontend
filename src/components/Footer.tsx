import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const links = [
    { label: "홈", path: "/" },
    { label: "검색", path: "/search" },
    { label: "장바구니", path: "/cart" },
    { label: "주문내역", path: "/orders" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid #ddd",
        backgroundColor: "#fafafa",
        padding: "24px",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>ShopMall</span>
          <p style={{ color: "#888", fontSize: "13px", margin: "4px 0 0" }}>
            &copy; {new Date().getFullYear()} ShopMall. All rights reserved.
          </p>
        </div>

        <nav style={{ display: "flex", gap: "16px" }}>
          {links.map((link) => (
            <span
              key={link.path}
              onClick={() => navigate(link.path)}
              style={{
                cursor: "pointer",
                color: "#555",
                fontSize: "14px",
              }}
            >
              {link.label}
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
