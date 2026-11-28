"use client";

import React from "react";
import ReviewCard from "@/components/profile/ReviewCard";
import "@/styles/profile/profile-reviews.css";

export default function ReviewList({ reviews, onSaveReview }) {
  if (!reviews || reviews.length === 0) {
    return (
      <section className="reviews-empty-state" aria-label="Reviews I've written">
        <p className="m-0">You haven&apos;t written any reviews yet.</p>
      </section>
    );
  }

  return (
    <section className="reviews-container" aria-label="Reviews I've written">
      <div className="reviews-list">
        {reviews.map((item) => (
          <ReviewCard
            key={item.id}
            review={item}
            onSaveReview={onSaveReview}
          />
        ))}
      </div>
    </section>
  );
}
