"use client";

import React from "react";
import Image from "next/image";

export default function ProfileHeader({ userName = "John", initials = "JD" }) {
  return (
    <header className="profile-top-header">
      <div className="profile-top-header-inner">
        {/* Left: Seven Mirror Stays Logo */}
        <div>
          <Image
            src="/logo.png"
            alt="Seven Mirror Stays - Luxury Homes"
            width={220}
            height={48}
            priority
            className="profile-header-logo-img"
          />
        </div>

        {/* Right: Search, Notification Bell, Avatar + Greeting + Dropdown */}
        <div className="profile-header-right">
          <button
            type="button"
            className="profile-header-icon-btn"
            aria-label="Search"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            type="button"
            className="profile-header-icon-btn"
            aria-label="Notifications"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          <div className="profile-user-pill">
            <span className="profile-user-avatar">{initials}</span>
            <span className="profile-user-greeting">Hello, {userName}</span>
            <svg
              className="profile-user-chevron"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}

