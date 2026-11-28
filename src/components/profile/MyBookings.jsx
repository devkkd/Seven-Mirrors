"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BookingTabs from "@/components/profile/BookingTabs";
import UpcomingBookings from "@/components/profile/UpcomingBookings";
import CompletedBookings from "@/components/profile/CompletedBookings";
import CancelledBookings from "@/components/profile/CancelledBookings";
import CancelBookingView from "@/components/profile/CancelBookingView";

// Sample frontend demonstration data matching the reference UI
const SAMPLE_BOOKINGS = {
  upcoming: [
    {
      bookingId: "SM123456",
      propertyName: "Rossiero",
      description: "Private 4-Bedroom Villa. 4 Bedrooms · Private garden · Central location.",
      address: "S-22, Durgadas Colony, Ashok Marg, Ashok Nagar, Jaipur, Rajasthan, India",
      image: "/images/property/main-living.jpg",
      morePhotosLabel: "24 More Photos →",
      statusBadge: "Upcoming",
      checkInDate: "24 Sep 2026",
      checkInTime: "2:00 PM",
      checkOutDate: "26 Sep 2026",
      checkOutTime: "11:00 AM",
      nightsLabel: "2 Nights",
      guestsLabel: "2 Guests",
      totalAmount: "₹19,000.00",
      paymentMethod: "Paid Online",
      paymentStatus: "Paid"
    },
    {
      bookingId: "SM123456",
      propertyName: "Rossiero",
      description: "Private 4-Bedroom Villa. 4 Bedrooms · Private garden · Central location.",
      address: "S-22, Durgadas Colony, Ashok Marg, Ashok Nagar, Jaipur, Rajasthan, India",
      image: "/images/property/main-living.jpg",
      morePhotosLabel: "24 More Photos →",
      statusBadge: "Upcoming",
      checkInDate: "24 Sep 2026",
      checkInTime: "2:00 PM",
      checkOutDate: "26 Sep 2026",
      checkOutTime: "11:00 AM",
      nightsLabel: "2 Nights",
      guestsLabel: "2 Guests",
      totalAmount: "₹19,000.00",
      paymentMethod: "Pay at Stay",
      paymentStatus: "Pay on Arrival"
    }
  ],
  completed: [
    {
      bookingId: "SM123456",
      propertyName: "Rossiero",
      description: "Private 4-Bedroom Villa. 4 Bedrooms · Private garden · Central location.",
      address: "S-22, Durgadas Colony, Ashok Marg, Ashok Nagar, Jaipur, Rajasthan, India",
      image: "/images/property/main-living.jpg",
      morePhotosLabel: "24 More Photos →",
      statusBadge: "Completed",
      checkInDate: "24 Sep 2026",
      checkInTime: "2:00 PM",
      checkOutDate: "26 Sep 2026",
      checkOutTime: "11:00 AM",
      nightsLabel: "2 Nights",
      guestsLabel: "2 Guests",
      totalAmount: "₹19,000.00",
      paymentMethod: "Paid Online",
      paymentStatus: "Paid"
    }
  ],
  cancelled: [
    {
      bookingId: "SM123456",
      propertyName: "Rossiero",
      description: "Private 4-Bedroom Villa. 4 Bedrooms · Private garden · Central location.",
      address: "S-22, Durgadas Colony, Ashok Marg, Ashok Nagar, Jaipur, Rajasthan, India",
      image: "/images/property/main-living.jpg",
      morePhotosLabel: "24 More Photos →",
      statusBadge: "Cancelled",
      checkInDate: "24 Sep 2026",
      checkInTime: "2:00 PM",
      checkOutDate: "26 Sep 2026",
      checkOutTime: "11:00 AM",
      nightsLabel: "2 Nights",
      guestsLabel: "2 Guests",
      totalAmount: "₹19,000.00",
      paymentMethod: "Paid Online",
      paymentStatus: "Refund"
    }
  ]
};

export default function MyBookings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingList, setUpcomingList] = useState(SAMPLE_BOOKINGS.upcoming);
  const [cancelledList, setCancelledList] = useState(SAMPLE_BOOKINGS.cancelled);
  const [cancellingBooking, setCancellingBooking] = useState(null);

  const handleConfirmCancel = (targetBooking) => {
    try {
      sessionStorage.setItem(
        "seven_mirrors_cancelled_booking_success",
        JSON.stringify(targetBooking)
      );
    } catch (err) {
      // ignore storage errors
    }
    setUpcomingList((prev) =>
      prev.filter((item) => item !== targetBooking)
    );
    setCancelledList((prev) => [
      {
        ...targetBooking,
        statusBadge: "Cancelled",
        paymentStatus:
          targetBooking.paymentMethod === "Paid Online" ? "Refund" : "Cancelled"
      },
      ...prev
    ]);
    setCancellingBooking(null);
    router.push("/booking-cancelled");
  };

  if (cancellingBooking) {
    return (
      <CancelBookingView
        booking={cancellingBooking}
        onBack={() => setCancellingBooking(null)}
        onConfirmCancel={handleConfirmCancel}
      />
    );
  }

  return (
    <section className="profile-main-content" aria-label="My Bookings">
      <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "upcoming" && (
        <UpcomingBookings
          bookings={upcomingList}
          onCancelBooking={(booking) => setCancellingBooking(booking)}
        />
      )}
      {activeTab === "completed" && (
        <CompletedBookings bookings={SAMPLE_BOOKINGS.completed} />
      )}
      {activeTab === "cancelled" && (
        <CancelledBookings bookings={cancelledList} />
      )}
    </section>
  );
}

