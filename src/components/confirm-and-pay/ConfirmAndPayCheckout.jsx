"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LoginSignupModal from "@/components/confirm-and-pay/LoginSignupModal";
import PaymentMethodStep from "@/components/confirm-and-pay/PaymentMethodStep";
import "@/styles/confirm-and-pay/confirm-and-pay.css";

function formatDisplayDateRange(checkIn, checkOut) {
  if (!checkIn || !checkOut) return "Select check-in & check-out dates";
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return `${checkIn} – ${checkOut}`;
  }

  const sameMonthYear =
    start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

  if (sameMonthYear) {
    return `${start.getDate()}–${end.getDate()} ${monthNames[start.getMonth()]} ${start.getFullYear()}`;
  }

  return `${start.getDate()} ${monthNames[start.getMonth()]} – ${end.getDate()} ${monthNames[end.getMonth()]} ${end.getFullYear()}`;
}

export default function ConfirmAndPayCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Step 2: Payment method selection
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Booking & Property State
  const [booking, setBooking] = useState({
    propertyId: "",
    title: "Cozy Loft 201 | 2 BHK",
    propertyType: "Entire Flat",
    specs: { guests: 6, bedrooms: 2, beds: 2, bathrooms: 2 },
    location: { area: "Malviya Nagar, Jaipur", city: "Jaipur", country: "India" },
    image: "/images/property/main-living.jpg",
    basePrice: 6000,
    currencySymbol: "₹",
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1
  });

  // Inline editors on Summary Card
  const [editingDates, setEditingDates] = useState(false);
  const [editingGuests, setEditingGuests] = useState(false);
  const [showFullPolicy, setShowFullPolicy] = useState(false);

  // Hydrate booking from sessionStorage + URL query params (+ API fallback if propertyId exists)
  useEffect(() => {
    let loaded = null;
    try {
      const raw = sessionStorage.getItem("seven_mirrors_checkout_booking");
      if (raw) {
        loaded = JSON.parse(raw);
      }
    } catch (err) {
      // ignore storage errors
    }

    const qPropertyId = searchParams.get("propertyId") || loaded?.propertyId || "";
    const qCheckIn = searchParams.get("checkIn") ?? loaded?.checkIn ?? "";
    const qCheckOut = searchParams.get("checkOut") ?? loaded?.checkOut ?? "";
    const qGuests = Number(searchParams.get("guests") || loaded?.guests || 2);
    const qRooms = Number(searchParams.get("rooms") || loaded?.rooms || 1);

    if (loaded) {
      setBooking((prev) => ({
        ...prev,
        ...loaded,
        propertyId: qPropertyId,
        checkIn: qCheckIn,
        checkOut: qCheckOut,
        guests: Number.isNaN(qGuests) ? prev.guests : qGuests,
        rooms: Number.isNaN(qRooms) ? prev.rooms : qRooms
      }));
    } else if (qPropertyId) {
      setBooking((prev) => ({
        ...prev,
        propertyId: qPropertyId,
        checkIn: qCheckIn,
        checkOut: qCheckOut,
        guests: Number.isNaN(qGuests) ? prev.guests : qGuests,
        rooms: Number.isNaN(qRooms) ? prev.rooms : qRooms
      }));

      // Fetch property details if opened directly with propertyId
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      fetch(`${backendUrl}/api/properties/${qPropertyId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          const prop = data?.property || data?.data || data;
          if (!prop) return;
          const firstImg =
            Array.isArray(prop.images) && prop.images.length > 0
              ? typeof prop.images[0] === "string"
                ? prop.images[0]
                : prop.images[0]?.url || prop.images[0]?.src
              : "/images/property/main-living.jpg";

          setBooking((prev) => ({
            ...prev,
            title: prop.title || prev.title,
            propertyType: prop.propertyType || prev.propertyType,
            specs: prop.specs || prev.specs,
            location: prop.location || prev.location,
            image: firstImg || prev.image,
            basePrice: prop.pricing?.basePrice || prop.price || prev.basePrice,
            currencySymbol: prop.pricing?.currencySymbol || prev.currencySymbol
          }));
        })
        .catch(() => {
          // keep fallback state
        });
    }
    if (searchParams.get("openLogin") === "true") {
      setAuthModalOpen(true);
    }
    if (searchParams.get("step") === "2") {
      setActiveStep(2);
    }
  }, [searchParams]);

  // Calculate nights, subtotal, discount, taxes, and total dynamically
  let nights = 1;
  if (booking.checkIn && booking.checkOut) {
    const start = new Date(booking.checkIn);
    const end = new Date(booking.checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (diff > 0) nights = diff;
  }

  const nightlyRate = Number(booking.basePrice) || 6000;
  const subtotal = nightlyRate * nights;
  const discountAmount =
    typeof booking.discount === "number" && booking.discount >= 0
      ? booking.discount
      : Math.round(subtotal * (nights >= 3 ? 0.15 : 0.1));
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxes = Math.round(taxableAmount * 0.12);
  const totalAmount = taxableAmount + taxes;

  const locationDisplay = [
    booking.location?.area,
    booking.location?.city
  ]
    .filter(Boolean)
    .filter((item, idx, arr) => arr.indexOf(item) === idx)
    .join(", ")
    .toUpperCase() || "JAIPUR, INDIA";

  const propertyMetaParts = [
    booking.propertyType || "Luxury Stay",
    booking.specs?.bedrooms ? `${booking.specs.bedrooms} Bedrooms` : null,
    booking.specs?.beds ? `${booking.specs.beds} Beds` : null
  ].filter(Boolean);

  const handleCompleteStep = (stepNumber) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber) ? prev : [...prev, stepNumber]
    );
    if (stepNumber < 3) {
      setActiveStep(stepNumber + 1);
    }
  };

  const maxUnlockedStep = Math.min(
    3,
    (completedSteps.length > 0 ? Math.max(...completedSteps) : 0) + 1
  );

  const handleSelectStep = (stepNumber) => {
    if (stepNumber <= maxUnlockedStep) {
      setActiveStep(stepNumber);
    }
  };

  const todayIso = new Date().toISOString().split("T")[0];

  return (
    <div className="checkout-page-shell">
      {/* Checkout Header */}
      <header className="checkout-header">
        <Link href="/" className="checkout-logo-link" aria-label="Seven Mirror Stays Home">
          <img
            src="/logo.png"
            alt="Seven Mirror Stays - Luxury Homes"
            className="checkout-logo-img"
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="checkout-main-container">
        <div className="checkout-two-col-grid">
          {/* Left Column: Back Heading & 3 Booking Steps */}
          <div className="checkout-left-col">
            <div className="checkout-back-row">
              <button
                type="button"
                className="checkout-back-btn"
                onClick={() => {
                  if (activeStep === 2) {
                    setActiveStep(1);
                  } else {
                    router.back();
                  }
                }}
                aria-label="Go back"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <h1 className="checkout-heading">Confirm and pay</h1>
            </div>

            {activeStep === 2 ? (
              <PaymentMethodStep
                onRazorpaySuccess={(responseData) => {
                  const actualBookingId =
                    responseData?.bookingId ||
                    responseData?.booking?._id ||
                    responseData?.booking?.id ||
                    responseData?._id ||
                    responseData?.id ||
                    "";
                  const actualStatus =
                    responseData?.status ||
                    responseData?.booking?.status ||
                    "Confirmed";
                  const successPayload = {
                    bookingId: actualBookingId,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    checkInTime: responseData?.checkInTime || "2:00 pm – 4:00 pm",
                    paymentMethod: "Paid Online",
                    status: actualStatus,
                    propertyId: booking.propertyId
                  };
                  try {
                    sessionStorage.setItem(
                      "seven_mirrors_online_booking_success",
                      JSON.stringify(successPayload)
                    );
                  } catch (err) {
                    // ignore storage errors
                  }
                  const params = new URLSearchParams();
                  if (actualBookingId) params.set("bookingId", String(actualBookingId));
                  if (actualStatus) params.set("status", String(actualStatus));
                  if (booking.propertyId) params.set("propertyId", String(booking.propertyId));
                  router.push(`/booking-success/online?${params.toString()}`);
                }}
                onCashBookingSuccess={(responseData) => {
                  const actualBookingId =
                    responseData?.bookingId ||
                    responseData?.booking?._id ||
                    responseData?.booking?.id ||
                    responseData?._id ||
                    responseData?.id ||
                    "";
                  const actualStatus =
                    responseData?.status ||
                    responseData?.booking?.status ||
                    "Reserved";
                  const successPayload = {
                    bookingId: actualBookingId,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    checkInTime: responseData?.checkInTime || "2:00 pm – 4:00 pm",
                    paymentMethod: "Pay at Stay",
                    status: actualStatus,
                    propertyId: booking.propertyId
                  };
                  try {
                    sessionStorage.setItem(
                      "seven_mirrors_cash_booking_success",
                      JSON.stringify(successPayload)
                    );
                  } catch (err) {
                    // ignore storage errors
                  }
                  const params = new URLSearchParams();
                  if (actualBookingId) params.set("bookingId", String(actualBookingId));
                  if (actualStatus) params.set("status", String(actualStatus));
                  if (booking.propertyId) params.set("propertyId", String(booking.propertyId));
                  router.push(`/booking-success/cash?${params.toString()}`);
                }}
              />
            ) : (
            <div className="checkout-steps-stack">
              {/* Step 1: Log in or sign up */}
              <div
                className={`checkout-step-card ${
                  activeStep === 1 ? "is-active" : completedSteps.includes(1) ? "is-completed" : ""
                }`}
                onClick={() => handleSelectStep(1)}
              >
                <div className="checkout-step-header">
                  <h2 className="checkout-step-title">
                    1. Log in or sign up
                    {loggedInUser?.value ? ` (${loggedInUser.value})` : ""}
                  </h2>
                  {activeStep === 1 ? (
                    <button
                      type="button"
                      className="checkout-continue-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStep(1);
                        setAuthModalOpen(true);
                      }}
                    >
                      Continue →
                    </button>
                  ) : completedSteps.includes(1) ? (
                    <button
                      type="button"
                      className="summary-change-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStep(1);
                        setAuthModalOpen(true);
                      }}
                    >
                      Change
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Step 2: Add a payment method */}
              <div
                className={`checkout-step-card ${
                  activeStep === 2 ? "is-active" : completedSteps.includes(2) ? "is-completed" : ""
                }`}
                onClick={() => handleSelectStep(2)}
              >
                <div className="checkout-step-header">
                  <h2 className="checkout-step-title">2. Add a payment method</h2>
                  {activeStep === 2 ? (
                    <button
                      type="button"
                      className="checkout-continue-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompleteStep(2);
                      }}
                    >
                      Continue →
                    </button>
                  ) : completedSteps.includes(2) ? (
                    <button
                      type="button"
                      className="summary-change-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStep(2);
                      }}
                    >
                      Change
                    </button>
                  ) : null}
                </div>

                {activeStep === 2 && (
                  <div className="checkout-step-body" onClick={(e) => e.stopPropagation()}>
                    <div className="checkout-payment-options">
                      {[
                        { id: "upi", label: "UPI (Google Pay, PhonePe, Paytm)" },
                        { id: "card", label: "Credit or Debit Card" },
                        { id: "netbanking", label: "Net Banking" }
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          className={`checkout-payment-option ${
                            paymentMethod === opt.id ? "selected" : ""
                          }`}
                        >
                          <span className="checkout-payment-option-left">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={opt.id}
                              checked={paymentMethod === opt.id}
                              onChange={() => setPaymentMethod(opt.id)}
                            />
                            <span>{opt.label}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Proceed to payment */}
              <div
                className={`checkout-step-card ${
                  activeStep === 3 ? "is-active" : completedSteps.includes(3) ? "is-completed" : ""
                }`}
                onClick={() => handleSelectStep(3)}
              >
                <div className="checkout-step-header">
                  <h2 className="checkout-step-title">3. Proceed to payment</h2>
                </div>

                {activeStep === 3 && (
                  <div className="checkout-step-body">
                    <p className="checkout-step-desc">
                      Review your stay details for <strong>{booking.title}</strong> ({nights} night
                      {nights > 1 ? "s" : ""}, {booking.guests} Guest, {booking.rooms}+ Rooms) — Total{" "}
                      <strong>
                        {booking.currencySymbol}
                        {totalAmount.toLocaleString("en-IN")}
                      </strong>
                      .
                    </p>
                    <div className="checkout-payment-note">
                      Live payment gateway integration (Razorpay / Stripe) will be connected here to process real transactions securely.
                    </div>
                  </div>
                )}
              </div>
            </div>
            )}
          </div>

          {/* Right Column: Booking Summary Card */}
          <aside className="checkout-right-col" aria-label="Booking Summary">
            <div className="summary-card">
              {/* Property Row */}
              <div className="summary-property-row">
                <img
                  src={booking.image || "/images/property/main-living.jpg"}
                  alt={booking.title}
                  className="summary-property-thumb"
                />
                <div className="summary-property-info">
                  <h2 className="summary-property-title">{booking.title}</h2>
                  <p className="summary-property-meta">
                    {propertyMetaParts.join(" · ")}
                  </p>
                  <p className="summary-property-location">{locationDisplay}</p>
                </div>
              </div>

              {/* Cancellation Policy */}
              <p className="summary-policy-line">
                Cancel before check-in for a partial refund.{" "}
                <button
                  type="button"
                  className="summary-policy-link"
                  onClick={() => setShowFullPolicy((prev) => !prev)}
                >
                  Full policy.
                </button>
              </p>

              {showFullPolicy && (
                <div className="summary-policy-drawer">
                  Free cancellation up to 48 hours before check-in. Cancellations within 48 hours of check-in are eligible for a 50% refund of the nightly rate, excluding service fees.
                </div>
              )}

              <div className="summary-divider" />

              {/* Dates Row */}
              <div>
                <div className="summary-detail-row">
                  <div>
                    <div className="summary-detail-label">Dates</div>
                    <div className="summary-detail-value">
                      {formatDisplayDateRange(booking.checkIn, booking.checkOut)}
                    </div>
                    <div className="summary-detail-sub">2:00 pm – 4:00 pm check-in</div>
                  </div>
                  <button
                    type="button"
                    className="summary-change-btn"
                    onClick={() => setEditingDates((prev) => !prev)}
                  >
                    {editingDates ? "Close" : "Change"}
                  </button>
                </div>

                {editingDates && (
                  <div className="summary-inline-editor">
                    <div className="summary-inline-dates-grid">
                      <div className="checkout-field-group">
                        <label className="checkout-field-label" htmlFor="summary-checkin">
                          Check-In
                        </label>
                        <input
                          id="summary-checkin"
                          type="date"
                          min={todayIso}
                          value={booking.checkIn}
                          onChange={(e) =>
                            setBooking((prev) => ({ ...prev, checkIn: e.target.value }))
                          }
                          className="checkout-text-input"
                        />
                      </div>
                      <div className="checkout-field-group">
                        <label className="checkout-field-label" htmlFor="summary-checkout">
                          Check-Out
                        </label>
                        <input
                          id="summary-checkout"
                          type="date"
                          min={booking.checkIn || todayIso}
                          value={booking.checkOut}
                          onChange={(e) =>
                            setBooking((prev) => ({ ...prev, checkOut: e.target.value }))
                          }
                          className="checkout-text-input"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="summary-inline-done-btn"
                      onClick={() => setEditingDates(false)}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              <div className="summary-divider" />

              {/* Guests Row */}
              <div>
                <div className="summary-detail-row">
                  <div>
                    <div className="summary-detail-label">Guests</div>
                    <div className="summary-detail-value">
                      {booking.guests} Guest, {booking.rooms}+ Rooms
                    </div>
                  </div>
                  <button
                    type="button"
                    className="summary-change-btn"
                    onClick={() => setEditingGuests((prev) => !prev)}
                  >
                    {editingGuests ? "Close" : "Change"}
                  </button>
                </div>

                {editingGuests && (
                  <div className="summary-inline-editor">
                    <div className="summary-inline-guest-row">
                      <span className="checkout-field-label">Guests</span>
                      <div className="summary-counter-controls">
                        <button
                          type="button"
                          className="summary-counter-btn"
                          onClick={() =>
                            setBooking((prev) => ({
                              ...prev,
                              guests: Math.max(1, prev.guests - 1)
                            }))
                          }
                        >
                          -
                        </button>
                        <span>{booking.guests}</span>
                        <button
                          type="button"
                          className="summary-counter-btn"
                          onClick={() =>
                            setBooking((prev) => ({
                              ...prev,
                              guests: Math.min(12, prev.guests + 1)
                            }))
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="summary-inline-guest-row">
                      <span className="checkout-field-label">Rooms</span>
                      <div className="summary-counter-controls">
                        <button
                          type="button"
                          className="summary-counter-btn"
                          onClick={() =>
                            setBooking((prev) => ({
                              ...prev,
                              rooms: Math.max(1, prev.rooms - 1)
                            }))
                          }
                        >
                          -
                        </button>
                        <span>{booking.rooms}</span>
                        <button
                          type="button"
                          className="summary-counter-btn"
                          onClick={() =>
                            setBooking((prev) => ({
                              ...prev,
                              rooms: Math.min(6, prev.rooms + 1)
                            }))
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="summary-inline-done-btn"
                      onClick={() => setEditingGuests(false)}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              <div className="summary-divider" />

              {/* Price Details */}
              <div>
                <h3 className="summary-price-heading">Price Details</h3>
                <div className="summary-price-rows">
                  <div className="summary-price-line">
                    <span>
                      {nights} night{nights > 1 ? "s" : ""} x {booking.currencySymbol}
                      {nightlyRate.toLocaleString("en-IN")}
                    </span>
                    <span>
                      {booking.currencySymbol}
                      {subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="summary-price-line">
                      <span>Offer Discount</span>
                      <span>
                        -{booking.currencySymbol}
                        {discountAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  <div className="summary-price-line">
                    <span>Taxes</span>
                    <span>
                      {booking.currencySymbol}
                      {taxes.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="summary-divider" />

              {/* Total */}
              <div className="summary-total-row">
                <span>Total (INR)</span>
                <span>
                  {booking.currencySymbol}
                  {totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Green Discount Applied Notification */}
            {discountAmount > 0 && (
              <div className="summary-discount-banner">
                {booking.currencySymbol}
                {discountAmount.toLocaleString("en-IN")} discount applied
              </div>
            )}
          </aside>
        </div>
      </main>

      <LoginSignupModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(userInfo) => {
          setLoggedInUser(userInfo);
          setAuthModalOpen(false);
          handleCompleteStep(1);
        }}
      />
    </div>
  );
}
