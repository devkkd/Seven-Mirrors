"use client";

import React, { useRef, useState } from "react";
import "@/styles/property-details/the-space.css";

export default function TheSpace({ property }) {
  const sliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultRooms = [
    {
      id: "bedroom-1",
      title: "BEDROOM 1",
      image: "/images/property/space/bedroom-1.png",
      points: [
        "• Includes AC, Wi-Fi, and a wardrobe.",
        "• Attached Balcony."
      ]
    },
    {
      id: "bedroom-2",
      title: "BEDROOM 2",
      image: "/images/property/space/bedroom-2.png",
      points: [
        "• Includes AC, Wi-Fi, a wardrobe, and an ensuite bathroom.",
        "*An extra floor mattress is available upon request.*"
      ]
    },
    {
      id: "bathrooms",
      title: "BATHROOMS",
      image: "/images/property/space/bathroom.png",
      points: [
        "• One attached bathroom.",
        "• All bathrooms are equipped with geysers, towels, and basic toiletries.",
        "• One bathroom is common for the living area and bedroom."
      ]
    },
    {
      id: "living-dining",
      title: "LIVING ROOM & DINING AREA",
      image: "/images/property/space/living-dining.png",
      points: [
        "• A luxurious living room with comfortable seating.",
        "• Includes AC, TV, and Wi-Fi.",
        "• Comes with a dining area."
      ]
    }
  ];

  const rooms =
    Array.isArray(property?.accommodations) && property.accommodations.length > 0
      ? property.accommodations
      : defaultRooms;

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((el.scrollLeft / maxScroll) * 100);
    }
  };

  const scrollByAmount = (direction) => {
    const el = sliderRef.current;
    if (!el) return;
    const step = 244;
    el.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth"
    });
  };

  return (
    <section id="the-space" className="the-space-section" aria-label="The space">
      {/* Section Heading */}
      <h2 className="the-space-heading">The space</h2>

      {/* Property Description */}
      <div className="the-space-description-wrap">
        <div className={`the-space-description ${isExpanded ? "is-expanded" : "is-collapsed"}`}>
          <p>
            Relax in style in our chic, spacious, and sunny 2-bedroom apartment, located on the first floor (no elevator) in the heart of Jaipur&apos;s vibrant Malviya Nagar.
          </p>
          <p>
            This architect-designed home blends modern comfort with a touch of creativity, featuring a quirky retro style and an inspiring color palette.
          </p>
          <p>
            Perfect for friends, family, or business travelers, the apartment offers both style and convenience for a private and comfortable stay.
          </p>
          <p>
            It accommodates 5 guests comfortably, with the option for a 6th guest for an extra charge.
          </p>
        </div>

        <button
          type="button"
          className="the-space-read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>

      {/* Accommodation Capacity Subsection */}
      <div className="accommodation-capacity-block">
        <h3 className="capacity-heading">Accommodation Capacity</h3>
        <ul className="capacity-bullets-list">
          <li>• Comfortably accommodates 4 guests.</li>
          <li>• Option to welcome 2 additional guests (up to 6 guests total) at an extra charge.</li>
        </ul>
      </div>

      {/* Horizontal Scrollable Accommodation Cards */}
      <div className="accommodation-carousel-wrapper">
        <div
          ref={sliderRef}
          className="accommodation-cards-track"
          onScroll={handleScroll}
        >
          {rooms.map((room, idx) => (
            <article key={room.id || idx} className="accommodation-card-item">
              <div className="accommodation-img-wrap">
                <img
                  src={room.image}
                  alt={room.title || room.name}
                  className="accommodation-card-img"
                />
              </div>
              <h4 className="accommodation-card-title">{room.title || room.name}</h4>
              <div className="accommodation-card-points">
                {(room.points || [room.description]).map((pt, pIdx) => (
                  <p key={pIdx} className="accommodation-point-line">
                    {pt}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Slider Controls: Left Arrow, Progress Track, Right Arrow */}
        <div className="accommodation-slider-controls">
          <button
            type="button"
            className="slider-arrow-btn"
            onClick={() => scrollByAmount("prev")}
            aria-label="Scroll left"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="slider-progress-track">
            <div
              className="slider-progress-thumb"
              style={{ width: "45%", transform: `translateX(${scrollProgress * 1.2}%)` }}
            />
          </div>

          <button
            type="button"
            className="slider-arrow-btn"
            onClick={() => scrollByAmount("next")}
            aria-label="Scroll right"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
