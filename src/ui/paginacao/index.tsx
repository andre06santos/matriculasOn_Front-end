import React from "react";
import "./styles.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onPageChange: (page: number) => void;
  visibleButtons: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onPageChange,
  visibleButtons,
}: PaginationProps) => {
  const buttons = [];
  const start = Math.max(0, currentPage - Math.floor(visibleButtons / 2));
  const end = Math.min(totalPages, start + visibleButtons);

  for (let i = start; i < end; i++) {
    buttons.push(i);
  }

  return (
    <div className="pagination-container">
      <button onClick={onPrev} disabled={currentPage === 0}>
        Voltar
      </button>
      {buttons.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page + 1}
        </button>
      ))}
      <button onClick={onNext} disabled={currentPage === totalPages - 1}>
        Avançar
      </button>
    </div>
  );
};

export default Pagination;
