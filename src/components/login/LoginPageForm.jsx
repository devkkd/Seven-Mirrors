"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OtpVerificationStep from "@/components/confirm-and-pay/OtpVerificationStep";
import "@/styles/login/login.css";

const SHOW_PHONE_LOGIN = false;

export default function LoginPageForm() {
  const router = useRouter();
  const [step, setStep] = useState("login");
  const [authTab, setAuthTab] = useState(SHOW_PHONE_LOGIN ? "phone" : "email");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailNotRegistered, setEmailNotRegistered] = useState(false);

  const isInputFilled =
    authTab === "phone"
      ? phoneNumber.trim().length > 0
      : emailAddress.trim().length > 0;

  const contactValue =
    authTab === "phone"
      ? `${countryCode}${phoneNumber.trim()}`
      : emailAddress.trim();

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
    router.push(`/create-account${emailParam}`);
  };

  const handleSocialLogin = () => {
    router.push("/confirm-and-pay?step=2");
  };

  return (
    <div className="login-page-shell">
      {/* White Header with Centered Logo & Thin Bottom Border */}
      <header className="login-page-header">
        <Link
          href="/"
          className="login-page-logo-link"
          aria-label="Seven Mirror Stays Home"
        >
          <Image
            src="/logo.png"
            alt="Seven Mirror Stays - Luxury Homes"
            width={220}
            height={48}
            priority
            className="login-page-logo-img"
          />
        </Link>
      </header>

      {/* Main Centered Login Card */}
      <main className="login-page-main">
        <div className="login-page-wrapper">
          <div className="login-page-card">
            {/* Black Card Header */}
            <div className="login-page-card-header">
              <img
                src="/logo.png"
                alt="Seven Mirror Stays - Luxury Homes"
                className="login-page-card-logo"
              />
            </div>

            {step === "verify" ? (
              <OtpVerificationStep
                contactMethod={authTab}
                contactValue={contactValue}
                onBack={() => setStep("login")}
                onVerified={() => router.push("/confirm-and-pay?step=2")}
              />
            ) : (
              <div className="login-page-card-body">
                <div>
                  <h1 className="login-page-title">Log In or Sign Up</h1>

                  {/* Tabs */}
                  <div className="login-page-tabs" role="tablist">
                    {SHOW_PHONE_LOGIN && (
                      <button
                        type="button"
                        role="tab"
                        aria-selected={authTab === "phone"}
                        className={`login-page-tab ${authTab === "phone" ? "is-active" : ""}`}
                        onClick={() => setAuthTab("phone")}
                      >
                        Phone
                      </button>
                    )}
                    <button
                      type="button"
                      role="tab"
                      aria-selected={authTab === "email"}
                      className={`login-page-tab ${authTab === "email" ? "is-active" : ""}`}
                      onClick={() => setAuthTab("email")}
                    >
                      Email
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} noValidate className="login-page-form">
                    {authTab === "phone" ? (
                      <div className="login-field-block">
                        <label className="login-field-label" htmlFor="login-phone-input">
                          Phone Number*
                        </label>
                        <div className="login-phone-box">
                          <div className="login-country-wrap">
                            <select
                              aria-label="Country code"
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                              className="login-country-select"
                            >
                              <option value="+91">+91</option>
                              <option value="+1">+1</option>
                              <option value="+44">+44</option>
                              <option value="+971">+971</option>
                              <option value="+61">+61</option>
                            </select>
                            <svg
                              className="login-country-chevron"
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
                            id="login-phone-input"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                            className="login-phone-input"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="login-field-block">
                        <label className="login-field-label" htmlFor="login-email-input">
                          Email Address*
                        </label>
                        <div className="login-email-box">
                          <input
                            id="login-email-input"
                            type="email"
                            value={emailAddress}
                            onChange={(e) => {
                              setEmailAddress(e.target.value);
                              if (emailNotRegistered) setEmailNotRegistered(false);
                            }}
                            placeholder="Enter your email address"
                            className="login-email-input"
                          />
                        </div>
                        {emailNotRegistered && (
                          <div className="login-not-registered-row" role="alert">
                            <span className="login-not-registered-text">
                              Email is not registered.
                            </span>
                            <button
                              type="button"
                              className="login-signup-mini-btn"
                              onClick={handleGoToRegister}
                            >
                              Signup
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="login-privacy-note">
                      We&apos;ll send a confirmation code by text or email. Message and data rates apply.{" "}
                      <strong>Privacy Policy</strong>
                    </p>

                    <div className="login-continue-wrap">
                      <button
                        type="submit"
                        className={`login-continue-btn ${isInputFilled ? "is-ready" : ""}`}
                      >
                        Continue →
                      </button>
                    </div>
                  </form>
                </div>

                <div>
                  <div className="login-or-label">Or Login With</div>

                  <div className="login-social-row">
                    <button
                      type="button"
                      className="login-social-btn"
                      onClick={handleSocialLogin}
                    >
                      <img
                        src="/images/icons/apple-icon.png"
                        alt="Apple"
                        className="login-social-icon-apple"
                      />
                      <span>Apple</span>
                    </button>

                    <button
                      type="button"
                      className="login-social-btn"
                      onClick={handleSocialLogin}
                    >
                      <img
                        src="/images/icons/google-icon.png"
                        alt="Google"
                        className="login-social-icon-google"
                      />
                      <span>Google</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
