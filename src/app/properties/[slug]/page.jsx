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
import { getPropertyBySlug } from "@/lib/properties";

export const instant = false;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || resolvedParams?.id || "";
  const property = await getPropertyBySlug(slug);

  return {
    title: property?.title
      ? `${property.title} | Seven Mirror Stays`
      : "Property Details | Seven Mirror Stays",
    description:
      property?.desc ||
      property?.tagline ||
      "Discover handpicked private stays across Jaipur and Gurugram by Seven Mirror Stays.",
  };
}

async function PropertyContent({ paramsPromise }) {
  const resolvedParams = await paramsPromise;
  const slug = resolvedParams?.slug || resolvedParams?.id || "";
  const property = await getPropertyBySlug(slug);

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
