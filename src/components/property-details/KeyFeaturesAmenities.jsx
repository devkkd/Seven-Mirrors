"use client";

import React, { useState } from "react";
import "@/styles/property-details/key-features-amenities.css";

export default function KeyFeaturesAmenities({ property }) {
  const [openIndices, setOpenIndices] = useState({});

  const toggleItem = (idx) => {
    setOpenIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };
  const defaultTheProperty = [
    { label: "Outdoor fireplace/fire pit", icon: "/images/icons/amenities/fireplace.png" },
    { label: "Private parking", icon: "/images/icons/amenities/parking.png" },
    { label: "Air conditioning", icon: "/images/icons/amenities/ac.png" },
    { label: "Hairdryer", icon: "/images/icons/amenities/hairdryer.png" },
    { label: "Iron", icon: "/images/icons/amenities/iron.png" },
    { label: "Washing machine", icon: "/images/icons/amenities/washing-machine.png" },
    { label: "Safe", icon: "/images/icons/amenities/safe.png" },
    { label: "Pool & Wellness", icon: "/images/icons/amenities/pool.png" },
    { label: "Gym Equipment", icon: "/images/icons/amenities/gym.png" }
  ];

  const defaultKitchenDining = [
    { label: "Barbecue", icon: "/images/icons/amenities/bbq.png" },
    { label: "Filtered drinking water", icon: "/images/icons/amenities/water.png" },
    { label: "Dishwasher", icon: "/images/icons/amenities/dishwasher.png" },
    { label: "Microwave", icon: "/images/icons/amenities/dishwasher.png" },
    { label: "Fibre Wi-Fi Internet", icon: "/images/icons/amenities/wifi.png" },
    { label: "Bluetooth speakers", icon: "/images/icons/amenities/speaker.png" },
    { label: "Smart TV", icon: "/images/icons/amenities/tv.png" }
  ];

  const defaultDetails = [
    {
      title: "Prime Location:",
      lines: [
        "Centrally located with easy access to transportation and just a 1-minute walk from a local market offering fresh groceries, fruits, vegetables, and home delivery services."
      ]
    },
    {
      title: "Spacious & Elegant:",
      lines: [
        "Designed for relaxation with ample space, perfect for unwinding after exploring Jaipur."
      ]
    },
    {
      title: "Fully Equipped Kitchen:",
      lines: [
        "Prepare meals with a gas stove, microwave, blender, toaster, and all necessary cookware."
      ]
    },
    {
      title: "Comfort & Convenience:",
      lines: [
        "Enjoy fast Wi-Fi, a 40\" LED TV, hairdryer, hot water kettle, and modern appliances for a hassle-free stay."
      ]
    },
    {
      title: "Safe & Secure:",
      lines: [
        "Located in a secure neighborhood, ideal for solo travelers or women, with a mosquito-free environment."
      ]
    },
    {
      title: "Authentic Jaipur Experience:",
      lines: [
        "Immerse yourself in a bustling, clean, and green urban neighborhood for an authentic local lifestyle."
      ]
    },
    {
      title: "Concierge & Local Recommendations:",
      lines: [
        "Receive personalized suggestions for cafes, bars, and attractions. Concierge services are available for bookings."
      ]
    },
    {
      title: "Additional Services:",
      lines: ["Washing service is available for a fee."]
    },
    {
      title: "Other Details:",
      lines: [
        "• Located on the first floor (no elevator).",
        "• Flexible check-in/check-out times available if no other guests are staying (check-in from 2 pm)."
      ]
    }
  ];

  const thePropertyItems = property?.amenitiesList?.theProperty || defaultTheProperty;
  const kitchenDiningItems = property?.amenitiesList?.kitchenDining || defaultKitchenDining;
  const detailBlocks = property?.amenitiesDetails || defaultDetails;

  return (
    <section
      id="key-features-amenities"
      className="key-features-section"
      aria-label="Key Features & Amenities"
    >
      {/* Section Heading */}
      <h2 className="key-features-heading">Key Features &amp; Amenities</h2>

      {/* Two-Column Layout */}
      <div className="key-features-grid">
        {/* LEFT COLUMN – Amenities List */}
        <div className="amenities-left-col">
          {/* Category 1: The Property */}
          <div className="amenity-category-block">
            <h3 className="amenity-category-title">The Property</h3>
            <ul className="amenity-items-list">
              {thePropertyItems.map((item, idx) => (
                <li key={idx} className="amenity-item-row">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="amenity-item-icon"
                  />
                  <span className="amenity-item-label">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Category 2: Kitchen & Dining */}
          <div className="amenity-category-block amenity-category-spaced">
            <h3 className="amenity-category-title">Kitchen &amp; Dining</h3>
            <ul className="amenity-items-list">
              {kitchenDiningItems.map((item, idx) => (
                <li key={idx} className="amenity-item-row">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="amenity-item-icon"
                  />
                  <span className="amenity-item-label">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN – Detailed Information */}
        <div className="amenities-right-col">
          {detailBlocks.map((block, idx) => {
            const isOpen = Boolean(openIndices[idx]);
            return (
              <div key={idx} className="amenity-detail-block">
                <button
                  type="button"
                  className="amenity-detail-toggle"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                >
                  <h4 className="amenity-detail-heading">{block.title}</h4>
                  <svg
                    width="16"
                    height="16"
                    className={`amenity-detail-chevron lg:hidden ${isOpen ? "is-open" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <div className={`amenity-detail-lines ${isOpen ? "flex is-open" : "hidden lg:flex"}`}>
                  {block.lines.map((line, lIdx) => (
                    <p key={lIdx} className="amenity-detail-text">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}

          <p className="amenity-closing-line">
            Enjoy a truly comfortable and convenient stay, combining the comforts of home with the vibrant energy of Jaipur!
          </p>
        </div>
      </div>
    </section>
  );
}
