"use client";

import React from "react";
import BookingCard from "@/components/profile/BookingCard";

export default function UpcomingBookings({ bookings = [], onCancelBooking }) {
  if (!bookings.length) {
    return (
      <div className="booking-empty-state">
        No upcoming bookings found.
      </div>
    );
  }

  return (
    <div className="bookings-list-stack">
      {bookings.map((booking, idx) => (
        <BookingCard
          key={`${booking.bookingId}-${idx}`}
          booking={booking}
          variant="upcoming"
          onCancelClick={onCancelBooking}
        />
      ))}
    </div>
  );
}

