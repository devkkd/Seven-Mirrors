"use client";

import React, { useState } from "react";
import "@/styles/profile/cancel-booking.css";

const CANCELLATION_REASONS = [
  "Change of plans",
  "Found another stay",
  "Travel dates changed",
  "Price or budget",
  "Other"
];

export default function CancelBookingView({
  booking,
  onBack,
  onConfirmCancel
}) {
  const [selectedReason, setSelectedReason] = useState("Change of plans");
  const [notes, setNotes] = useState("");
  const [showFullPolicy, setShowFullPolicy] = useState(false);

  if (!booking) return null;

  return (
    <section className="cancel-booking-section" aria-label="Cancel Booking">
      {/* Header */}
      <div className="cancel-booking-header">
        <div className="cancel-booking-title-row">
          <button
            type="button"
            className="cancel-booking-back-btn"
            onClick={onBack}
            aria-label="Back to My Bookings"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h2 className="cancel-booking-heading">Cancel Booking</h2>
        </div>
        <p className="cancel-booking-subtitle">
          We&apos;re sorry to see you go. Please review your booking details and
          cancellation policy before proceeding.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="cancel-booking-grid">
        {/* Left Summary Card */}
        <div className="cancel-summary-card">
          <div className="cancel-summary-img-box">
            <img
              src={booking.image || "/images/property/main-living.jpg"}
              alt={booking.propertyName}
              className="cancel-summary-img"
            />
            <button type="button" className="cancel-summary-photos-pill">
              {booking.morePhotosLabel || "24 More Photos →"}
            </button>
          </div>

          <div>
            <h3 className="cancel-summary-title">{booking.propertyName}</h3>
            <p className="cancel-summary-desc">{booking.description}</p>
            <p className="cancel-summary-address">
              <strong>ADDRESS:</strong> {booking.address}
            </p>
          </div>

          {/* 3x2 Info Grid */}
          <div className="cancel-details-grid">
            <div className="cancel-detail-cell">
              <div className="cancel-detail-label-row">
                <img
                  src="/images/icons/profile/calendar-icon.png"
                  alt="Check-in"
                  className="cancel-detail-icon"
                />
                <span>Check-in</span>
              </div>
              <div className="cancel-detail-val">{booking.checkInDate}</div>
              <div className="cancel-detail-sub">{booking.checkInTime}</div>
            </div>

            <div className="cancel-detail-cell">
              <div className="cancel-detail-label-row">
                <img
                  src="/images/icons/profile/calendar-icon.png"
                  alt="Check-out"
                  className="cancel-detail-icon"
                />
                <span>Check-out</span>
              </div>
              <div className="cancel-detail-val">{booking.checkOutDate}</div>
              <div className="cancel-detail-sub">{booking.checkOutTime}</div>
            </div>

            <div className="cancel-detail-cell">
              <div className="cancel-detail-label-row">
                <img
                  src="/images/icons/profile/moon-icon.png"
                  alt="Stay"
                  className="cancel-detail-icon"
                />
                <span>Stay:</span>
              </div>
              <div className="cancel-detail-val">{booking.nightsLabel}</div>
            </div>

            <div className="cancel-detail-cell">
              <div className="cancel-detail-label-row">
                <img
                  src="/images/icons/profile/guests-icon.png"
                  alt="Guests"
                  className="cancel-detail-icon"
                />
                <span>Guests:</span>
              </div>
              <div className="cancel-detail-val">{booking.guestsLabel}</div>
            </div>

            <div className="cancel-detail-cell">
              <div className="cancel-detail-label-row">
                <img
                  src="/images/icons/profile/booking-id-icon.png"
                  alt="Booking ID"
                  className="cancel-detail-icon"
                />
                <span>Booking ID :</span>
              </div>
              <div className="cancel-detail-val">#{booking.bookingId}</div>
            </div>

            <div className="cancel-detail-cell">
              <div className="cancel-detail-label-row">
                <img
                  src="/images/icons/profile/calendar-icon.png"
                  alt="Booking Date"
                  className="cancel-detail-icon"
                />
                <span>Booking Date :</span>
              </div>
              <div className="cancel-detail-val">
                {booking.bookingDate || "18 Sep 2026"}
              </div>
            </div>
          </div>

          {/* Total Amount & Method */}
          <div className="cancel-amount-box">
            <div>
              <p className="cancel-amount-label">Total Amount:</p>
              <p className="cancel-amount-val">{booking.totalAmount}</p>
            </div>
            <div className="cancel-method-col">
              <p className="cancel-amount-label">Method</p>
              <span
                className={`cancel-method-val ${
                  booking.paymentMethod === "Paid Online" ? "" : "is-cash"
                }`}
              >
                {booking.paymentMethod === "Paid Online" ? "💳 " : ""}
                {booking.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        {/* Right Cancellation Panel */}
        <div className="cancel-right-panel">
          {/* 1. Cancellation Policy */}
          <div className="cancel-policy-card">
            <div className="cancel-policy-header">
              <div>
                <h3 className="cancel-policy-title">Cancellation Policy</h3>
                <p className="cancel-policy-sub">
                  Refund amount depends on when you cancel.
                </p>
              </div>
              <button
                type="button"
                className="cancel-policy-btn"
                onClick={() => setShowFullPolicy((prev) => !prev)}
              >
                {showFullPolicy ? "Hide Policy" : "View Full Policy →"}
              </button>
            </div>

            <div className="cancel-policy-table">
              <div className="cancel-policy-row">
                <span>More than 7 days before check-in</span>
                <strong>100% refund</strong>
              </div>
              <div className="cancel-policy-row">
                <span>3-7 days before check-in</span>
                <strong>50% refund</strong>
              </div>
              <div className="cancel-policy-row">
                <span>Less than 3 days before check-in</span>
                <strong>No refund</strong>
              </div>
              {showFullPolicy && (
                <div className="cancel-policy-row pt-[6px] border-t border-[#f0ece3]">
                  <span>
                    Refunds are processed back to the original payment method within 5–7 business days.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Your Refund Estimate */}
          <div className="cancel-refund-card">
            <div>
              <h3 className="cancel-refund-title">Your Refund Estimate</h3>
              <p className="cancel-refund-sub">
                Based on your check-in date ({booking.checkInDate}) and our cancellation policy.
              </p>
            </div>

            <div className="cancel-refund-pill">
              <span className="cancel-refund-pill-label">Estimated Refund Amount</span>
              <span className="cancel-refund-pill-amount">{booking.totalAmount}</span>
              <span className="cancel-refund-pill-note">
                Refund to original payment method
              </span>
            </div>
          </div>

          {/* 3. Reason */}
          <div className="cancel-reason-card">
            <h3 className="cancel-reason-title">
              Why are you cancelling your booking?
            </h3>

            <div className="cancel-reason-options">
              {CANCELLATION_REASONS.map((reason) => (
                <label key={reason} className="cancel-reason-option">
                  <input
                    type="radio"
                    name="cancelReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us more (optional)"
              className="cancel-reason-input"
              aria-label="Additional cancellation notes"
            />
          </div>

          {/* 4. Buttons */}
          <div className="cancel-actions-row">
            <button
              type="button"
              className="cancel-confirm-red-btn"
              onClick={() => onConfirmCancel(booking, selectedReason, notes)}
            >
              Yes, Cancel Booking
            </button>
            <button
              type="button"
              className="cancel-keep-dark-btn"
              onClick={onBack}
            >
              Keep My Booking
            </button>
          </div>

          {/* 5. Security Note */}
          <p className="cancel-security-note">
            <span>🔒</span>
            <span>Your cancellation is secure and will be processed instantly.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
