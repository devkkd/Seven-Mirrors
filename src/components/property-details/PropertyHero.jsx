"use client";

import React, { useState, useEffect } from "react";
import "@/styles/property-details/property-hero.css";

export default function PropertyHero() {
  const [activeTab, setActiveTab] = useState("about");

  const navItems = [
    { id: "about", label: "About" },
    { id: "the-space", label: "The Space" },
    { id: "key-features-amenities", label: "Key Features & Amenities" },
    { id: "reviews", label: "Reviews" },
    { id: "location", label: "Location" },
    { id: "guest-access", label: "Guest Access" }
  ];

  // Smooth scroll to corresponding section
  const handleNavClick = (sectionId) => {
    setActiveTab(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  // Scrollspy: update active item as user scrolls down the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveTab(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="property-nav-container" aria-label="Property section navigation">
      <ul className="property-nav-list">
        {navItems.map((item) => (
          <li key={item.id} className="property-nav-item">
            <button
              type="button"
              className={`property-nav-btn ${activeTab === item.id ? "is-active" : ""}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
