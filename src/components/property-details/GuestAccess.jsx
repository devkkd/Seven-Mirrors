"use client";

import React, { useState } from "react";
import "@/styles/property-details/guest-access.css";

export default function GuestAccess() {
  const [openRules, setOpenRules] = useState({});

  const toggleRule = (ruleNumber) => {
    setOpenRules((prev) => ({
      ...prev,
      [ruleNumber]: !prev[ruleNumber]
    }));
  };

  const renderRule = (ruleNumber, title, children) => {
    const isOpen = Boolean(openRules[ruleNumber]);
    return (
      <div key={ruleNumber} className="rule-item">
        <button
          type="button"
          className="rule-toggle-btn"
          onClick={() => toggleRule(ruleNumber)}
          aria-expanded={isOpen}
        >
          <h4 className="rule-title">{title}</h4>
          <svg
            width="16"
            height="16"
            className={`rule-chevron-icon lg:hidden ${isOpen ? "is-open" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div className={`rule-lines-wrap ${isOpen ? "flex is-open" : "hidden lg:flex"}`}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <section id="guest-access" className="guest-access-section" aria-label="Guest access">
      {/* Section Heading */}
      <h2 className="guest-access-heading">Guest access</h2>

      {/* Guest Access Description */}
      <p className="guest-access-intro">
        Guests have access to the entire property, ensuring complete privacy and comfort throughout their stay.
      </p>

      {/* Other Things to Note */}
      <div className="other-things-block">
        <h3 className="other-things-heading">Other things to note</h3>
        <p className="other-things-line">
          House Rules - Ensuring a Comfortable and Pleasant Stay
        </p>
        <p className="other-things-line">
          To provide a seamless experience for all guests, please adhere to the following guidelines:
        </p>
      </div>

      {/* Three-Column House Rules */}
      <div className="house-rules-grid">
        {/* COLUMN 1 – Rules 1 to 5 */}
        <div className="rules-column">
          {renderRule(
            1,
            "1. Cleanliness",
            <p className="rule-desc">
              Vomiting anywhere other than in the bathrooms will result in an additional cleaning fee of ₹2000.
            </p>
          )}

          {renderRule(
            2,
            "2. Noise & Music",
            <>
              <p className="rule-desc">
                Outdoor loud music or noise is strictly prohibited after 10 PM, in accordance with Rajasthan Government regulations.
              </p>
              <p className="rule-desc">
                We are not responsible for any complaints from neighbors. Violating this policy may lead to immediate eviction without a refund.
              </p>
              <p className="rule-desc">
                To respect our surroundings, all outdoor lights must be dimmed by 11 PM, and all lights should remain off after this time.
              </p>
            </>
          )}

          {renderRule(
            3,
            "3. Parking",
            <p className="rule-desc">
              Parking is available at the guest&apos;s own risk.
            </p>
          )}

          {renderRule(
            4,
            "4. Hookah",
            <p className="rule-desc">
              Strictly prohibited. Violation may lead to booking cancellation without a refund.
            </p>
          )}

          {renderRule(
            5,
            "5. Parties",
            <p className="rule-desc">
              Parties are not allowed on the property.
            </p>
          )}
        </div>

        {/* COLUMN 2 – Rules 6 to 10 */}
        <div className="rules-column">
          {renderRule(
            6,
            "6. Energy Conservation",
            <p className="rule-desc">
              Kindly switch off lights, air conditioners, and appliances when not in use.
            </p>
          )}

          {renderRule(
            7,
            "7. Guest Belongings",
            <>
              <p className="rule-desc">
                Guests are responsible for securing the property by locking all doors and windows when stepping out or before sleeping.
              </p>
              <p className="rule-desc">
                We are not liable for the loss of personal belongings.
              </p>
            </>
          )}

          {renderRule(
            8,
            "8. Property Damage",
            <p className="rule-desc">
              Guests are responsible for any damage or loss to the property, including fixtures and fittings, during their stay.
            </p>
          )}

          {renderRule(
            9,
            "9. Keys",
            <>
              <p className="rule-desc">
                Guests will receive a pair of keys upon arrival.
              </p>
              <p className="rule-desc">
                Treat the property like your home, not a hotel. If any issues arise, notify us immediately, and we will address them as soon as possible.
              </p>
            </>
          )}

          {renderRule(
            10,
            "10. Identification Requirement",
            <>
              <p className="rule-desc">
                As per Indian law, all guests must provide valid identification:
              </p>
              <p className="rule-desc">
                <strong className="rule-bold-label">Non-Indian Guests:</strong> Copy of passport and visa.
              </p>
              <p className="rule-desc">
                <strong className="rule-bold-label">Indian Guests:</strong> Government-issued ID.
              </p>
            </>
          )}
        </div>

        {/* COLUMN 3 – Rules 11 to 15 */}
        <div className="rules-column">
          {renderRule(
            11,
            "11. Sanitation",
            <p className="rule-desc">
              Our homestays are thoroughly sanitized before every guest&apos;s arrival to maintain the highest hygiene standards.
            </p>
          )}

          {renderRule(
            12,
            "12. Security Deposit",
            <>
              <p className="rule-desc">
                A refundable security deposit of ₹5000 is required at check-in.
              </p>
              <p className="rule-desc">
                This will be refunded at checkout, provided no damages or policy violations occur.
              </p>
            </>
          )}

          {renderRule(
            13,
            "13. Visitors",
            <p className="rule-desc">
              Visitors are not allowed without prior approval.
            </p>
          )}

          {renderRule(
            14,
            "14. Smoking",
            <p className="rule-desc">
              Smoking is strictly prohibited inside the property.
            </p>
          )}

          {renderRule(
            15,
            "15. Early Check-in / Late Checkout",
            <p className="rule-desc">
              Early check-in and late checkout are subject to availability and may incur additional charges as per Seven Mirror BNB&apos;s policy.
            </p>
          )}

          <div className="rules-closing-divider" />

          <p className="rules-closing-message">
            We look forward to welcoming you and ensuring you have a delightful stay!
          </p>
        </div>
      </div>
    </section>
  );
}
