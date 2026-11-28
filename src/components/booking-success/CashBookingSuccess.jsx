"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import "@/styles/booking-success/cash-success.css";

function formatDateRange(checkIn, checkOut) {
  if (!checkIn || !checkOut) return "Dates confirmed on booking";
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return `${checkIn} – ${checkOut}`;
  }
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}–${end.getDate()} ${monthNames[start.getMonth()]} ${start.getFullYear()}`;
  }
  return `${start.getDate()} ${monthNames[start.getMonth()]} – ${end.getDate()} ${monthNames[end.getMonth()]} ${end.getFullYear()}`;
}

export default function CashBookingSuccess() {
  const searchParams = useSearchParams();
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    let stored = null;
    let checkoutStored = null;
    try {
      const raw = sessionStorage.getItem("seven_mirrors_cash_booking_success");
      if (raw) stored = JSON.parse(raw);
      const rawCheckout = sessionStorage.getItem("seven_mirrors_checkout_booking");
      if (rawCheckout) checkoutStored = JSON.parse(rawCheckout);
    } catch (err) {
      // ignore storage errors
    }

    const qId = searchParams.get("bookingId");
    const qDates = searchParams.get("dates");
    const qCheckInTime = searchParams.get("checkInTime");
    const qStatus = searchParams.get("status");
    const qPropertyId = searchParams.get("propertyId");

    if (stored || checkoutStored || qId) {
      setBookingInfo({
        bookingId: qId || stored?.bookingId || "",
        dates:
          qDates ||
          stored?.dates ||
          formatDateRange(
            stored?.checkIn || checkoutStored?.checkIn,
            stored?.checkOut || checkoutStored?.checkOut
          ),
        checkInTime: qCheckInTime || stored?.checkInTime || "2:00 pm – 4:00 pm",
        paymentMethod: stored?.paymentMethod || "Pay at Stay",
        status: qStatus || stored?.status || "Reserved",
        propertyId: qPropertyId || stored?.propertyId || checkoutStored?.propertyId || ""
      });
    }
  }, [searchParams]);

  const viewBookingHref = bookingInfo?.propertyId
    ? `/property/${bookingInfo.propertyId}`
    : "/confirm-and-pay";

  return (
    <div className="cash-success-shell">
      {/* White Header with Centered Logo & Thin Bottom Border */}
      <header className="cash-success-header">
        <Link
          href="/"
          className="cash-success-logo-link"
          aria-label="Seven Mirror Stays Home"
        >
          <Image
            src="/logo.png"
            alt="Seven Mirror Stays - Luxury Homes"
            width={220}
            height={48}
            priority
            className="cash-success-logo-img"
          />
        </Link>
      </header>

      {/* Main Centered Success Card */}
      <main className="cash-success-main">
        <div className="cash-success-card">
          {/* Section 1: Success Heading */}
          <div className="cash-success-top">
            <h1 className="cash-success-heading">Stay Reserved Successfully! 🎉</h1>
            <p className="cash-success-subtext">
              Your stay has been reserved.
              <br />
              Payment will be collected in cash when you arrive.
            </p>
          </div>

          {/* Section 2: Green Success Banner */}
          <div className="cash-success-banner">
            <div className="cash-success-check-circle">
              <img
                src="/images/icons/cash-success-check.png"
                alt="Confirmed"
                className="cash-success-check-icon"
              />
            </div>
            <p className="cash-success-booking-id">
              Booking ID: {bookingInfo?.bookingId ? `#${bookingInfo.bookingId}` : "Unavailable"}
            </p>
          </div>

          {/* Section 3: Your Stay */}
          <section className="cash-success-stay-section" aria-label="Your Stay">
            <h2 className="cash-success-stay-heading">Your Stay</h2>
            <div className="cash-success-stay-grid">
              <div className="cash-success-stay-row">
                <span className="cash-success-stay-label">Dates</span>
                <span className="cash-success-stay-value">
                  {bookingInfo?.dates || "—"}
                </span>
              </div>
              <div className="cash-success-stay-row">
                <span className="cash-success-stay-label">Check-in</span>
                <span className="cash-success-stay-value">
                  {bookingInfo?.checkInTime || "2:00 pm – 4:00 pm"}
                </span>
              </div>
              <div className="cash-success-stay-row">
                <span className="cash-success-stay-label">Payment</span>
                <span className="cash-success-stay-value">
                  {bookingInfo?.paymentMethod || "Pay at Stay"}
                </span>
              </div>
              <div className="cash-success-stay-row">
                <span className="cash-success-stay-label">Status</span>
                <span className="cash-success-stay-value">
                  {bookingInfo?.status || "Reserved"}
                </span>
              </div>
            </div>
          </section>

          {/* Section 4: Check-in Information */}
          <div className="cash-success-checkin-info">
            <p className="cash-success-checkin-text">
              Please arrive 1 hour before your check-in time to complete the check-in process.
            </p>
          </div>

          {/* Section 5: Important Notice */}
          <div className="cash-success-notice-box">
            <p className="cash-success-notice-text">
              <strong>Please note:</strong> Your reservation is subject to availability and
              confirmation by Seven Mirrors. Any required confirmation or booking details will
              be shared with you.
            </p>
          </div>

          {/* Section 6: Welcome Message */}
          <div className="cash-success-welcome">
            <p className="cash-success-welcome-text">
              We look forward to welcoming you to Seven Mirrors.
            </p>
          </div>

          {/* Section 7: Action Buttons */}
          <div className="cash-success-actions">
            <Link href={viewBookingHref} className="cash-success-view-btn">
              View Booking →
            </Link>
            <Link href="/" className="cash-success-home-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
