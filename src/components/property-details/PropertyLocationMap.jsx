"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function PropertyLocationMap({
  propertyTitle,
  locationText,
  coordinates,
}) {
  const mapWrapperRef = useRef(null);

  const [zoom, setZoom] = useState(14);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const baseLocationQuery = useMemo(() => {
    if (coordinates) {
      if (typeof coordinates.lat === "number" && typeof coordinates.lng === "number") {
        return `${coordinates.lat},${coordinates.lng}`;
      }
      if (Array.isArray(coordinates) && coordinates.length === 2) {
        return `${Number(coordinates[1])},${Number(coordinates[0])}`;
      }
    }
    return locationText || propertyTitle || "Malviya Nagar, Jaipur, India";
  }, [coordinates, locationText, propertyTitle]);

  const activeQuery = submittedSearch
    ? `${submittedSearch} near ${locationText || baseLocationQuery}`
    : baseLocationQuery;

  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    activeQuery
  )}&t=m&z=${zoom}&output=embed&iwloc=near`;

  // Listen for fullscreen changes
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(20, prev + 1));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(3, prev - 1));
  };

  const handleToggleFullscreen = async () => {
    if (!mapWrapperRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await mapWrapperRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      setIsFullscreen((prev) => !prev);
    }
  };

  const handleMapSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    setSubmittedSearch(trimmed);
    if (trimmed) {
      setZoom(14);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (!val.trim() && submittedSearch) {
      setSubmittedSearch("");
    }
  };

  return (
    <div
      ref={mapWrapperRef}
      className={`where-map-wrapper ${isFullscreen ? "map-is-fullscreen" : ""}`}
    >
      {/* Top-Left Search Input Pill */}
      <form onSubmit={handleMapSearch} className="map-search-pill">
        <svg
          className="map-search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Find public transport"
          className="map-search-input"
          aria-label="Search nearby places on Google Map"
        />
      </form>

      {/* Top-Right Map Controls: Fullscreen + Zoom In/Out */}
      <div className="map-controls-stack">
        <button
          type="button"
          className="map-control-circle-btn"
          onClick={handleToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Expand Map"}
          aria-label={isFullscreen ? "Exit Fullscreen" : "Expand Map"}
        >
          {isFullscreen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 14 10 14 10 20" />
              <polyline points="20 10 14 10 14 4" />
              <line x1="14" y1="10" x2="21" y2="3" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          )}
        </button>

        <div className="map-zoom-pill">
          <button
            type="button"
            className="map-zoom-btn"
            onClick={handleZoomIn}
            title="Zoom In"
            aria-label="Zoom In"
          >
            +
          </button>
          <div className="map-zoom-divider" />
          <button
            type="button"
            className="map-zoom-btn"
            onClick={handleZoomOut}
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            −
          </button>
        </div>
      </div>

      {/* Google Map Embed */}
      <iframe
        title={propertyTitle ? `${propertyTitle} Location Map` : "Property Google Map"}
        src={googleMapsEmbedUrl}
        className="leaflet-map-canvas border-0 block"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
