"use client";

import React, { useState } from "react";
import "@/styles/property-details/contact-banner.css";

export default function ContactBanner({ property }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-banner-section" aria-label="Contact Concierge">
      <div className="contact-banner-box">
        {/* Left Text Block with vertical line accent */}
        <div className="contact-banner-left">
          <h3 className="contact-banner-heading">
            Let&apos;s Find Your Perfect Stay
          </h3>
          <p className="contact-banner-subtext">
            Share your preferences, and we&apos;ll help you discover a getaway that feels just right.
          </p>
        </div>

        {/* Right White Pill Button */}
        <button
          type="button"
          className="contact-callback-btn"
          onClick={() => {
            setSubmitted(false);
            setModalOpen(true);
          }}
        >
          <img
            src="/images/icons/phone-icon.png"
            alt="Phone"
            className="callback-phone-icon"
          />
          <span>Request Callback</span>
        </button>
      </div>

      {/* Callback Request Modal */}
      {modalOpen && (
        <div className="callback-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="callback-modal-card" onClick={(e) => e.stopPropagation()}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h4>Request a Callback</h4>
                <p>
                  Enter your phone number and our Seven Mirrors team will call you about{" "}
                  <strong>{property?.title || "this property"}</strong>.
                </p>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="callback-phone-input"
                  required
                />
                <div className="callback-modal-actions">
                  <button
                    type="button"
                    className="callback-cancel-btn"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="callback-submit-btn">
                    Submit Request
                  </button>
                </div>
              </form>
            ) : (
              <div className="callback-success-state">
                <div className="callback-success-icon">✓</div>
                <h4>Callback Requested!</h4>
                <p>Our concierge will contact you shortly on {phone}.</p>
                <button
                  type="button"
                  className="callback-submit-btn"
                  onClick={() => setModalOpen(false)}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
