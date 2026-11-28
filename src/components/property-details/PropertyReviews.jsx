"use client";

import React, { useState } from "react";
import "@/styles/property-details/property-reviews.css";

export default function PropertyReviews({ property }) {
  const [showAll, setShowAll] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReview = (key) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const rating = property?.ratings?.average || property?.rating || "4.73";
  const totalReviews = property?.ratings?.totalReviews || property?.reviewsCount || 15;

  const overallRows = property?.ratings?.distribution || [
    { stars: 5, percent: 73 },
    { stars: 4, percent: 27 },
    { stars: 3, percent: 0 },
    { stars: 2, percent: 0 },
    { stars: 1, percent: 0 }
  ];

  const categoryRatings = property?.ratings?.categories || [
    { label: "Cleanliness", score: "4.8", icon: "/images/icons/reviews/cleanliness.png" },
    { label: "Accuracy", score: "4.5", icon: "/images/icons/reviews/accuracy.png" },
    { label: "Check-in", score: "4.8", icon: "/images/icons/reviews/checkin.png" },
    { label: "Communication", score: "4.9", icon: "/images/icons/reviews/communication.png" },
    { label: "Location", score: "4.6", icon: "/images/icons/reviews/location.png" },
    { label: "Value", score: "4.7", icon: "/images/icons/reviews/value.png" }
  ];

  const defaultReviews = [
    {
      id: "r-1",
      author: "Ishan",
      rating: 5,
      date: "2 days ago",
      avatarUrl: null,
      comment:
        "The property and location were really good. The host was very helpful and guided us properly throughout our stay. Had a pleasant experience overall. Highly recommended."
    },
    {
      id: "r-2",
      author: "Ishan",
      rating: 5,
      date: "2 days ago",
      avatarUrl: null,
      comment:
        "The property and location were really good. The host was very helpful and guided us properly throughout our stay. Had a pleasant experience overall. Highly recommended."
    },
    {
      id: "r-3",
      author: "Ishan",
      rating: 5,
      date: "2 days ago",
      avatarUrl: null,
      comment:
        "The property and location were really good. The host was very helpful and guided us properly throughout our stay. Had a pleasant experience overall. Highly recommended."
    },
    {
      id: "r-4",
      author: "Ishan",
      rating: 5,
      date: "2 days ago",
      avatarUrl: null,
      comment:
        "The property and location were really good. The host was very helpful and guided us properly throughout our stay. Had a pleasant experience overall. Highly recommended."
    },
    {
      id: "r-5",
      author: "Ishan",
      rating: 5,
      date: "2 days ago",
      avatarUrl: null,
      comment:
        "The property and location were really good. The host was very helpful and guided us properly throughout our stay. Had a pleasant experience overall. Highly recommended."
    },
    {
      id: "r-6",
      author: "Ishan",
      rating: 5,
      date: "2 days ago",
      avatarUrl: null,
      comment:
        "The property and location were really good. The host was very helpful and guided us properly throughout our stay. Had a pleasant experience overall. Highly recommended."
    }
  ];

  const allReviews =
    Array.isArray(property?.reviews) && property.reviews.length > 0
      ? property.reviews
      : defaultReviews;

  const visibleReviews = showAll ? allReviews : allReviews.slice(0, 6);

  return (
    <section id="reviews" className="property-reviews-section" aria-label="Reviews">
      {/* 2. Reviews Section Heading */}
      <div className="reviews-header-row">
        <h2 className="reviews-main-heading">Reviews</h2>
        <div className="reviews-summary-inline">
          <span className="reviews-star-char">★</span>
          <span>{rating}</span>
          <span className="reviews-dot">·</span>
          <span>{totalReviews} reviews</span>
        </div>
      </div>

      {/* 3 & 4. Overall Rating Summary + 6 Category Ratings */}
      <div className="reviews-summary-grid">
        {/* Left: Overall Rating */}
        <div className="overall-rating-block">
          <h3 className="overall-rating-title">Overall rating</h3>
          <div className="overall-bars-list">
            {overallRows.map((row) => (
              <div key={row.stars} className="overall-bar-row">
                <span className="bar-star-label">★ {row.stars} stars</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <span className="bar-percent-label">{row.percent}% of reviews</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 6 Category Ratings */}
        <div className="category-ratings-grid">
          {categoryRatings.map((cat, idx) => (
            <div key={idx} className="category-rating-col">
              <span className="category-name">{cat.label}</span>
              <span className="category-score">{cat.score}</span>
              <img
                src={cat.icon}
                alt={cat.label}
                className="category-icon-img"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 5. Customer Review Cards (3-column layout) */}
      <div className="reviews-cards-grid">
        {visibleReviews.map((rev, idx) => {
          const revKey = rev.id || idx;
          const isExpanded = Boolean(expandedReviews[revKey]);
          return (
            <article key={revKey} className="review-card-item">
              {/* Left Side: Profile Image or Clean Rounded Placeholder */}
              <div className="review-avatar-wrap">
                {rev.avatarUrl || rev.avatar?.startsWith?.("http") || rev.avatar?.startsWith?.("/") ? (
                  <img
                    src={rev.avatarUrl || rev.avatar}
                    alt={rev.author || "Reviewer"}
                    className="review-avatar-img"
                  />
                ) : (
                  <div className="review-avatar-placeholder" aria-hidden="true">
                    {(rev.author || "I").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Right Side: Reviewer Name, Stars, Date, Comment */}
              <div className="review-card-body">
                <div className="review-author-name">{rev.author || "Ishan"}</div>
                <div className="review-stars-row" aria-label={`${rev.rating || 5} out of 5 stars`}>
                  {"★".repeat(rev.rating || 5)}
                </div>
                <div className="review-date-text">{rev.date || "2 days ago"}</div>
                <p className={`review-comment-text ${isExpanded ? "is-expanded" : "is-collapsed"}`}>
                  {rev.comment}
                </p>
                <button
                  type="button"
                  className="review-read-more-btn"
                  onClick={() => toggleReview(revKey)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* 6. Show All Reviews Button */}
      <div className="show-all-reviews-wrap">
        <button
          type="button"
          className="show-all-reviews-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll && allReviews.length > 6
            ? "Show fewer reviews"
            : `Show all ${totalReviews} reviews`}
        </button>
      </div>

      {/* 7. Bottom Divider */}
      <div className="reviews-bottom-divider" />
    </section>
  );
}
