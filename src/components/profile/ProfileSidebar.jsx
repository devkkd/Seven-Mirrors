"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutModal from "@/components/profile/LogoutModal";

const SIDEBAR_ITEMS = [
  {
    id: "my-bookings",
    href: "/profile",
    label: "My Bookings",
    icon: "/images/icons/profile/my-bookings-icon.png"
  },
  {
    id: "about-me",
    href: "/profile/about-me",
    label: "About Me",
    icon: "/images/icons/profile/about-me-icon.png"
  },
  {
    id: "reviews",
    href: "/profile/reviews",
    label: "Reviews I've written",
    icon: "/images/icons/profile/reviews-icon.png"
  },
  {
    id: "account-manage",
    href: "/profile/account-manage",
    label: "Account Manage",
    icon: "/images/icons/profile/account-manage-icon.png"
  }
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    // Ready for future authentication logout integration
    setIsLogoutModalOpen(false);
  };

  const sidebarContent = (
    <>
      <div className="profile-sidebar-top">
        <div className="profile-sidebar-heading-row">
          <h1 className="profile-sidebar-heading">Profile</h1>
          <button
            type="button"
            className="profile-sidebar-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close profile menu"
          >
            ✕
          </button>
        </div>

        <nav className="profile-sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive =
              item.href === "/profile"
                ? pathname === "/profile"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("profile-about-me-reset"));
                  }
                }}
                className={`profile-sidebar-item no-underline ${isActive ? "is-active" : ""}`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="profile-sidebar-item-icon"
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Need Help Card */}
        <div className="profile-help-card">
          <div className="profile-help-top">
            <img
              src="/images/icons/profile/support-icon.png"
              alt="Support"
              className="profile-help-icon"
            />
            <div>
              <h2 className="profile-help-title">Need Help?</h2>
              <p className="profile-help-desc">Our team is here for you.</p>
            </div>
          </div>

          <button type="button" className="profile-help-btn">
            Contact Support →
          </button>
        </div>
      </div>

      {/* Log out Account Button */}
      <button
        type="button"
        className="profile-logout-btn"
        onClick={() => {
          setMobileMenuOpen(false);
          setIsLogoutModalOpen(true);
        }}
      >
        <img
          src="/images/icons/profile/logout-icon.png"
          alt="Log out"
          className="profile-logout-icon"
        />
        <span>Log out Account</span>
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="profile-sidebar" aria-label="Profile Menu">
        {sidebarContent}
      </aside>

      {/* Mobile Floating Circular Menu Button */}
      <button
        type="button"
        className="profile-mobile-fab"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open profile menu"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>

      {/* Mobile Left Slide-In Sidebar Drawer */}
      <div
        className="profile-mobile-drawer-backdrop"
        style={{
          opacity: mobileMenuOpen ? 1 : 0,
          visibility: mobileMenuOpen ? "visible" : "hidden",
          pointerEvents: mobileMenuOpen ? "auto" : "none"
        }}
        onClick={() => setMobileMenuOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileMenuOpen}
        aria-label="Profile Menu"
      >
        <aside
          className="profile-mobile-drawer"
          style={{
            transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {sidebarContent}
        </aside>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirmLogout={handleConfirmLogout}
      />
    </>
  );
}
