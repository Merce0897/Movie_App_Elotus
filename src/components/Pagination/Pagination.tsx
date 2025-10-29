import { useState, useEffect } from "react";
import "./Pagination.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  showFirstLast = true,
  maxVisiblePages = 5,
}: PaginationProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate visible page range
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

  const pages = Array.from(
    { length: endPage - adjustedStartPage + 1 },
    (_, i) => adjustedStartPage + i
  );

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages || isAnimating) {
      return;
    }

    setIsAnimating(true);
    onPageChange(page);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`pagination-container ${className}`}>
      <div className="pagination-wrapper">
        {/* First page button */}
        {showFirstLast && currentPage > 1 && (
          <button
            onClick={() => handlePageChange(1)}
            className="pagination-btn pagination-btn--first"
            disabled={isAnimating}
            aria-label="Go to first page"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="11,17 6,12 11,7" />
              <path d="M18,17V7" />
            </svg>
          </button>
        )}

        {/* Previous page button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isAnimating}
          className="pagination-btn pagination-btn--prev"
          aria-label="Go to previous page"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15,18 9,12 15,6" />
          </svg>
          <span>Prev</span>
        </button>

        {/* Page numbers */}
        <div className="pagination-pages">
          {/* Show first page if not in visible range */}
          {adjustedStartPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="pagination-btn pagination-btn--number"
                disabled={isAnimating}
              >
                1
              </button>
              {adjustedStartPage > 2 && (
                <span className="pagination-ellipsis">...</span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={isAnimating}
              className={`pagination-btn pagination-btn--number ${
                page === currentPage ? "pagination-btn--active" : ""
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          {/* Show last page if not in visible range */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="pagination-ellipsis">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="pagination-btn pagination-btn--number"
                disabled={isAnimating}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next page button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isAnimating}
          className="pagination-btn pagination-btn--next"
          aria-label="Go to next page"
        >
          <span>Next</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </button>

        {/* Last page button */}
        {showFirstLast && currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className="pagination-btn pagination-btn--last"
            disabled={isAnimating}
            aria-label="Go to last page"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="13,17 18,12 13,7" />
              <path d="M6,17V7" />
            </svg>
          </button>
        )}
      </div>

      {/* Page info */}
      <div className="pagination-info">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default Pagination;
