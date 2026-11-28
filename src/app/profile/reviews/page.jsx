"use client";

import React, { useState } from "react";
import ReviewList from "@/components/profile/ReviewList";

const INITIAL_REVIEWS = [
  {
    id: "1",
    propertyName: "Rossiero",
    propertyDescription:
      "Private 4-Bedroom Villa. 4 Bedrooms · Private garden · Central location.",
    address:
      "S-22, Durgadas Colony, Ashok Marg, Ashok Nagar, Jaipur, Rajasthan, India",
    propertyImage: "/images/property/main-living.jpg",
    rating: 5,
    review:
      "The stay is really nice, love the poolside. The services and the staff are really good. Will surely be back"
  },
  {
    id: "2",
    propertyName: "Rossiero",
    propertyDescription:
      "Private 4-Bedroom Villa. 4 Bedrooms · Private garden · Central location.",
    address:
      "S-22, Durgadas Colony, Ashok Marg, Ashok Nagar, Jaipur, Rajasthan, India",
    propertyImage: "/images/property/main-living.jpg",
    rating: 5,
    review:
      "The stay is really nice, love the poolside. The services and the staff are really good. Will surely be back"
  },
  {
    id: "3",
    propertyName: "Rossiero",
    propertyDescription:
      "Private 4-Bedroom Villa. 4 Bedrooms · Private garden · Central location.",
    address:
      "S-22, Durgadas Colony, Ashok Marg, Ashok Nagar, Jaipur, Rajasthan, India",
    propertyImage: "/images/property/main-living.jpg",
    rating: 5,
    review:
      "The stay is really nice, love the poolside. The services and the staff are really good. Will surely be back"
  }
];

export default function ReviewsWrittenPage() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  const handleSaveReview = (reviewId, updatedFields) => {
    setReviews((prev) =>
      prev.map((item) =>
        item.id === reviewId ? { ...item, ...updatedFields } : item
      )
    );
  };

  return <ReviewList reviews={reviews} onSaveReview={handleSaveReview} />;
}
