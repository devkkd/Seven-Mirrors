"use client";

import React from "react";
import "@/styles/property-details/property-highlights.css";

export default function PropertyHighlights({ property }) {
  const highlights = property?.highlights && property.highlights.length >= 3
    ? property.highlights.slice(0, 3)
    : [
        {
          icon: "location",
          title: "In Malviya Nagar, central Jaipur",
          desc: "In Malviya Nagar, a practical neighborhood with shops, cafes, and a local market about a minute away"
        },
        {
          icon: "kitchen",
          title: "Full kitchen and private balcony",
          desc: "A fully equipped kitchen with a gas stove, microwave, and cookware, plus a balcony off the bedroom"
        },
        {
          icon: "host",
          title: "Warm and responsive hosts",
          desc: "Guests highlight the attentive hosting and helpful on-site caretaker, with several naming them by name"
        }
      ];

  const getIconSrc = (iconType, index) => {
    if (iconType === "kitchen" || index === 1) return "/images/icons/kitchen-icon.png";
    if (iconType === "host" || index === 2) return "/images/icons/host-heart.png";
    return "/images/icons/location-house.png";
  };

  return (
    <section className="property-highlights-section" aria-label="Property Highlights">
      <div className="highlights-grid">
        {highlights.map((item, idx) => (
          <div key={idx} className="highlight-column">
            <div className="highlight-icon-wrap">
              <img
                src={getIconSrc(item.icon, idx)}
                alt={item.title}
                className="highlight-img-icon"
              />
            </div>
            <h3 className="highlight-heading">{item.title}</h3>
            <p className="highlight-description">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
