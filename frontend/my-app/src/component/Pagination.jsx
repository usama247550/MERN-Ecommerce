import React from "react";
import { useSelector } from "react-redux";
import "../css/Pagination.css";

const Pagination = ({
  currPage,
  onPageChange,
  nextPageText = "Next",
  prePageText = "Prev",
  firstPageText = "First",
  lastPageText = "Last",
}) => {
  const { products, totalPages } = useSelector((state) => state.Products);

  if (products.length === 0 || totalPages <= 1) return null;

  const getPageNumber = () => {
    const pageNumbers = [];
    const pageWindow = 2;
    for (
      let i = Math.max(1, currPage - pageWindow);
      i <= Math.min(totalPages, currPage + pageWindow);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      {currPage > 1 && (
        <>
          <button
            className="pagination-btn first-page"
            onClick={() => onPageChange(1)}
          >
            {firstPageText}
          </button>
          <button
            className="pagination-btn prev-page"
            onClick={() => onPageChange(currPage - 1)}
          >
            {prePageText}
          </button>
        </>
      )}

      {getPageNumber().map((number) => (
        <button
          key={number}
          className={`pagination-btn number-btn ${
            currPage === number ? "active" : ""
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      {currPage < totalPages && (
        <>
          <button
            className="pagination-btn next-page"
            onClick={() => onPageChange(currPage + 1)}
          >
            {nextPageText}
          </button>
          <button
            className="pagination-btn last-page"
            onClick={() => onPageChange(totalPages)}
          >
            {lastPageText}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
