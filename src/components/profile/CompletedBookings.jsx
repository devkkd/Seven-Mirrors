"use client";

import React from "react";
import CompletedBookingCard from "@/components/profile/CompletedBookingCard";

export default function CompletedBookings({ bookings = [] }) {
  if (!bookings.length) {
    return (
      <div className="booking-empty-state">
        No completed bookings found.
      </div>
    );
  }

  return (
    <div className="bookings-list-stack">
      {bookings.map((booking, idx) => (
        <CompletedBookingCard
          key={`${booking.bookingId}-${idx}`}
          booking={booking}
        />
      ))}
    </div>
  );
}
