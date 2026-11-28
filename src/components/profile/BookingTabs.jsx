"use client";

import React from "react";

const TABS = [
  {
    id: "upcoming",
    label: "Upcoming Booking",
    icon: "/images/icons/profile/upcoming-tab-icon.png",
    invertWhenActive: false
  },
  {
    id: "completed",
    label: "Completed Booking",
    icon: "/images/icons/profile/completed-tab-icon.png",
    invertWhenActive: true
  },
  {
    id: "cancelled",
    label: "Cancelled Booking",
    icon: "/images/icons/profile/cancelled-tab-icon.png",
    invertWhenActive: true
  }
];

export default function BookingTabs({ activeTab, onTabChange }) {
  return (
    <div className="booking-tabs-row" role="tablist" aria-label="Booking Categories">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={`booking-tab-pill ${isActive ? "is-active" : ""}`}
          >
            <img
              src={tab.icon}
              alt=""
              className={`booking-tab-icon ${
                tab.invertWhenActive ? "invert-when-active" : ""
              }`}
            />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

