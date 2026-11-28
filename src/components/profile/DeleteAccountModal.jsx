"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "@/styles/profile/account-manage.css";

export default function DeleteAccountModal({ isOpen, onClose, onConfirmDelete }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-account-modal-title"
    >
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close delete account modal"
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

        <div className="delete-modal">
          <h2 id="delete-account-modal-title" className="modal-title">
            Delete your account permanently?
          </h2>
          <p className="modal-description">
            This will permanently remove your account and personal information. You may lose access to your booking history, saved information, and other account features.
          </p>
          <button
            type="button"
            className="modal-confirm-button"
            onClick={onConfirmDelete}
          >
            Delete Account →
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
