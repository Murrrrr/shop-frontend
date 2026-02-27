interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const buttonBase: React.CSSProperties = {
    padding: "6px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
        marginTop: "24px",
      }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...buttonBase,
          color: currentPage === 1 ? "#ccc" : "#333",
          cursor: currentPage === 1 ? "default" : "pointer",
        }}
      >
        이전
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} style={{ padding: "6px 8px", color: "#888" }}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              ...buttonBase,
              backgroundColor: page === currentPage ? "#2196F3" : "#fff",
              color: page === currentPage ? "#fff" : "#333",
              fontWeight: page === currentPage ? "bold" : "normal",
            }}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...buttonBase,
          color: currentPage === totalPages ? "#ccc" : "#333",
          cursor: currentPage === totalPages ? "default" : "pointer",
        }}
      >
        다음
      </button>
    </div>
  );
}
