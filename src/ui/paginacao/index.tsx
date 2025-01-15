import React from "react";
import "./styles.css";

const VISIBLEBUTTONS = 5;
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onPageChange,
}: PaginationProps) => {
  const buttons = [];
  const start = Math.max(0, currentPage - Math.floor(VISIBLEBUTTONS / 2));
  const end = Math.min(totalPages, start + VISIBLEBUTTONS);

  for (let i = start; i < end; i++) {
    buttons.push(i);
  }

  return (
    <div className="pagination-container">
      <button
        className="button-prev"
        onClick={onPrev}
        disabled={currentPage === 0}
      >
        Voltar
      </button>
      {buttons.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={
            currentPage === page ? "button-page active" : "button-page"
          }
        >
          {page + 1}
        </button>
      ))}
      <button
        className="button-next"
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
      >
        Avançar
      </button>
    </div>
  );
};

export { Pagination };
