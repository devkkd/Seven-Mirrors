"use client";

import React, { useState } from "react";
import "@/styles/property-details/property-overview.css";

export default function PropertyOverview({ property }) {
  const [copied, setCopied] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  const title = property?.title || "Cozy Loft 201 | 2 BHK";
  const rating = property?.ratings?.average || property?.rating || "4.73";
  const reviewsCount = property?.ratings?.totalReviews || property?.reviewsCount || 15;

  const city = property?.location?.city || "Jaipur";
  const area = property?.location?.area || "Malviya Nagar, Jaipur";
  const country = property?.location?.country || "India";
  const propertyType = property?.propertyType || "Entire Flat";
  const rentalType = property?.location?.type || "ENTIRE RENTAL UNIT";

  const guests = property?.specs?.guests || 6;
  const bedrooms = property?.specs?.bedrooms || 2;
  const beds = property?.specs?.beds || 2;
  const bathrooms = property?.specs?.bathrooms || 2;

  const hostSummary =
    property?.host?.summary || "Hosted by Seven Mirror Stays | 7 Years Hosting";

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="about" className="property-overview-section">
      {/* A. Property Tags & Share Row */}
      <div className="overview-tags-row">
        <div className="overview-tags-list">
          <span className="property-tag-pill">{area}</span>
          <span className="property-tag-pill">{city}</span>
          <span className="property-tag-pill">{propertyType}</span>
          <span className="property-tag-pill">{hostSummary}</span>
        </div>

        <button
          type="button"
          className="overview-share-btn"
          onClick={handleShare}
          aria-label="Share property"
        >
          <img
            src="/images/icons/share-icon.png"
            alt="Share"
            className="share-svg-icon"
          />
          <span>{copied ? "Copied!" : "Share"}</span>
        </button>
      </div>

      {/* B. Property Title and Rating */}
      <div className="overview-title-row">
        <h1 className="overview-title">{title}</h1>

        <div className="overview-rating-link">
          <span className="overview-star">★</span>
          <span className="overview-rating-score">{rating}</span>
          <span className="overview-rating-divider">|</span>
          <span className="overview-reviews-count">{reviewsCount} reviews</span>
        </div>
      </div>

      {/* C. Property Overview / Specs / Description */}
      <div className="overview-meta-block">
        <div className="overview-rental-location">
          {`${rentalType} IN ${city}, ${country}`.toUpperCase()}
        </div>

        <div className="overview-specs-row">
          <span>{guests} Guests</span>
          <span className="spec-bullet">•</span>
          <span>{bedrooms} Bedrooms</span>
          <span className="spec-bullet">•</span>
          <span>{beds} Beds</span>
          <span className="spec-bullet">•</span>
          <span>{bathrooms} Bathrooms</span>
        </div>
      </div>

      <div className="overview-description-wrap">
        <div className={`overview-description-block ${descExpanded ? "is-expanded" : "is-collapsed"}`}>
          {property?.description ? (
            <p>{property.description}</p>
          ) : (
            <>
              <p>
                This newly renovated, bright, and spacious 2-bedroom independent floor is ideal for group trips.
              </p>
              <p>
                Located on the first floor in the city center, it boasts beautiful decor, a fully equipped kitchen, free high-speed Wi-Fi, a Smart TV, air conditioning, and all essential amenities, including towels and appliances.
              </p>
              <p>
                Just 5 minutes from the airport, the secure, upscale neighborhood offers easy access to cafes and essential services, ensuring comfort and convenience for an unforgettable stay.
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          className="overview-read-more-btn"
          onClick={() => setDescExpanded(!descExpanded)}
          aria-expanded={descExpanded}
        >
          {descExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </section>
  );
}
