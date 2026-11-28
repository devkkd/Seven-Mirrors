"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "@/styles/profile/logout-modal.css";

export default function LogoutModal({ isOpen, onClose, onConfirmLogout }) {
  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="logout-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <div className="logout-wrapper" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="logout-close-button"
          onClick={onClose}
          aria-label="Close logout modal"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>

        <div className="logout-modal">
          <h2 id="logout-modal-title" className="logout-title">
            Are you sure you want to log out?
          </h2>
          <p className="logout-description">
            You&apos;ll need to sign in again to access your account, bookings, and saved stays.
          </p>
          <button
            type="button"
            className="logout-button"
            onClick={onConfirmLogout}
          >
            Log Out →
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
