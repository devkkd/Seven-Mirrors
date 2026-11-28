"use client";

import React, { useState } from "react";
import "@/styles/profile/about-me.css";

const COUNTRY_CODES = ["+91", "+1", "+44", "+61", "+971", "+65"];

export default function EditProfileForm({ profile, onBack, onSave }) {
  const [formData, setFormData] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    age: profile.age !== undefined && profile.age !== null ? String(profile.age) : "",
    email: profile.email || "",
    countryCode: profile.countryCode || "+91",
    phone: profile.phone || "",
    profileImage: profile.profileImage || "/images/profile/john-avatar.png"
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    const parsedAge = Number(formData.age);
    if (!formData.age.trim()) {
      nextErrors.age = "Age is required.";
    } else if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 120) {
      nextErrors.age = "Please enter a valid age between 1 and 120.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      nextErrors.phone = "Please enter a valid phone number (7–15 digits).";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...profile,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      age: Number(formData.age),
      email: formData.email.trim(),
      countryCode: formData.countryCode,
      phone: formData.phone.replace(/\D/g, ""),
      profileImage: formData.profileImage
    });
  };

  return (
    <section className="edit-page-wrapper" aria-label="Edit Account">
      <div className="edit-header-row">
        <button
          type="button"
          className="edit-back-button"
          onClick={onBack}
          aria-label="Back to About Me"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h2 className="edit-heading">Edit Account</h2>
      </div>

      <form className="edit-form-card" onSubmit={handleSubmit} noValidate>
        <div className="edit-photo-section">
          <img
            src={formData.profileImage || "/images/profile/john-avatar.png"}
            alt={formData.firstName || "Profile"}
            className="edit-avatar"
          />
          <label htmlFor="profile-photo-upload" className="edit-upload-photo-label">
            Change / Upload Photo
          </label>
          <input
            id="profile-photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="edit-hidden-file-input"
          />
        </div>

        <div className="edit-form-fields">
          <div className="edit-form-group">
            <label htmlFor="firstName" className="edit-form-label">
              First Name*
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange("firstName")}
              className={`edit-form-input ${errors.firstName ? "is-error" : ""}`}
            />
            {errors.firstName && (
              <p className="edit-error-text">{errors.firstName}</p>
            )}
          </div>

          <div className="edit-form-group">
            <label htmlFor="lastName" className="edit-form-label">
              Last Name*
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange("lastName")}
              className={`edit-form-input ${errors.lastName ? "is-error" : ""}`}
            />
            <p className="edit-helper-text">
              Make sure it matches the name on your government ID.
              <br />
              If you go by another name, you can add a preferred first name.
            </p>
            {errors.lastName && (
              <p className="edit-error-text">{errors.lastName}</p>
            )}
          </div>

          <div className="edit-form-group">
            <label htmlFor="age" className="edit-form-label">
              Age*
            </label>
            <input
              id="age"
              type="number"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange("age")}
              className={`edit-form-input ${errors.age ? "is-error" : ""}`}
            />
            {errors.age && <p className="edit-error-text">{errors.age}</p>}
          </div>

          <div className="edit-form-group">
            <label htmlFor="email" className="edit-form-label">
              Email Address*
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              className={`edit-form-input ${errors.email ? "is-error" : ""}`}
            />
            <p className="edit-helper-text">
              We&apos;ll email you trip confirmations and receipts.
            </p>
            {errors.email && <p className="edit-error-text">{errors.email}</p>}
          </div>

          <div className="edit-form-group">
            <label htmlFor="phone" className="edit-form-label">
              Phone Number*
            </label>
            <div
              className={`edit-phone-group ${errors.phone ? "is-error" : ""}`}
            >
              <div className="edit-country-code-wrap">
                <select
                  aria-label="Country Code"
                  value={formData.countryCode}
                  onChange={handleChange("countryCode")}
                  className="edit-country-code-select"
                >
                  {COUNTRY_CODES.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <svg
                  className="edit-country-code-chevron"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <span className="edit-phone-divider" aria-hidden="true" />
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange("phone")}
                className="edit-phone-input"
              />
            </div>
            {errors.phone && <p className="edit-error-text">{errors.phone}</p>}
          </div>
        </div>

        <div className="edit-save-button-wrap">
          <button type="submit" className="edit-save-button">
            Save →
          </button>
        </div>
      </form>
    </section>
  );
}
