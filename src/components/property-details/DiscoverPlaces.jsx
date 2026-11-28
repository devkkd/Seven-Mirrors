"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "@/styles/property-details/discover-places.css";

function DiscoverPropertyCard({ item }) {
  const images = item.images && item.images.length >= 3 ? item.images.slice(0, 3) : item.images || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  // Independent automatic slider (changes every 3 seconds, pauses on hover)
  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isPaused, images.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
    setIsPaused(false);
  };

  return (
    <article
      className="discover-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Slider Container */}
      <div
        className="discover-slider-box"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="discover-slider-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((imgUrl, idx) => (
            <div key={idx} className="discover-slide-frame">
              <img
                src={imgUrl}
                alt={`${item.title} view ${idx + 1}`}
                className="discover-slide-img"
              />
            </div>
          ))}
        </div>

        {/* Bottom-Center Indicator Dots */}
        {images.length > 1 && (
          <div className="discover-dots-row" role="tablist" aria-label="Property image slides">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`discover-dot ${dotIdx === activeIndex ? "is-active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveIndex(dotIdx);
                }}
                aria-label={`View image ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Details Below Image */}
      <div className="discover-card-body">
        <div className="discover-card-location">{item.locationLabel}</div>

        <div className="discover-card-main-row">
          <div className="discover-card-left-info">
            <h3 className="discover-card-name">{item.title}</h3>
            <p className="discover-card-type">{item.subtitle}</p>
            <p className="discover-card-specs">{item.specsLine}</p>
          </div>

          <div className="discover-card-right-group">
            <div className="discover-card-price-block">
              <div className="discover-card-price">
                ₹{(item.price || 6000).toLocaleString("en-IN")}
              </div>
              <div className="discover-card-tax">/night + tax</div>
            </div>

            <Link
              href={`/property/${item._id}`}
              className="discover-arrow-btn"
              aria-label={`View ${item.title}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DiscoverPlaces({ properties }) {
  const defaultPlaces = [
    {
      _id: "6745a1b2c3d4e5f67890abcd",
      locationLabel: "ASHOK NAGAR, JAIPUR",
      title: "Rossiero",
      subtitle: "Private 4-Bedroom Villa",
      specsLine: "4 Bedrooms · Private garden · Central location",
      price: 6000,
      images: [
        "/images/property/discover/card-1.png",
        "/images/property/main-living.jpg",
        "/images/property/dining-hall.png"
      ]
    },
    {
      _id: "6745a1b2c3d4e5f67890abce",
      locationLabel: "ASHOK NAGAR, JAIPUR",
      title: "Rossiero",
      subtitle: "Private 4-Bedroom Villa",
      specsLine: "4 Bedrooms · Private garden · Central location",
      price: 6000,
      images: [
        "/images/property/discover/card-2.png",
        "/images/property/lounge.png",
        "/images/property/dining-detail.png"
      ]
    },
    {
      _id: "6745a1b2c3d4e5f67890abcf",
      locationLabel: "ASHOK NAGAR, JAIPUR",
      title: "Rossiero",
      subtitle: "Private 4-Bedroom Villa",
      specsLine: "4 Bedrooms · Private garden · Central location",
      price: 6000,
      images: [
        "/images/property/discover/card-3.png",
        "/images/property/space/bedroom-2.png",
        "/images/property/space/bathroom.png"
      ]
    }
  ];

  const cards =
    Array.isArray(properties) && properties.length >= 3
      ? properties.slice(0, 3)
      : defaultPlaces;

  return (
    <section className="discover-places-section" aria-label="Discover Places Worth Going To">
      {/* Centered Serif Heading */}
      <h2 className="discover-section-heading">
        <span className="discover-heading-bold">Discover Places Worth </span>
        <em className="discover-heading-italic">Going To</em>
      </h2>

      {/* Three Property Cards Row */}
      <div className="discover-cards-grid">
        {cards.map((item, idx) => (
          <DiscoverPropertyCard key={item._id || idx} item={item} />
        ))}
      </div>
    </section>
  );
}
