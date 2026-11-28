"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import "@/styles/booking-success/online-success.css";

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

export default function OnlineBookingSuccess() {
  const searchParams = useSearchParams();
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    let stored = null;
    let checkoutStored = null;
    try {
      const raw = sessionStorage.getItem("seven_mirrors_online_booking_success");
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
        paymentMethod: stored?.paymentMethod || "Paid Online",
        status: qStatus || stored?.status || "Confirmed",
        propertyId: qPropertyId || stored?.propertyId || checkoutStored?.propertyId || ""
      });
    }
  }, [searchParams]);

  const viewBookingHref = bookingInfo?.propertyId
    ? `/property/${bookingInfo.propertyId}`
    : "/confirm-and-pay";

  return (
    <div className="online-success-shell">
      {/* White Header with Centered Logo & Thin Bottom Border */}
      <header className="online-success-header">
        <Link
          href="/"
          className="online-success-logo-link"
          aria-label="Seven Mirror Stays Home"
        >
          <Image
            src="/logo.png"
            alt="Seven Mirror Stays - Luxury Homes"
            width={220}
            height={48}
            priority
            className="online-success-logo-img"
          />
        </Link>
      </header>

      {/* Main Centered Success Card */}
      <main className="online-success-main">
        <div className="online-success-card">
          {/* Section 1: Heading */}
          <div className="online-success-top">
            <h1 className="online-success-heading">Booking Confirmed! 🎉</h1>
            <p className="online-success-subtext">
              Your payment was successful and your stay has been confirmed.
            </p>
          </div>

          {/* Section 2: Green Success Banner */}
          <div className="online-success-banner">
            <div className="online-success-check-circle">
              <img
                src="/images/icons/cash-success-check.png"
                alt="Confirmed"
                className="online-success-check-icon"
              />
            </div>
            <p className="online-success-booking-id">
              Booking ID: {bookingInfo?.bookingId ? `#${bookingInfo.bookingId}` : "Unavailable"}
            </p>
            <p className="online-success-banner-note">
              We&apos;ve sent your booking confirmation and payment receipt to your registered
              email address.
            </p>
          </div>

          {/* Section 3: Your Stay */}
          <section className="online-success-stay-section" aria-label="Your Stay">
            <h2 className="online-success-stay-heading">Your Stay</h2>
            <div className="online-success-stay-grid">
              <div className="online-success-stay-row">
                <span className="online-success-stay-label">Dates</span>
                <span className="online-success-stay-value">
                  {bookingInfo?.dates || "—"}
                </span>
              </div>
              <div className="online-success-stay-row">
                <span className="online-success-stay-label">Check-in</span>
                <span className="online-success-stay-value">
                  {bookingInfo?.checkInTime || "2:00 pm – 4:00 pm"}
                </span>
              </div>
              <div className="online-success-stay-row">
                <span className="online-success-stay-label">Payment</span>
                <span className="online-success-stay-value">
                  {bookingInfo?.paymentMethod || "Paid Online"}
                </span>
              </div>
              <div className="online-success-stay-row">
                <span className="online-success-stay-label">Status</span>
                <span className="online-success-stay-value">
                  ✓ {bookingInfo?.status || "Confirmed"}
                </span>
              </div>
            </div>
          </section>

          {/* Section 4: Arrival & Welcome Message */}
          <div className="online-success-welcome">
            <p className="online-success-welcome-text">
              Please arrive at the property on your check-in date. We look forward to
              welcoming you to Seven Mirrors.
            </p>
          </div>

          {/* Section 5: Action Buttons */}
          <div className="online-success-actions">
            <Link href={viewBookingHref} className="online-success-view-btn">
              View Booking →
            </Link>
            <Link href="/" className="online-success-home-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
