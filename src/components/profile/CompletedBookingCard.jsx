"use client";

import React from "react";
import BookingReview from "@/components/profile/BookingReview";
import "@/styles/profile/completed-booking.css";

export default function CompletedBookingCard({ booking }) {
  return (
    <article className="booking-dashboard-card">
      <div className="booking-card-grid">
        <div className="booking-card-img-box">
          <img
            src={booking.image || "/images/property/main-living.jpg"}
            alt={booking.propertyName}
            className="booking-card-img"
          />
          <button type="button" className="booking-more-photos-pill">
            {booking.morePhotosLabel || "24 More Photos →"}
          </button>
        </div>

        <div className="booking-card-top-row">
          <div className="booking-card-title-group">
            <h2 className="booking-card-property-name">{booking.propertyName}</h2>
            <p className="booking-card-property-desc">{booking.description}</p>
            <p className="booking-card-property-address">
              <strong>ADDRESS:</strong> {booking.address}
            </p>
          </div>

          <div className="booking-card-id-status">
            <span className="booking-card-id-text">
              Booking ID : #{booking.bookingId}
            </span>
            <span className="booking-status-badge status-upcoming">
              {booking.statusBadge || "Completed"}
            </span>
          </div>
        </div>

        {/* 4 Info Boxes */}
        <div className="booking-info-boxes-grid">
          <div className="booking-info-box">
            <div className="booking-info-label-row">
              <img
                src="/images/icons/profile/calendar-icon.png"
                alt="Check-in"
                className="booking-info-icon"
              />
              <span>Check-in</span>
            </div>
            <div className="booking-info-main-val">{booking.checkInDate}</div>
            <div className="booking-info-sub-val">{booking.checkInTime}</div>
          </div>

          <div className="booking-info-box">
            <div className="booking-info-label-row">
              <img
                src="/images/icons/profile/calendar-icon.png"
                alt="Check-out"
                className="booking-info-icon"
              />
              <span>Check-out</span>
            </div>
            <div className="booking-info-main-val">{booking.checkOutDate}</div>
            <div className="booking-info-sub-val">{booking.checkOutTime}</div>
          </div>

          <div className="booking-info-box">
            <div className="booking-info-label-row">
              <img
                src="/images/icons/profile/moon-icon.png"
                alt="Stay"
                className="booking-info-icon"
              />
              <span>Stay :</span>
            </div>
            <div className="booking-info-main-val">{booking.nightsLabel}</div>
          </div>

          <div className="booking-info-box">
            <div className="booking-info-label-row">
              <img
                src="/images/icons/profile/guests-icon.png"
                alt="Guests"
                className="booking-info-icon"
              />
              <span>Guests :</span>
            </div>
            <div className="booking-info-main-val">{booking.guestsLabel}</div>
          </div>
        </div>

        <div className="booking-price-summary-box">
          <div>
            <p className="booking-price-total-label">Total Amount:</p>
            <p className="booking-price-total-amount">{booking.totalAmount}</p>
          </div>

          <div className="booking-price-divider" />

          <div className="booking-price-meta-grid">
            <div>
              <div className="booking-price-meta-label">Method</div>
              <div
                className={`booking-price-meta-value ${
                  booking.paymentMethod === "Paid Online" ? "is-paid" : ""
                }`}
              >
                {booking.paymentMethod === "Paid Online" ? "💳 " : ""}
                {booking.paymentMethod}
              </div>
            </div>
            <div>
              <div className="booking-price-meta-label">Status</div>
              <div
                className={`booking-price-meta-value ${
                  booking.paymentStatus === "Paid" ? "is-paid" : ""
                }`}
              >
                {booking.paymentStatus === "Paid" && (
                  <img
                    src="/images/icons/profile/paid-check-icon.png"
                    alt=""
                    className="w-[13px] h-[13px] object-contain shrink-0"
                  />
                )}
                {booking.paymentStatus}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Stay Information + Book Again / View Stay / Download Receipt */}
        <div className="booking-card-bottom-row">
          <div className="booking-stay-info-block">
            <h3 className="booking-stay-info-title">Stay Information :</h3>
            <p className="booking-stay-info-text">
              Please arrive at the property on your check-in date.
            </p>
            <p className="booking-stay-info-text">
              Keep your booking ID handy during check-in.
            </p>
          </div>

          <div className="booking-actions-row">
            <button type="button" className="booking-btn-dark">
              Book Again →
            </button>
            <button type="button" className="booking-btn-outline">
              View Stay →
            </button>
            <button type="button" className="booking-btn-dark">
              Download Receipt
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <BookingReview
        bookingId={booking.bookingId}
        propertyName={booking.propertyName}
      />
    </article>
  );
}
