"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/property-details/booking-card.css";

export default function BookingCard({ property }) {
  const router = useRouter();
  const basePrice = property?.pricing?.basePrice || property?.price || 6000;
  const currencySymbol = property?.pricing?.currencySymbol || "₹";

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Calculate nights and total (matches ₹6,000 -> Total: ₹7,780 when 1 night + taxes/fees)
  let nights = 1;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (diff > 0) nights = diff;
  }

  const taxAndFees = Math.round(basePrice * nights * 0.29666); // Matches ₹7,780 for ₹6,000 base
  const totalEstimate = basePrice * nights + taxAndFees;

  const handleSelectDates = (e) => {
    e.preventDefault();
    const firstImg = Array.isArray(property?.images) && property.images.length > 0
      ? typeof property.images[0] === "string"
        ? property.images[0]
        : property.images[0]?.url || property.images[0]?.src || property.images[0]?.image
      : "/images/property/main-living.jpg";

    const bookingPayload = {
      propertyId: property?._id || property?.id || "",
      title: property?.title || "Cozy Loft 201 | 2 BHK",
      propertyType: property?.propertyType || "Entire Flat",
      specs: property?.specs || { guests: 6, bedrooms: 2, beds: 2, bathrooms: 2 },
      location: property?.location || { area: "Malviya Nagar, Jaipur", city: "Jaipur", country: "India" },
      image: firstImg,
      basePrice,
      currencySymbol,
      checkIn,
      checkOut,
      guests,
      rooms
    };

    try {
      sessionStorage.setItem("seven_mirrors_checkout_booking", JSON.stringify(bookingPayload));
    } catch (err) {
      // ignore storage errors
    }

    const params = new URLSearchParams();
    if (bookingPayload.propertyId) params.set("propertyId", bookingPayload.propertyId);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", String(guests));
    params.set("rooms", String(rooms));

    router.push(`/confirm-and-pay?${params.toString()}`);
  };

  return (
    <aside className="booking-card">
      {/* Top Price Block */}
      <div className="booking-card-header">
        <div className="booking-price-row">
          <span className="booking-price-main">
            {currencySymbol}{basePrice.toLocaleString("en-IN")}
          </span>
          <span className="booking-price-sub">/night + tax</span>
        </div>
        <div className="booking-total-line">
          Total: {currencySymbol}{totalEstimate.toLocaleString("en-IN")}
        </div>
      </div>

      {/* Form Box */}
      <form onSubmit={handleSelectDates} className="booking-card-form">
        {/* Check-in / Check-out Box */}
        <div className="booking-dates-box">
          <div className="booking-date-col">
            <label className="booking-field-label" htmlFor="check-in-input">
              Check-In
            </label>
            <input
              id="check-in-input"
              type="date"
              className="booking-date-input"
              value={checkIn}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            {!checkIn && <span className="date-placeholder-text">Add Date</span>}
          </div>

          <div className="date-arrow-separator" aria-hidden="true">→</div>

          <div className="booking-date-col">
            <label className="booking-field-label" htmlFor="check-out-input">
              Check-Out
            </label>
            <input
              id="check-out-input"
              type="date"
              className="booking-date-input"
              value={checkOut}
              min={checkIn || new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckOut(e.target.value)}
            />
            {!checkOut && <span className="date-placeholder-text">Add Date</span>}
          </div>
        </div>

        {/* Guests Selector Box */}
        <div className="booking-guests-box">
          <div
            className="guests-box-trigger"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            role="button"
            tabIndex={0}
          >
            <div>
              <div className="booking-field-label">Guests</div>
              <div className="guests-selected-value">
                {guests} Guest, {rooms}+ Rooms
              </div>
            </div>
            <svg
              className={`guests-chevron ${dropdownOpen ? "rotated" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          {dropdownOpen && (
            <div className="guests-popover-panel">
              <div className="guests-counter-item">
                <span className="counter-label">Guests</span>
                <div className="counter-btn-group">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                  >
                    -
                  </button>
                  <span>{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests(Math.min(12, guests + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="guests-counter-item">
                <span className="counter-label">Rooms</span>
                <div className="counter-btn-group">
                  <button
                    type="button"
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                  >
                    -
                  </button>
                  <span>{rooms}</span>
                  <button
                    type="button"
                    onClick={() => setRooms(Math.min(6, rooms + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="guests-done-btn"
                onClick={() => setDropdownOpen(false)}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Reserve Now Button */}
        <button type="submit" className="booking-submit-btn">
          Reserve Now →
        </button>

        {/* Bottom Guarantee Info */}
        <div className="booking-footer-note">
          97% Customer Satisfaction • 100% Secure payment
        </div>
      </form>

      {/* Simple Modal when Select Dates is clicked */}
      {modalOpen && (
        <div className="booking-confirm-backdrop" onClick={() => setModalOpen(false)}>
          <div className="booking-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Booking Summary</h3>
            <p>
              <strong>{property?.title || "Cozy Loft 201 | 2 BHK"}</strong>
            </p>
            <div className="confirm-details">
              <div>Check-In: {checkIn || "To be selected"}</div>
              <div>Check-Out: {checkOut || "To be selected"}</div>
              <div>Guests: {guests} Guest(s), {rooms}+ Room(s)</div>
              <div>
                Estimated Total: <strong>{currencySymbol}{totalEstimate.toLocaleString("en-IN")}</strong>
              </div>
            </div>
            <button
              type="button"
              className="confirm-close-btn"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
