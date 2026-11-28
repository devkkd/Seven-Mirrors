"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import "@/styles/create-account/create-account.css";

function validateField(name, rawValue) {
  const value = (rawValue || "").trim();

  switch (name) {
    case "firstName":
      if (!value) return "First name is required.";
      if (value.length < 2) return "Enter at least 2 characters.";
      return "";
    case "lastName":
      if (!value) return "Last name is required.";
      if (value.length < 2) return "Enter at least 2 characters.";
      return "";
    case "age": {
      if (!value) return "Age is required.";
      const numericMatch = value.match(/^\d+$/);
      if (!numericMatch) return "Enter a valid numeric age.";
      const num = Number(value);
      if (num < 18 || num > 120) return "Age must be between 18 and 120.";
      return "";
    }
    case "mobile": {
      if (!value) return "Mobile number is required.";
      const digitsOnly = value.replace(/[\s\-()+]/g, "");
      if (!/^\d{10,15}$/.test(digitsOnly)) {
        return "Enter a valid 10 to 15 digit mobile number.";
      }
      return "";
    }
    case "email": {
      if (!value) return "Email address is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return "Enter a valid email address.";
      }
      return "";
    }
    default:
      return "";
  }
}

export default function CreateAccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    mobile: "",
    email: ""
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill email from Login popup query param when available
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setFormData((prev) => ({
        ...prev,
        email: prev.email || emailParam
      }));
    }
  }, [searchParams]);

  const fieldNames = ["firstName", "lastName", "age", "mobile", "email"];
  const isFormValid = fieldNames.every(
    (field) => validateField(field, formData[field]) === ""
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSubmitError("");

    const fieldError = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: touched[field] || !fieldError ? fieldError : prev[field]
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field])
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    // Validate all 5 mandatory fields on submit
    const newErrors = {};
    const allTouched = {};
    fieldNames.forEach((field) => {
      allTouched[field] = true;
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setTouched(allTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const trimmedEmail = formData.email.trim().toLowerCase();

    try {
      const saved = localStorage.getItem("seven_mirrors_registered_emails");
      const registeredEmails = saved ? JSON.parse(saved) : [];
      const updated = Array.isArray(registeredEmails) && !registeredEmails.includes(trimmedEmail)
        ? [...registeredEmails, trimmedEmail]
        : Array.isArray(registeredEmails)
          ? registeredEmails
          : [trimmedEmail];
      localStorage.setItem("seven_mirrors_registered_emails", JSON.stringify(updated));
    } catch (err) {
      // ignore storage errors
    }

    router.push("/confirm-and-pay?openLogin=true");
  };

  return (
    <div
      className="create-account-backdrop"
      onClick={() => router.back()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-account-heading"
    >
      <div
        className="create-account-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close (X) Button above Modal */}
        <button
          type="button"
          className="create-account-close-btn"
          onClick={() => router.back()}
          aria-label="Close create account modal"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9.5" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>

        {/* Modal Card */}
        <div className="create-account-card">
          {/* Black Header with Seven Mirror Stays Logo */}
          <div className="create-account-modal-header">
            <img
              src="/logo.png"
              alt="Seven Mirror Stays - Luxury Homes"
              className="create-account-modal-logo"
            />
          </div>

          <div className="create-account-body">
            <h1 id="create-account-heading" className="create-account-heading">
              Let&apos;s create your account
            </h1>
            <p className="create-account-subtitle">
              This information is required to book or rent.
            </p>

            <form onSubmit={handleSubmit} noValidate className="create-account-form">
            {/* First Name & Last Name */}
            <div>
              <div className="create-account-name-grid">
                <div className="create-account-field-group">
                  <label className="create-account-label" htmlFor="reg-first-name">
                    First Name*
                  </label>
                  <input
                    id="reg-first-name"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    onBlur={() => handleBlur("firstName")}
                    placeholder="Enter your first name"
                    className={`create-account-input ${
                      errors.firstName ? "has-error" : ""
                    }`}
                  />
                  {errors.firstName && (
                    <span className="create-account-error-msg">{errors.firstName}</span>
                  )}
                </div>

                <div className="create-account-field-group">
                  <label className="create-account-label" htmlFor="reg-last-name">
                    Last Name*
                  </label>
                  <input
                    id="reg-last-name"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    onBlur={() => handleBlur("lastName")}
                    placeholder="Enter your last name"
                    className={`create-account-input ${
                      errors.lastName ? "has-error" : ""
                    }`}
                  />
                  {errors.lastName && (
                    <span className="create-account-error-msg">{errors.lastName}</span>
                  )}
                </div>
              </div>
              <p className="create-account-helper">
                Make sure it matches the name on your government ID. If you&apos;re staying with others, you can add a guest&apos;s full name.
              </p>
            </div>

            {/* Age */}
            <div className="create-account-field-group">
              <label className="create-account-label" htmlFor="reg-age">
                Age*
              </label>
              <input
                id="reg-age"
                type="text"
                inputMode="numeric"
                required
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                onBlur={() => handleBlur("age")}
                placeholder="Enter your age (e.g. 25 years)"
                className={`create-account-input ${errors.age ? "has-error" : ""}`}
              />
              {errors.age && (
                <span className="create-account-error-msg">{errors.age}</span>
              )}
            </div>

            {/* Mobile Number */}
            <div className="create-account-field-group">
              <label className="create-account-label" htmlFor="reg-mobile">
                Mobile Number*
              </label>
              <input
                id="reg-mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                onBlur={() => handleBlur("mobile")}
                placeholder="Enter your mobile number"
                className={`create-account-input ${errors.mobile ? "has-error" : ""}`}
              />
              {errors.mobile && (
                <span className="create-account-error-msg">{errors.mobile}</span>
              )}
            </div>

            {/* Email Address */}
            <div className="create-account-field-group">
              <label className="create-account-label" htmlFor="reg-email">
                Email Address*
              </label>
              <input
                id="reg-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="Enter your email address"
                className={`create-account-input ${errors.email ? "has-error" : ""}`}
              />
              {errors.email && (
                <span className="create-account-error-msg">{errors.email}</span>
              )}
              <p className="create-account-helper">
                We&apos;ll email you trip confirmations and receipts.
              </p>
            </div>

            {/* Terms and Conditions */}
            <p className="create-account-terms">
              By selecting Agree and continue, I agree to Seven Mirror&apos;s{" "}
              <strong>Terms of Service</strong>,{" "}
              <strong>Payments Terms of Service</strong> and acknowledge the{" "}
              <strong>Privacy Policy</strong>.
            </p>

            {submitError && (
              <p className="create-account-status-error" role="alert">
                {submitError}
              </p>
            )}

            {submitSuccess && (
              <p className="create-account-status-success" role="status">
                {submitSuccess}
              </p>
            )}

            {/* Agree and Continue Button */}
            <div className="create-account-submit-wrap">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`create-account-submit-btn ${
                  isFormValid && !isSubmitting ? "is-valid" : ""
                }`}
              >
                {isSubmitting ? "Creating Account..." : "Agree and Continue →"}
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
