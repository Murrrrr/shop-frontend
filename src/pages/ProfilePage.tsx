import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../api/auth";
import type { User } from "../types";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      alert("로그아웃에 실패했습니다.");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>로딩 중...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>내 프로필</h1>
      {user && (
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "24px", marginTop: "16px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "#888", fontSize: "14px" }}>이름</label>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>{user.name}</p>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "#888", fontSize: "14px" }}>이메일</label>
            <p>{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 24px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
