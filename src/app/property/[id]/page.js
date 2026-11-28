import { Suspense } from "react";
import PropertyGallery from "@/components/property-details/PropertyGallery";
import PropertyHero from "@/components/property-details/PropertyHero";
import PropertyOverview from "@/components/property-details/PropertyOverview";
import PropertyHighlights from "@/components/property-details/PropertyHighlights";
import ContactBanner from "@/components/property-details/ContactBanner";
import CancellationPolicy from "@/components/property-details/CancellationPolicy";
import TheSpace from "@/components/property-details/TheSpace";
import KeyFeaturesAmenities from "@/components/property-details/KeyFeaturesAmenities";
import PropertyReviews from "@/components/property-details/PropertyReviews";
import WhereYoullBe from "@/components/property-details/WhereYoullBe";
import GuestAccess from "@/components/property-details/GuestAccess";
import DiscoverPlaces from "@/components/property-details/DiscoverPlaces";
import BookingCard from "@/components/property-details/BookingCard";

export const instant = false;

async function PropertyContent({ paramsPromise }) {
  const { id } = await paramsPromise;
  let property = null;

  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/properties/${id}`, {
      cache: "no-store"
    });

    if (res.ok) {
      const data = await res.json();
      property = data.property || data.data || data;
    }
  } catch (error) {
    // API not connected yet, fallback to default structure
  }

  if (!property) {
    property = {
      _id: id || "6745a1b2c3d4e5f67890abcd",
      title: "Cozy Loft 201 | 2 BHK",
      price: 6000,
      rating: "4.73",
      reviewsCount: 15,
      propertyType: "Entire Flat",
      location: {
        type: "ENTIRE RENTAL UNIT",
        area: "Malviya Nagar, Jaipur",
        city: "Jaipur",
        country: "India"
      },
      host: {
        summary: "Hosted by Seven Mirror Stays | 7 Years Hosting"
      },
      specs: {
        guests: 6,
        bedrooms: 2,
        beds: 2,
        bathrooms: 2
      },
      images: [
        { url: "/images/property/main-living.jpg", title: "Living Room with Red Arched Door" },
        { url: "/images/property/bedroom.png", title: "Master Bedroom Suite" },
        { url: "/images/property/dining-detail.png", title: "Dining Table & Tableware" },
        { url: "/images/property/dining-hall.png", title: "Dining Hall & Lotus Wall Mural" },
        { url: "/images/property/lounge.png", title: "Living Lounge with Striped Armchairs" }
      ]
    };
  }

  return (
    <main className="property-details-page-root bg-white min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      {/* Section 1: Property Image Gallery */}
      <PropertyGallery property={property} />

      {/* Section 2: Property Navigation Tabs */}
      <PropertyHero />

      {/* Section 3: Main Two-Column Content Layout */}
      <div className="property-main-two-column">
        {/* Left Side: Property Information, Highlights, Contact Banner, Cancellation Policy */}
        <div className="property-left-column">
          <PropertyOverview property={property} />
          <PropertyHighlights property={property} />
          <ContactBanner property={property} />
          <CancellationPolicy property={property} />
          <TheSpace property={property} />
          <KeyFeaturesAmenities property={property} />
        </div>

        {/* Right Side: Sticky Booking / Price Card */}
        <div className="property-right-column">
          <BookingCard property={property} />
        </div>
      </div>

      {/* Section 4: Reviews */}
      <PropertyReviews property={property} />

      {/* Section 5: Where You'll Be (Location & Interactive Map) */}
      <WhereYoullBe property={property} />

      {/* Section 6: Guest Access & House Rules */}
      <GuestAccess />

      {/* Section 7: Discover Places Worth Going To */}
      <DiscoverPlaces properties={property?.relatedProperties} />
    </main>
  );
}

export default function PropertyDetailsPage({ params }) {
  return (
    <Suspense fallback={<div className="property-loading-skeleton" />}>
      <PropertyContent paramsPromise={params} />
    </Suspense>
  );
}
