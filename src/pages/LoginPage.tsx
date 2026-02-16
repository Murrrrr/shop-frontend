import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/auth";

// 로그인 / 회원가입 페이지
export default function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err) {
      console.error("인증에 실패했습니다:", err);
      setError(isRegister ? "회원가입에 실패했습니다." : "로그인에 실패했습니다.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "80px auto" }}>
      <h1>{isRegister ? "회원가입" : "로그인"}</h1>

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
        )}

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        {error && <p style={{ color: "red", marginBottom: "12px" }}>{error}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isRegister ? "회원게업" : "로그인"}
        </button>
      </form>

      <p style={{ marginTop: "16px", textAlign: "center" }}>
        {isRegister ? "이미 계정이 있으신가요?" : "계정이 없유신가요?"}{" "}
        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
          }}
          style={{
            background: "none",
            border: "none",
            color: "#1976d2",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {isRegister ? "로그인" : "회원가입"}
        </button>
      </p>
    </div>
  );
}
