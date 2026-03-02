import { useState } from "react";

interface PromoBannerProps {
  title?: string;
  subtitle?: string;
}

export default function PromoBanner({
  title = "봄 시즌 세일",
  subtitle = "전 상품 최대 30% 할인"
}: PromoBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        padding: "20px 24px",
        borderRadius: "12px",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h3 style={{ margin: 0, fontSize: "18px" }}>{title}</h3>
        <p style={{ margin: "4px 0 0", opacity: 0.9, fontSize: "14px" }}>{subtitle}</p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        style={{
          background: "rgba(255,255,255,0.2)",
          border: "none",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        닫기
      </button>
    </div>
  );
}
