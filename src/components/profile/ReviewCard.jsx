"use client";

import React, { useState } from "react";
import "@/styles/profile/profile-reviews.css";

function StarIcon({ filled }) {
  return (
    <svg
      className="review-star-svg"
      viewBox="0 0 24 24"
      fill={filled ? "#22c55e" : "#e5e7eb"}
      aria-hidden="true"
    >
      <path d="M12 2.5l2.93 5.94 6.56.95-4.74 4.62 1.12 6.53L12 17.46l-5.87 3.08 1.12-6.53L2.51 9.39l6.56-.95L12 2.5z" />
    </svg>
  );
}

export default function ReviewCard({ review, onSaveReview }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftRating, setDraftRating] = useState(review.rating || 5);
  const [draftText, setDraftText] = useState(review.review || "");
  const [error, setError] = useState("");

  const handleOpenEdit = () => {
    setDraftRating(review.rating || 5);
    setDraftText(review.review || "");
    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraftRating(review.rating || 5);
    setDraftText(review.review || "");
    setError("");
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!draftText.trim()) {
      setError("Please enter your review before saving.");
      return;
    }

    onSaveReview(review.id, {
      rating: draftRating,
      review: draftText.trim()
    });
    setError("");
    setIsEditing(false);
  };

  return (
    <article className="review-card">
      <div className="review-card-top">
        <div className="review-property-row">
          <img
            src={review.propertyImage || "/images/property/main-living.jpg"}
            alt={review.propertyName}
            className="review-image"
          />

          <div className="review-content">
            <h2 className="review-property-name">{review.propertyName}</h2>
            <p className="review-property-desc">{review.propertyDescription}</p>
            <p className="review-property-address">
              <strong>ADDRESS :</strong> {review.address}
            </p>
          </div>
        </div>

        {!isEditing && (
          <button
            type="button"
            className="edit-review-button"
            onClick={handleOpenEdit}
          >
            Edit →
          </button>
        )}
      </div>

      {!isEditing ? (
        <>
          <div
            className="review-rating-stars"
            aria-label={`Rated ${review.rating} out of 5 stars`}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} filled={star <= (review.rating || 0)} />
            ))}
          </div>

          <p className="review-text">{review.review}</p>
        </>
      ) : (
        <form className="review-edit-form" onSubmit={handleSave} noValidate>
          <div className="review-edit-stars-row" role="group" aria-label="Edit rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="review-edit-star-btn"
                onClick={() => setDraftRating(star)}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <StarIcon filled={star <= draftRating} />
              </button>
            ))}
          </div>

          <textarea
            value={draftText}
            onChange={(e) => {
              setDraftText(e.target.value);
              if (error) setError("");
            }}
            className={`review-input ${error ? "is-error" : ""}`}
            placeholder="Write your review..."
          />
          {error && <p className="review-error-text">{error}</p>}

          <div className="review-actions">
            <button type="submit" className="review-save-btn">
              Save
            </button>
            <button
              type="button"
              className="review-cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </article>
  );
}
