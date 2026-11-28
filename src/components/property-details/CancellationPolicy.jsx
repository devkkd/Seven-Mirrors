"use client";

import React, { useState } from "react";
import "@/styles/property-details/cancellation-policy.css";

export default function CancellationPolicy({ property }) {
  const [policyModalOpen, setPolicyModalOpen] = useState(false);

  const stages = property?.cancellationPolicy?.tiers || [
    {
      type: "100% refund",
      desc: "More than 7 days before check-in",
      status: "full"
    },
    {
      type: "50% refund",
      desc: "3-7 days before check-in",
      status: "partial"
    },
    {
      type: "No refund",
      desc: "Less than 3 days before check-in",
      status: "none"
    }
  ];

  const renderStageIcon = (status) => {
    if (status === "full") {
      return (
        <div className="stage-icon-circle stage-green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      );
    }
    if (status === "partial") {
      return (
        <div className="stage-icon-circle stage-orange">
          <span className="half-circle-dot" />
        </div>
      );
    }
    return (
      <div className="stage-icon-circle stage-red">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    );
  };

  return (
    <section className="cancellation-policy-section" aria-label="Cancellation Policy">
      {/* Light Pink Outer Container */}
      <div className="cancellation-pink-card">
        {/* Top Row: Heading + View Full Policy Button */}
        <div className="cancellation-header-row">
          <div>
            <h2 className="cancellation-heading">Cancellation Policy</h2>
            <p className="cancellation-subheading">
              Refund amount depends on when you cancel.
            </p>
          </div>

          <button
            type="button"
            className="view-policy-pill-btn"
            onClick={() => setPolicyModalOpen(true)}
          >
            <span>View Full Policy →</span>
          </button>
        </div>

        {/* Inner Pure White Refund Stages Card */}
        <div className="cancellation-white-inner">
          <div className="cancellation-stages-grid">
            {stages.map((stage, idx) => (
              <div key={idx} className="cancellation-stage-col">
                <div className="stage-top-visual">
                  {renderStageIcon(stage.status || (idx === 0 ? "full" : idx === 1 ? "partial" : "none"))}
                  {idx < stages.length - 1 && <div className="stage-connector-line" />}
                </div>
                <div className="stage-title">{stage.type}</div>
                <div className="stage-desc">{stage.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Policy Details Modal */}
      {policyModalOpen && (
        <div className="policy-modal-backdrop" onClick={() => setPolicyModalOpen(false)}>
          <div className="policy-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="policy-modal-top">
              <h3>Full Cancellation Policy</h3>
              <button
                type="button"
                className="policy-modal-close"
                onClick={() => setPolicyModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="policy-modal-body">
              <p>
                <strong>100% Refund:</strong> Cancel more than 7 days before your scheduled check-in date for a full refund of the nightly rate and cleaning fee.
              </p>
              <p>
                <strong>50% Refund:</strong> Cancel between 3 and 7 days before check-in to receive a 50% refund of the accommodation fee.
              </p>
              <p>
                <strong>No Refund:</strong> Cancellations made less than 3 days before check-in are non-refundable.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
