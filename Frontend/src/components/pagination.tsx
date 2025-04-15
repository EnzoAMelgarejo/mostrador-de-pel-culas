import React from "react";
import "../styles/pagination.css"

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const maxPageNumbers = 5;

    const getVisiblePages = () => {
        let start = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2))
        let end = Math.min(totalPages, start + maxPageNumbers - 1)
        if (end - start < maxPageNumbers) {
            start = Math.max(1, end - maxPageNumbers + 1)
        }
        return Array.from({length: end - start + 1}, (_, i) => start + i)
    }

    console.log("Total Pages:", totalPages); // Verifica el valor en consola


    return (
        <div className="pagination">

        <button 
          className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`} 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
  
        {getVisiblePages().map((page) => (
          <button
            key={page}
            className={`pagination-number ${page === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
  
        <button 
          className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`} 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    )
}

export default Pagination;