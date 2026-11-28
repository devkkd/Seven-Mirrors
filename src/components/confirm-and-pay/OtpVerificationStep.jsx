"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/styles/confirm-and-pay/otp-verification.css";

function maskContact(method, value) {
  if (!value) return "";
  if (method === "email") {
    const [local, domain] = value.split("@");
    if (!domain) return value;
    const visible = local.slice(0, 2);
    return `${visible}${"*".repeat(Math.max(2, local.length - 2))}@${domain}`;
  }
  // Phone: keep country code prefix and last 4 digits, mask middle digits
  const trimmed = value.replace(/\s+/g, "");
  if (trimmed.length <= 6) return trimmed;
  const prefixMatch = trimmed.match(/^(\+\d{1,3})/);
  const prefix = prefixMatch ? prefixMatch[1] : "";
  const rest = trimmed.slice(prefix.length);
  if (rest.length <= 4) return `${prefix}${rest}`;
  const maskedLen = rest.length - 4;
  return `${prefix}${"X".repeat(maskedLen)}${rest.slice(-4)}`;
}

export default function OtpVerificationStep({
  contactMethod,
  contactValue,
  onBack,
  onVerified
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendNotice, setResendNotice] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const otpCode = digits.join("");
  const isComplete = otpCode.length === 6 && digits.every((d) => /^\d$/.test(d));
  const maskedDisplay = maskContact(contactMethod, contactValue);

  const handleDigitChange = (index, rawValue) => {
    const cleaned = rawValue.replace(/\D/g, "");
    setErrorMessage("");

    if (!cleaned) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }

    // Handle multi-digit paste/autofill inside a single input
    if (cleaned.length > 1) {
      const next = [...digits];
      for (let i = 0; i < 6 - index && i < cleaned.length; i++) {
        next[index + i] = cleaned[i];
      }
      setDigits(next);
      const focusIdx = Math.min(5, index + cleaned.length);
      inputRefs.current[focusIdx]?.focus();
      return;
    }

    const next = [...digits];
    next[index] = cleaned;
    setDigits(next);
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    setErrorMessage("");
    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setDigits(next);
    const focusIdx = Math.min(5, pasted.length);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (!isComplete || isVerifying) return;

    setIsVerifying(true);
    setErrorMessage("");
    setResendNotice("");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${backendUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: contactMethod,
          contact: contactValue,
          otp: otpCode
        })
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.verified !== false) {
          onVerified({ method: contactMethod, value: contactValue });
          return;
        }
      }

      const errData = await res.json().catch(() => ({}));
      setErrorMessage(
        errData?.message || "Invalid or expired OTP code. Please try again."
      );
    } catch (err) {
      setErrorMessage(
        "Unable to verify OTP right now. Authentication service is unavailable."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    setErrorMessage("");
    setResendNotice("");
    setResendCooldown(30);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${backendUrl}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: contactMethod,
          contact: contactValue
        })
      });

      if (res.ok) {
        setResendNotice(`A new verification code has been sent to ${maskedDisplay}.`);
      } else {
        setErrorMessage("Could not resend code. Please try again shortly.");
      }
    } catch (err) {
      setErrorMessage("Authentication service unavailable to resend code.");
    }
  };

  return (
    <div className="auth-modal-body otp-modal-body">
      {/* Header row with back arrow on left and centered heading */}
      <div className="otp-title-row">
        <button
          type="button"
          className="otp-back-btn"
          onClick={onBack}
          aria-label="Back to login"
        >
          <img
            src="/images/icons/back-arrow.png"
            alt="Back"
            className="otp-back-icon"
          />
        </button>
        <h2 id="auth-modal-heading" className="otp-modal-title">
          Verify it&apos;s you
        </h2>
        <span className="otp-title-spacer" aria-hidden="true" />
      </div>

      <form onSubmit={handleVerifySubmit} className="otp-form">
        <label className="auth-field-label" htmlFor="otp-digit-0">
          Code*
        </label>

        {/* 6 Separate OTP Input Boxes */}
        <div className="otp-boxes-row" onPaste={handlePaste}>
          {digits.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-digit-${idx}`}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={idx === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              placeholder="0"
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`otp-digit-box ${errorMessage ? "has-error" : ""}`}
              aria-label={`OTP digit ${idx + 1}`}
            />
          ))}
        </div>

        <p className="otp-helper-text">
          We sent a code to {maskedDisplay}.
        </p>

        {errorMessage && (
          <p className="otp-error-text" role="alert">
            {errorMessage}
          </p>
        )}

        {resendNotice && (
          <p className="otp-notice-text" role="status">
            {resendNotice}
          </p>
        )}

        <div className="otp-verify-wrap">
          <button
            type="submit"
            disabled={!isComplete || isVerifying}
            className={`otp-verify-btn ${isComplete ? "is-ready" : ""}`}
          >
            {isVerifying ? "Verifying..." : "Verify →"}
          </button>
        </div>
      </form>

      <div className="otp-resend-row">
        <span>Didn&apos;t get it? </span>
        <button
          type="button"
          onClick={handleResendCode}
          disabled={resendCooldown > 0}
          className="otp-resend-btn"
        >
          {resendCooldown > 0
            ? `Send a new code (${resendCooldown}s)`
            : "Send a new code"}
        </button>
      </div>
    </div>
  );
}
