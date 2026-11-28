"use client";

import React from "react";
import "@/styles/profile/about-me.css";

export default function ProfileInfo({ profile, onEdit }) {
  const fullName = [profile.firstName, profile.age ? `${profile.age} years` : ""]
    .filter(Boolean)
    .join(", ");

  const formattedPhone = profile.countryCode
    ? `${profile.countryCode}-${profile.phone}`
    : profile.phone;

  return (
    <section className="about-profile-card" aria-label="About Me">
      <div className="about-profile-left">
        <img
          src={profile.profileImage || "/images/profile/john-avatar.png"}
          alt={profile.firstName || "Profile"}
          className="about-profile-image"
        />

        <div className="about-profile-details">
          <h2 className="about-profile-name">{fullName}</h2>
          <p className="about-profile-email">{profile.email}</p>
          <div className="about-profile-meta-row">
            <span className="about-profile-phone">{formattedPhone}</span>
            <span className="about-account-badge">
              {profile.accountStatus || "Registered Account"}
            </span>
          </div>
        </div>
      </div>

      <div className="about-profile-right">
        <p className="about-join-text">
          Join : Since {profile.joinedSince || "2022"}
        </p>
        <button
          type="button"
          className="about-edit-button"
          onClick={onEdit}
        >
          Edit Account
        </button>
      </div>
    </section>
  );
}
