"use client";

import React from "react";
import "@/styles/profile/account-manage.css";

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`toggle-switch ${checked ? "is-on" : ""}`}
      onClick={onChange}
    >
      <span className="toggle-switch-knob" />
    </button>
  );
}

export default function AccountPreferences({
  preferences,
  onTogglePreference,
  onOpenDeleteModal
}) {
  return (
    <div className="account-manage-container">
      {/* Card 1: Communication & Marketing Preferences */}
      <section className="preference-card" aria-label="Notification Preferences">
        <div className="preference-row">
          <div className="preference-content">
            <h2 className="preference-title">Communication Preferences</h2>
            <p className="preference-description">
              Choose which booking and account updates you&apos;d like to receive.
            </p>
          </div>

          <ToggleSwitch
            checked={preferences.communication}
            onChange={() => onTogglePreference("communication")}
            label="Toggle Communication Preferences"
          />
        </div>

        <div className="preference-divider" />

        <div className="preference-row">
          <div className="preference-content">
            <h2 className="preference-title">Marketing Preferences</h2>
            <p className="preference-description">
              Manage promotional emails, offers, and travel recommendations.
            </p>
          </div>

          <ToggleSwitch
            checked={preferences.marketing}
            onChange={() => onTogglePreference("marketing")}
            label="Toggle Marketing Preferences"
          />
        </div>
      </section>

      {/* Card 2: Temporarily Disable Account */}
      <section
        className="disable-account-card"
        aria-label="Temporarily Disable Account"
      >
        <div className="preference-row">
          <div className="preference-content">
            <h2 className="preference-title">Temporarily Disable Account</h2>
            <p className="preference-subtitle">Need a break?</p>
            <p className="preference-description">
              Temporarily disable your account while keeping your information and booking history. You can reactivate your account anytime by signing in again.
            </p>
          </div>

          <ToggleSwitch
            checked={preferences.temporarilyDisabled}
            onChange={() => onTogglePreference("temporarilyDisabled")}
            label="Toggle Temporarily Disable Account"
          />
        </div>
      </section>

      {/* Card 3: Permanently Delete Account */}
      <section
        className="delete-account-card"
        aria-label="Permanently Delete Account"
      >
        <h2 className="preference-title">Permanently Delete Account</h2>
        <div className="delete-account-lines">
          <p className="preference-description">
            Permanently delete your Seven Mirror Stays account and associated personal information. This action cannot be undone.
          </p>
          <p className="preference-description">
            Before deleting your account, make sure you have completed or cancelled any upcoming bookings and resolved pending refunds or payments.
          </p>
        </div>

        <button
          type="button"
          className="delete-account-button"
          onClick={onOpenDeleteModal}
        >
          Delete Account →
        </button>
      </section>
    </div>
  );
}
