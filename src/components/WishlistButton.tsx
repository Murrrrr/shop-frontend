import { useState } from "react";

interface WishlistButtonProps {
  productId: number;
  size?: number;
}

export default function WishlistButton({ productId, size = 20 }: WishlistButtonProps) {
  const [wishlisted, setWishlisted] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    if (!stored) return false;
    const list: number[] = JSON.parse(stored);
    return list.includes(productId);
  });

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const stored = localStorage.getItem("wishlist");
    const list: number[] = stored ? JSON.parse(stored) : [];

    if (wishlisted) {
      const updated = list.filter((id) => id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setWishlisted(false);
    } else {
      list.push(productId);
      localStorage.setItem("wishlist", JSON.stringify(list));
      setWishlisted(true);
    }
  };

  return (
    <button
      onClick={toggle}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: `${size}px`,
        padding: "4px",
        lineHeight: 1,
      }}
      title={wishlisted ? "위시리스트에서 제거" : "위시리스트에 추가"}
    >
      {wishlisted ? "❤️" : "🤍"}
    </button>
  );
}
