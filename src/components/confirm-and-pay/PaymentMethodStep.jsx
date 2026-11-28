"use client";

import React, { useState } from "react";
import "@/styles/confirm-and-pay/payment-method-step.css";

export default function PaymentMethodStep({
  onRazorpaySuccess,
  onCashBookingSuccess
}) {
  const [loadingMethod, setLoadingMethod] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const handleRazorpayContinue = () => {
    if (loadingMethod) return;
    setFeedbackError("");
    onRazorpaySuccess?.({});
  };

  const handleCashContinue = () => {
    if (loadingMethod) return;
    setFeedbackError("");
    onCashBookingSuccess({});
  };

  return (
    <div className="payment-step-wrapper">
      {/* Payment Option 1: Pay Online & Confirm Your Stay */}
      <div className="payment-option-card">
        <img
          src="/images/icons/online-payment-icon.png"
          alt="Pay Online"
          className="payment-option-icon"
        />
        <div className="payment-option-content">
          <h2 className="payment-option-title">Pay Online &amp; Confirm Your Stay</h2>
          <p className="payment-option-desc">
            Complete your booking securely online.
            <br />
            You&apos;ll be redirected to Razorpay to make the payment and confirm your reservation.
          </p>

          <button
            type="button"
            className="payment-action-btn"
            onClick={handleRazorpayContinue}
            disabled={loadingMethod !== ""}
          >
            <span>{loadingMethod === "razorpay" ? "Connecting to" : "Continue to"}</span>
            <img
              src="/images/icons/razorpay-logo.png"
              alt="Razorpay"
              className="payment-razorpay-logo"
            />
          </button>
        </div>
      </div>

      {/* Payment Option 2: Reserve Now, Pay at the Stay */}
      <div className="payment-option-card">
        <img
          src="/images/icons/cash-payment-icon.png"
          alt="Pay at Stay"
          className="payment-option-icon"
        />
        <div className="payment-option-content">
          <h2 className="payment-option-title">Reserve Now, Pay at the Stay</h2>
          <div className="payment-option-desc-block">
            <p className="payment-option-desc">
              Reserve your stay now and pay in cash when you arrive.
              <br />
              <strong>Check-in starts at 2:00 PM.</strong> Please arrive at least{" "}
              <strong>1 hour before check-in</strong> to complete the check-in process.
            </p>
            <p className="payment-option-desc">
              Important: Your reservation is confirmed only after your booking request is
              successfully submitted. Availability may change until the reservation is confirmed.
            </p>
          </div>

          <button
            type="button"
            className="payment-action-btn"
            onClick={handleCashContinue}
            disabled={loadingMethod !== ""}
          >
            {loadingMethod === "cash"
              ? "Submitting Request..."
              : "Continue to Cash Payment →"}
          </button>
        </div>
      </div>

      {feedbackError && (
        <p className="payment-feedback-error" role="alert">
          {feedbackError}
        </p>
      )}

      {/* Terms and Conditions */}
      <p className="payment-terms-note">
        By selecting the button, I agree to the <strong>booking terms</strong> and{" "}
        <strong>Terms of Services</strong>. View <strong>Privacy Policy</strong>.
      </p>
    </div>
  );
}
