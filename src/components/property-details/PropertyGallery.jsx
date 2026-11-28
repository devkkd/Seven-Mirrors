"use client";

import React, { useState, useEffect, useRef } from "react";
import "@/styles/property-details/property-gallery.css";

export default function PropertyGallery({ property }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Mobile-only slider state
  const [mobileSlide, setMobileSlide] = useState(0);
  const [isMobilePaused, setIsMobilePaused] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const didSwipe = useRef(false);

  // Extract images from API data or safe fallbacks
  const rawImages = property?.images || property?.gallery || [];
  const imageList = rawImages.length > 0
    ? rawImages.map((img, i) => {
      if (typeof img === "string") {
        return { url: img, title: `Property Photo ${i + 1}`, caption: "" };
      }
      return {
        url: img.url || img.src || img.image || "/images/property/main-living.jpg",
        title: img.title || `Photo ${i + 1}`,
        caption: img.caption || ""
      };
    })
    : [
      { url: "/images/property/main-living.jpg", title: "Living Room with Red Arched Door" },
      { url: "/images/property/bedroom.png", title: "Master Bedroom Suite" },
      { url: "/images/property/dining-detail.png", title: "Dining Table & Chandelier" },
      { url: "/images/property/dining-hall.png", title: "Dining Hall & Lotus Mural" },
      { url: "/images/property/lounge.png", title: "Vintage Lounge & Striped Armchairs" }
    ];

  const mainImage = imageList[0];
  const sideImages = imageList.slice(1, 5);
  const totalCount = imageList.length;
  const moreCount = Math.max(0, totalCount - 5);

  const openLightbox = (idx) => {
    setPhotoIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen]);

  // Automatic 3s slider for mobile view
  useEffect(() => {
    if (isMobilePaused || imageList.length <= 1) return;
    const intervalId = setInterval(() => {
      setMobileSlide((prev) => (prev + 1) % imageList.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [isMobilePaused, imageList.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    didSwipe.current = false;
    setIsMobilePaused(true);
  };

  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      didSwipe.current = true;
      if (diffX > 0) {
        setMobileSlide((prev) => (prev + 1) % imageList.length);
      } else {
        setMobileSlide((prev) => (prev - 1 + imageList.length) % imageList.length);
      }
    }
    setIsMobilePaused(false);
  };

  return (
    <section className="property-gallery-container" aria-label="Property Images">
      {/* Desktop / Tablet 5-Image Grid: 1 large on left, 4 smaller on right */}
      <div className="gallery-grid-wrapper">
        {/* Large Main Image on Left */}
        <div
          className="gallery-main-image-box"
          onClick={() => openLightbox(0)}
          role="button"
          tabIndex={0}
        >
          <img
            src={mainImage?.url}
            alt={mainImage?.title || property?.title || "Property Main View"}
            className="gallery-img main-large"
          />
        </div>

        {/* 4 Smaller Images on Right in 2x2 Grid */}
        <div className="gallery-side-quad">
          {sideImages.map((img, idx) => {
            const isLast = idx === 3;
            return (
              <div
                key={idx}
                className={`gallery-side-item side-item-${idx}`}
                onClick={() => openLightbox(idx + 1)}
                role="button"
                tabIndex={0}
              >
                <img
                  src={img.url}
                  alt={img.title || `Property View ${idx + 2}`}
                  className="gallery-img side-thumb"
                />

                {/* Pill button on the bottom right image matching screenshot */}
                {isLast && (
                  <button
                    type="button"
                    className="gallery-more-photos-pill"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(0);
                    }}
                  >
                    <span>
                      {moreCount > 0
                        ? `${moreCount} More Photos →`
                        : `View All ${totalCount} Photos →`}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile-Only Automatic Image Slider */}
      <div
        className="mobile-gallery-slider"
        onMouseEnter={() => setIsMobilePaused(true)}
        onMouseLeave={() => setIsMobilePaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => setIsMobilePaused(false)}
      >
        <div
          className="mobile-slider-track"
          style={{ transform: `translateX(-${mobileSlide * 100}%)` }}
        >
          {imageList.map((img, idx) => (
            <div
              key={idx}
              className="mobile-slide-item"
              onClick={() => {
                if (didSwipe.current) {
                  didSwipe.current = false;
                  return;
                }
                openLightbox(idx);
              }}
              role="button"
              tabIndex={0}
            >
              <img
                src={img.url}
                alt={img.title || `Property photo ${idx + 1}`}
                className="mobile-slide-img"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Indicator Dots */}
        {imageList.length > 1 && (
          <div className="mobile-slider-dots">
            {imageList.map((_, dIdx) => (
              <button
                key={dIdx}
                type="button"
                className={`mobile-slider-dot ${dIdx === mobileSlide ? "is-active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileSlide(dIdx);
                }}
                aria-label={`Go to slide ${dIdx + 1}`}
              />
            ))}
          </div>
        )}

        {/* View All Photos Pill */}
        <button
          type="button"
          className="gallery-more-photos-pill mobile-only-pill"
          onClick={(e) => {
            e.stopPropagation();
            openLightbox(mobileSlide);
          }}
        >
          <span>
            {moreCount > 0
              ? `${moreCount} More Photos →`
              : `View All ${totalCount} Photos →`}
          </span>
        </button>
      </div>

      {/* Lightbox / Modal */}
      {lightboxOpen && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <span className="lightbox-counter">
                {photoIndex + 1} / {imageList.length}
              </span>
              <span className="lightbox-photo-name">{imageList[photoIndex]?.title}</span>
              <button
                type="button"
                className="lightbox-close-icon"
                onClick={closeLightbox}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="lightbox-stage">
              <button
                type="button"
                className="lightbox-nav-btn prev"
                onClick={prevPhoto}
                aria-label="Previous"
              >
                ‹
              </button>

              <div className="lightbox-img-center">
                <img
                  src={imageList[photoIndex]?.url}
                  alt={imageList[photoIndex]?.title || "Gallery preview"}
                  className="lightbox-full-img"
                />
              </div>

              <button
                type="button"
                className="lightbox-nav-btn next"
                onClick={nextPhoto}
                aria-label="Next"
              >
                ›
              </button>
            </div>

            <div className="lightbox-thumbnails-bar">
              {imageList.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  className={`lightbox-mini-thumb ${i === photoIndex ? "active-thumb" : ""}`}
                  onClick={() => setPhotoIndex(i)}
                >
                  <img src={t.url} alt={`Thumb ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
