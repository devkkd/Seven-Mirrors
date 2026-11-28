"use client";

import React, { useMemo } from "react";
import PropertyLocationMap from "@/components/property-details/PropertyLocationMap";
import "@/styles/property-details/where-youll-be.css";

export default function WhereYoullBe({ property }) {
  const loc = property?.location || {};

  // Build display location from actual property data
  const areaName = loc.area || "";
  const cityName = loc.city || "";
  const stateName = loc.state || "";
  const countryName = loc.country || "";

  const displayLocationTitle =
    areaName || [cityName, stateName].filter(Boolean).join(", ") || "Jaipur, India";

  // Deduplicate address parts for accurate geocoding
  const addressParts = [loc.address, loc.area, loc.city, loc.state, loc.country]
    .filter(Boolean)
    .filter((part, index, arr) => arr.indexOf(part) === index);
  const fullAddressForGeocoding = addressParts.join(", ");

  const neighborhoodDescription =
    loc.neighborhoodDescription ||
    loc.description ||
    "Planned streets lined with shops, cafes, and parks make this neighborhood a practical base for shopping and relaxed family outings.";

  // Nearby attractions & dining from property data (only rendered when available)
  const attractionCategories =
    Array.isArray(property?.nearbyCategories) && property.nearbyCategories.length > 0
      ? property.nearbyCategories
      : [
          {
            category: "Attractions",
            items: property?.nearbyAttractions || [
              { name: "Shree Bheru Nath Ji Ka Mandir", distance: "600 m" },
              { name: "Gurudwara Shri Guru Singh Sabha", distance: "800 m" }
            ]
          },
          {
            category: "Restaurant & Shopping",
            items: property?.nearbyDining || [
              { name: "Collection Point", distance: "500 m" },
              { name: "Ocean Pearls", distance: "1.6 km" }
            ]
          }
        ];

  const allAttractionsForMap = useMemo(
    () => attractionCategories.flatMap((cat) => cat.items || []),
    [property]
  );

  const coordinates =
    loc.coordinates ||
    (typeof loc.lat === "number" && typeof loc.lng === "number"
      ? { lat: loc.lat, lng: loc.lng }
      : null);

  return (
    <section id="location" className="where-youll-be-section" aria-label="Where you'll be">
      {/* Section Heading */}
      <h2 className="where-section-heading">Where you&apos;ll be</h2>

      {/* Location Title & Neighborhood Description */}
      <div className="where-location-intro">
        <h3 className="where-location-name">{displayLocationTitle}</h3>
        <p className="where-location-desc">{neighborhoodDescription}</p>
      </div>

      {/* Two-Column Layout: Left Nearby Attractions, Right Interactive Map */}
      <div className="where-two-column-grid">
        {/* Left Column */}
        <div className="where-left-col">
          {attractionCategories.map(
            (group, gIdx) =>
              group.items &&
              group.items.length > 0 && (
                <div key={gIdx} className="attraction-group-block">
                  <h4 className="attraction-group-title">{group.category}</h4>
                  <ul className="attraction-items-list">
                    {group.items.map((item, iIdx) => (
                      <li key={iIdx} className="attraction-item">
                        <div className="attraction-item-name">{item.name}</div>
                        {item.distance && (
                          <div className="attraction-item-distance">{item.distance}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>

        {/* Right Column: Interactive Map */}
        <div className="where-right-col">
          <PropertyLocationMap
            propertyTitle={property?.title}
            locationText={fullAddressForGeocoding || displayLocationTitle}
            coordinates={coordinates}
            attractions={allAttractionsForMap}
          />
        </div>
      </div>
    </section>
  );
}
