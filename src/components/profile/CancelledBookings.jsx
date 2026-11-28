"use client";

import React from "react";
import BookingCard from "@/components/profile/BookingCard";

export default function CancelledBookings({ bookings = [] }) {
  if (!bookings.length) {
    return (
      <div className="booking-empty-state">
        No cancelled bookings found.
      </div>
    );
  }

  return (
    <div className="bookings-list-stack">
      {bookings.map((booking, idx) => (
        <BookingCard
          key={`${booking.bookingId}-${idx}`}
          booking={booking}
          variant="cancelled"
        />
      ))}
    </div>
  );
}

