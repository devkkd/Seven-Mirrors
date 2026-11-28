"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OtpVerificationStep from "@/components/confirm-and-pay/OtpVerificationStep";
import "@/styles/confirm-and-pay/login-signup-modal.css";

const SHOW_PHONE_LOGIN = false;

export default function LoginSignupModal({
  isOpen,
  onClose,
  onSuccess,
  isPage = false
}) {
  const router = useRouter();
  const [step, setStep] = useState("login");
  const [authTab, setAuthTab] = useState(SHOW_PHONE_LOGIN ? "phone" : "email");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailNotRegistered, setEmailNotRegistered] = useState(false);

  if (!isOpen) return null;

  const isInputFilled =
    authTab === "phone"
      ? phoneNumber.trim().length > 0
      : emailAddress.trim().length > 0;

  const contactValue =
    authTab === "phone"
      ? `${countryCode}${phoneNumber.trim()}`
      : emailAddress.trim();

  const handleClose = () => {
    setStep("login");
    setEmailNotRegistered(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isInputFilled) return;

    if (authTab === "phone") {
      setStep("verify");
      return;
    }

    setEmailNotRegistered(true);
  };

  const handleGoToRegister = () => {
    const emailParam = emailAddress.trim()
      ? `?email=${encodeURIComponent(emailAddress.trim())}`
      : "";
    handleClose();
    router.push(`/create-account${emailParam}`);
  };

  const handleSocialLogin = (provider) => {
    onSuccess({
      method: provider,
      value: provider
    });
  };

  const cardMarkup = (
    <div
      className={`auth-modal-wrapper ${step === "verify" ? "is-otp-step" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      {!isPage && (
        <button
          type="button"
          className="auth-modal-close-btn"
          onClick={handleClose}
          aria-label="Close login modal"
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
      )}

      {/* Modal / Page Card */}
      <div className={`auth-modal-card ${isPage ? "is-page-card" : ""}`}>
          {/* Black Header with Seven Mirror Stays Logo */}
          <div className="auth-modal-header">
            <img
              src="/logo.png"
              alt="Seven Mirror Stays - Luxury Homes"
              className="auth-modal-logo"
            />
          </div>

          {/* White Modal Body: Login or OTP Verification */}
          {step === "verify" ? (
            <OtpVerificationStep
              contactMethod={authTab}
              contactValue={contactValue}
              onBack={() => setStep("login")}
              onVerified={(userInfo) => {
                setStep("login");
                onSuccess(userInfo);
              }}
            />
          ) : (
            <div className="auth-modal-body">
              <h2 id="auth-modal-heading" className="auth-modal-title">
                Log In or Sign Up
              </h2>

              {/* Phone / Email Tabs */}
              <div className="auth-modal-tabs" role="tablist">
                {SHOW_PHONE_LOGIN && (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={authTab === "phone"}
                    className={`auth-modal-tab ${authTab === "phone" ? "is-active" : ""}`}
                    onClick={() => setAuthTab("phone")}
                  >
                    Phone
                  </button>
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={authTab === "email"}
                  className={`auth-modal-tab ${authTab === "email" ? "is-active" : ""}`}
                  onClick={() => setAuthTab("email")}
                >
                  Email
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="auth-modal-form">
                {authTab === "phone" ? (
                  <div className="auth-field-block">
                    <label className="auth-field-label" htmlFor="auth-phone-input">
                      Phone Number*
                    </label>
                    <div className="auth-phone-box">
                      <div className="auth-country-wrap">
                        <select
                          aria-label="Country code"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="auth-country-select"
                        >
                          <option value="+91">+91</option>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+971">+971</option>
                          <option value="+61">+61</option>
                        </select>
                        <svg
                          className="auth-country-chevron"
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      <input
                        id="auth-phone-input"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        className="auth-phone-input"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="auth-field-block">
                    <label className="auth-field-label" htmlFor="auth-email-input">
                      Email Address*
                    </label>
                    <div className="auth-email-box">
                      <input
                        id="auth-email-input"
                        type="email"
                        value={emailAddress}
                        onChange={(e) => {
                          setEmailAddress(e.target.value);
                          if (emailNotRegistered) setEmailNotRegistered(false);
                        }}
                        placeholder="Enter your email address"
                        className="auth-email-input"
                      />
                    </div>
                    <div className="auth-not-registered-row">
                      {emailNotRegistered ? (
                        <span className="auth-not-registered-text" role="alert">
                          Email is not registered.
                        </span>
                      ) : (
                        <span />
                      )}
                      <button
                        type="button"
                        className="auth-signup-mini-btn"
                        onClick={handleGoToRegister}
                      >
                        Signup
                      </button>
                    </div>
                  </div>
                )}

                <p className="auth-privacy-note">
                  We&apos;ll send a confirmation code by text or email. Message and data rates apply.{" "}
                  <strong>Privacy Policy</strong>
                </p>

                <div className="auth-continue-wrap">
                  <button
                    type="submit"
                    className={`auth-continue-btn ${isInputFilled ? "is-ready" : ""}`}
                  >
                    Continue →
                  </button>
                </div>
              </form>

              <div className="auth-or-label">Or Login With</div>

              <div className="auth-social-row">
                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={() => handleSocialLogin("Apple")}
                >
                  <img
                    src="/images/icons/apple-icon.png"
                    alt="Apple"
                    className="auth-social-icon-apple"
                  />
                  <span>Apple</span>
                </button>

                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <img
                    src="/images/icons/google-icon.png"
                    alt="Google"
                    className="auth-social-icon-google"
                  />
                  <span>Google</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
  );

  if (isPage) {
    return (
      <div className="auth-page-shell">
        <header className="auth-page-header">
          <Link href="/" className="auth-page-logo-link" aria-label="Seven Mirror Stays Home">
            <Image
              src="/logo.png"
              alt="Seven Mirror Stays - Luxury Homes"
              width={220}
              height={48}
              priority
              className="auth-page-logo-img"
            />
          </Link>
        </header>
        <main className="auth-page-main">{cardMarkup}</main>
      </div>
    );
  }

  return (
    <div
      className="auth-modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-heading"
    >
      {cardMarkup}
    </div>
  );
}
