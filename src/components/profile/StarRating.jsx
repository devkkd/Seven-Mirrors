"use client";

import React from "react";

export default function StarRating({
  rating = 0,
  onChange,
  readOnly = false,
  compact = false
}) {
  return (
    <div
      className={`star-rating-row ${compact ? "is-compact" : ""}`}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={readOnly ? `Rated ${rating} out of 5 stars` : "Rate your experience"}
    >
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isSelected = starValue <= rating;
        return (
          <button
            key={starValue}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(starValue)}
            className="star-rating-btn"
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            aria-checked={!readOnly ? rating === starValue : undefined}
          >
            <svg
              className="star-rating-svg"
              viewBox="0 0 24 24"
              fill={isSelected ? "#2ac74c" : "#d4d4d4"}
            >
              <path d="M12 2.5l2.85 5.77 6.37.93-4.61 4.49 1.09 6.34L12 17.04l-5.7 2.99 1.09-6.34-4.61-4.49 6.37-.93L12 2.5z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
