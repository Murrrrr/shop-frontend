interface LoadingSpinnerProps {
  size?: number;
  message?: string;
}

export default function LoadingSpinner({ size = 32, message = "로딩 중..." }: LoadingSpinnerProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          border: "3px solid #ddd",
          borderTop: "3px solid #2196F3",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      {message && (
        <p style={{ color: "#888", fontSize: "14px", margin: 0 }}>{message}</p>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
