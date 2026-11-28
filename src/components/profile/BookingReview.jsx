"use client";

import React, { useState } from "react";
import StarRating from "@/components/profile/StarRating";

function getStoredReview(bookingId) {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("seven_mirrors_completed_reviews");
    if (!raw) return null;
    const map = JSON.parse(raw);
    return map && map[bookingId] ? map[bookingId] : null;
  } catch (err) {
    return null;
  }
}

export default function BookingReview({ bookingId, propertyName }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submittedReview, setSubmittedReview] = useState(() =>
    getStoredReview(bookingId)
  );
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (rating < 1 || rating > 5) {
      setValidationError("Please select a star rating before submitting.");
      return;
    }

    const trimmed = reviewText.trim();
    if (!trimmed) {
      setValidationError("Please write a short review about your experience.");
      return;
    }

    const savedPayload = { rating, comment: trimmed };
    try {
      const raw = localStorage.getItem("seven_mirrors_completed_reviews");
      const map = raw ? JSON.parse(raw) : {};
      map[bookingId] = savedPayload;
      localStorage.setItem("seven_mirrors_completed_reviews", JSON.stringify(map));
    } catch (err) {
      // ignore storage errors
    }

    setSubmittedReview(savedPayload);
  };

  // State 3: Submitted Review View (Screenshot 1)
  if (submittedReview) {
    return (
      <div className="review-submitted-row">
        <StarRating rating={submittedReview.rating} readOnly compact />
        <p className="review-submitted-text">{submittedReview.comment}</p>
      </div>
    );
  }

  // State 1 & 2: Initial & Interactive Review Form (Screenshots 2 & 3)
  return (
    <div className="completed-card-extra">
      <form onSubmit={handleSubmit} noValidate className="review-form-grid">
        {/* Left Side: Share Your Experience */}
        <div className="review-left-col">
          <h3 className="review-left-heading">Share Your Experience</h3>
          <p className="review-left-desc">
            How was your stay at Seven Mirror Stays?
            <br />
            Your feedback helps us improve and helps other guests choose their perfect stay.
          </p>

          <StarRating
            rating={rating}
            onChange={(val) => {
              setRating(val);
              if (validationError) setValidationError("");
            }}
          />

          <p className="review-tap-hint">
            {rating > 0
              ? `You rated ${rating} out of 5 stars`
              : "Tap to rate your experience"}
          </p>
        </div>

        {/* Right Side: Tell us about your stay */}
        <div className="review-right-col">
          <h3 className="review-right-heading">Tell us about your stay</h3>
          <p className="review-right-desc">
            Share what you loved, what could be improved, or anything that stood out.
          </p>

          <label
            className="review-question-label"
            htmlFor={`review-textarea-${bookingId}`}
          >
            How was your stay?
          </label>

          <textarea
            id={`review-textarea-${bookingId}`}
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
              if (validationError) setValidationError("");
            }}
            placeholder="Tell us about your experience..."
            className={`review-textarea ${validationError ? "has-error" : ""}`}
          />

          {validationError && (
            <p className="review-error-msg" role="alert">
              {validationError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="review-submit-btn"
          >
            {isSubmitting ? "Submitting..." : "Submit Review →"}
          </button>
        </div>
      </form>
    </div>
  );
}
