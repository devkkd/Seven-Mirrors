"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/profile/booking-cancelled.css";

const DEFAULT_CANCELLED = {
  bookingId: "SM123456",
  propertyName: "Rossiero",
  checkInDate: "24 Sep 2026",
  checkInTime: "2:00 PM",
  checkOutDate: "26 Sep 2026",
  checkOutTime: "11:00 AM",
  totalAmount: "₹19,000.00",
  refundAmount: "₹19,000.00",
  paymentMethod: "Online Payment",
  refundStatus: "Refund Initiated"
};

export default function BookingCancelledSuccess() {
  const [info, setInfo] = useState(DEFAULT_CANCELLED);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("seven_mirrors_cancelled_booking_success");
      if (raw) {
        const parsed = JSON.parse(raw);
        setInfo({
          bookingId: parsed.bookingId || DEFAULT_CANCELLED.bookingId,
          propertyName: parsed.propertyName || DEFAULT_CANCELLED.propertyName,
          checkInDate: parsed.checkInDate || DEFAULT_CANCELLED.checkInDate,
          checkInTime: parsed.checkInTime || DEFAULT_CANCELLED.checkInTime,
          checkOutDate: parsed.checkOutDate || DEFAULT_CANCELLED.checkOutDate,
          checkOutTime: parsed.checkOutTime || DEFAULT_CANCELLED.checkOutTime,
          totalAmount: parsed.totalAmount || DEFAULT_CANCELLED.totalAmount,
          refundAmount: parsed.refundAmount || parsed.totalAmount || DEFAULT_CANCELLED.refundAmount,
          paymentMethod:
            parsed.paymentMethod === "Paid Online"
              ? "Online Payment"
              : parsed.paymentMethod || DEFAULT_CANCELLED.paymentMethod,
          refundStatus:
            parsed.paymentMethod === "Paid Online"
              ? "Refund Initiated"
              : parsed.refundStatus || "No Charge"
        });
      }
    } catch (err) {
      // keep fallback
    }
  }, []);

  return (
    <main className="cancelled-success-shell">
      <div className="cancelled-success-card">
        {/* Section 1: Heading */}
        <div className="cancelled-success-top">
          <h1 className="cancelled-success-heading">Booking Cancelled Successfully</h1>
          <p className="cancelled-success-subtext">
            Your booking has been successfully cancelled.
          </p>
        </div>

        {/* Section 2: Gray Banner */}
        <div className="cancelled-success-banner">
          <img
            src="/images/icons/profile/cancelled-success-check.png"
            alt="Cancelled"
            className="cancelled-success-check-img"
          />
          <p className="cancelled-success-booking-id">
            Booking ID: #{info.bookingId}
          </p>
          <div className="cancelled-success-meta-lines">
            <span>Property: {info.propertyName}</span>
            <span>
              Check-in: {info.checkInDate} · {info.checkInTime}
            </span>
            <span>
              Check-out: {info.checkOutDate} · {info.checkOutTime}
            </span>
          </div>
        </div>

        {/* Section 3: Refund Details */}
        <section className="cancelled-refund-section" aria-label="Refund Details">
          <h2 className="cancelled-refund-heading">Refund Details</h2>
          <div className="cancelled-refund-grid">
            <div className="cancelled-refund-row">
              <span className="cancelled-refund-label">Amount Paid:</span>
              <span className="cancelled-refund-value">{info.totalAmount}</span>
            </div>
            <div className="cancelled-refund-row">
              <span className="cancelled-refund-label">Refund Amount:</span>
              <span className="cancelled-refund-value">{info.refundAmount}</span>
            </div>
            <div className="cancelled-refund-row">
              <span className="cancelled-refund-label">Payment:</span>
              <span className="cancelled-refund-value">{info.paymentMethod}</span>
            </div>
            <div className="cancelled-refund-row">
              <span className="cancelled-refund-label">Refund Status:</span>
              <span className="cancelled-refund-value">{info.refundStatus}</span>
            </div>
          </div>
        </section>

        {/* Section 4: Refund Note */}
        <div className="cancelled-note-box">
          <p className="cancelled-note-text">
            Your refund will be credited to your original payment method. The refund may
            take 5-7 business days to appear in your account, depending on your bank or
            payment provider.
          </p>
        </div>

        {/* Section 5: Action Buttons */}
        <div className="cancelled-actions">
          <Link href="/properties" className="cancelled-another-btn">
            Book Another Stay →
          </Link>
          <Link href="/" className="cancelled-home-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
