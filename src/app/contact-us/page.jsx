"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ContactSection() {
  const rootRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0); // 0 = booking, 1 = property
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [failedImgs, setFailedImgs] = useState({});

  /* ---------------- data ---------------- */
  const contactCards = [
    { title: "Call us", primary: "+91 1234567890", secondary: "10 AM - 8 PM, all days", label: "Call Now →", href: "tel:+911234567890", variant: "dark" },
    { title: "WhatsApp", primary: "+91 1234567890", secondary: "Fastest way to reach us", label: "Let's Talk", href: "https://wa.me/911234567890", variant: "whatsapp" },
    { title: "Email", primary: "stay@sevenmirrors.com", secondary: "Replies within 24 hours", label: "Email Now →", href: "mailto:stay@sevenmirrors.com", variant: "dark" },
    { title: "Cities", primary: "Jaipur & Gurugram", secondary: "On-ground team in both" },
  ];

  // Apni property ki photos ke URL yahan replace karein
  const properties = [
    { id: "rossiero", city: "Jaipur", type: "Entire Villa", area: "Ashok Nagar, Jaipur", name: "Rossiero", kind: "Private 4-Bedroom Villa", meta: "4 Bedrooms · Private garden · Central location", href: "/properties/rossiero", fallback: "#8f9a82", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80" },
    { id: "loft-1", city: "Jaipur", type: "Floor 1", area: "Malviya Nagar, Jaipur", name: "Cozy Loft - Floor 1", kind: "Private 4-Bedroom Villa", meta: "4 Bedrooms · Private garden · Central location", href: "/properties/cozy-loft-1", fallback: "#c98a1e", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80" },
    { id: "loft-2", city: "Jaipur", type: "Floor 2", area: "Malviya Nagar, Jaipur", name: "Cozy Loft - Floor 2", kind: "Private 4-Bedroom Villa", meta: "4 Bedrooms · Private garden · Central location", href: "/properties/cozy-loft-2", fallback: "#7a6a5c", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80" },
  ];

  const tabs = [
    { label: "A Booking", width: 75, messageLabel: "Message", placeholder: "Write your message" },
    { label: "Add Your Property", width: 107, messageLabel: "Tell us about your property", placeholder: "Location, size, and anything else we should know" },
  ];

  /* ---------------- scroll reveal (ek hi observer sabke liye) ---------------- */
  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll("[data-reveal]") ?? [];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const reveal =
    "opacity-0 translate-y-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0";
  const delay = (ms) => ({ transitionDelay: `${ms}ms` });

  const fieldClass =
    "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-xs text-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-300 hover:border-neutral-300 focus:border-neutral-900 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]";

  const btnBase =
    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 motion-reduce:transition-none";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== "idle") return;
    const form = e.currentTarget;
    setStatus("sending");
    // Yahan apna real API call lagayein
    setTimeout(() => {
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 2800);
    }, 1200);
  };

  const tab = tabs[activeTab];
  const pillOffset = tabs.slice(0, activeTab).reduce((sum, t) => sum + t.width, 0);

  /* ---------------- UI ---------------- */
  return (
    <main ref={rootRef} className="font-mona overflow-x-hidden bg-white pt-8 text-neutral-900 antialiased">
      {/* Header */}
      <header className="mx-auto max-w-3xl px-6 text-center">
        <p data-reveal className={`${reveal} text-[13px] uppercase tracking-wide`}>Contact us</p>
        <h1 data-reveal style={delay(80)} className={`${reveal} font-playfair mt-6 text-4xl font-bold text-neutral-950 sm:text-[42px]`}>
          Let&apos;s Plan Your Stay
        </h1>
        <p data-reveal style={delay(160)} className={`${reveal} font-playfair mt-6 text-[13px] leading-relaxed text-neutral-800 sm:text-sm`}>
          Whether It&apos;s A Booking Question, A Partnership Enquiry, Or Something Else Entirely - Our Team Usually Replies Within A Day.
        </p>
      </header>

      {/* Contact grid */}
      <div data-reveal style={delay(120)} className={`${reveal} mx-auto mt-16 max-w-[805px] px-6`}>
        <div className="grid grid-cols-1 gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
          {contactCards.map((c) => (
            <div key={c.title} className="flex flex-col bg-white px-6 py-7 transition-colors duration-500 hover:bg-neutral-50">
              <h3 className="text-xs font-semibold uppercase text-neutral-950">{c.title}</h3>
              <p className="mt-6 text-xs font-semibold text-neutral-950">{c.primary}</p>
              <p className="mt-1 text-xs text-neutral-600">{c.secondary}</p>
              {c.label && (
                <div className="mt-6">
                  <a
                    href={c.href}
                    target={c.variant === "whatsapp" ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`${btnBase} ${
                      c.variant === "whatsapp"
                        ? "bg-[#25d366] uppercase text-white hover:bg-[#1fbd5b] hover:shadow-lg hover:shadow-[#25d366]/30"
                        : "bg-[#1f1f1f] text-white hover:bg-black hover:shadow-lg hover:shadow-black/20"
                    }`}
                  >
                    {c.variant === "whatsapp" && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm4.52 11.99c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
                      </svg>
                    )}
                    {c.label}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Properties */}
      <section className="mx-auto mt-24 max-w-[1200px] px-6">
        <p data-reveal className={`${reveal} text-[15px] uppercase`}>Already have a property in mind?</p>
        <h2 data-reveal style={delay(80)} className={`${reveal} font-playfair mt-6 text-3xl font-bold text-neutral-950`}>
          Reach The Team For That Stay Directly
        </h2>
        <p data-reveal style={delay(140)} className={`${reveal} mt-6 text-xs`}>
          Each property has its own host team - skip the general enquiry and go straight to them.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              data-reveal
              style={{ ...delay(i * 110), backgroundColor: p.fallback }}
              className={`${reveal} group relative block aspect-[322/350] overflow-hidden rounded-2xl`}
            >
              {!failedImgs[p.id] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  onError={() => setFailedImgs((prev) => ({ ...prev, [p.id]: true }))}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] motion-reduce:transition-none"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500" />

              <div className="absolute inset-x-3 top-3 flex items-start justify-between">
                <span className="rounded-full bg-white px-4 py-2 text-[11px] uppercase leading-none shadow-sm">{p.city}</span>
                <span className="rounded-full bg-white px-4 py-2 text-[11px] uppercase leading-none shadow-sm">{p.type}</span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transition-none">
                <p className="text-[10px] uppercase tracking-wide text-white/80">{p.area}</p>
                <h3 className="font-playfair mt-1 text-[26px] font-bold leading-tight">{p.name}</h3>
                <p className="mt-3 text-[11px] text-white/90">{p.kind}</p>
                <p className="mt-1 text-xs text-white/90">{p.meta}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Message section */}
      <section className="mt-24 bg-[#f6f0e5] py-16">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-[1fr_445px] lg:gap-0">
          <div>
            <h2 data-reveal className={`${reveal} font-playfair text-3xl font-bold text-neutral-950`}>Send us A Message</h2>
            <p data-reveal style={delay(80)} className={`${reveal} mt-8 max-w-lg text-sm`}>
              For general questions, booking help, or anything that doesn&apos;t fit a quick WhatsApp message.
            </p>
            <div data-reveal style={delay(140)} className={`${reveal} mt-10 space-y-0.5 text-xs`}>
              <p className="uppercase">Response times</p>
              <p>WhatsApp - Usually within a few hours</p>
              <p>Phone - 10 AM - 8 PM daily</p>
              <p>Email - Within 24 hours</p>
            </div>
          </div>

          <div data-reveal style={delay(120)} className={`${reveal} rounded-3xl bg-white p-4 shadow-sm sm:p-[17px]`}>
            {/* Tabs + sliding pill */}
            <div className="relative inline-flex rounded-full bg-[#ebe5da]">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 rounded-full bg-[#1f1f1f] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{ width: tab.width, transform: `translateX(${pillOffset}px)` }}
              />
              {tabs.map((t, i) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  style={{ width: t.width }}
                  className={`relative z-10 rounded-full py-3 px-1 text-[11px] font-medium transition-colors duration-300 ${
                    activeTab === i ? "text-white" : "text-neutral-800 hover:text-black"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-2 block text-[11px]">FULL NAME</span>
                <input type="text" required placeholder="Your name" className={fieldClass} />
              </label>
              <label className="block">
                <span className="mb-2 block text-[11px]">PHONE NUMBER</span>
                <input type="tel" required placeholder="+91" className={fieldClass} />
              </label>
              <label className="block">
                <span className="mb-2 block text-[11px]">Email Address</span>
                <input type="email" placeholder="Enter Your Email Address" className={fieldClass} />
              </label>
              <label className="block">
                <span className="mb-2 block text-[11px]">{tab.messageLabel}</span>
                <textarea key={activeTab} rows={3} placeholder={tab.placeholder} className={`${fieldClass} h-[68px] resize-none`} />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`relative inline-flex min-w-[107px] items-center justify-center overflow-hidden rounded-full px-5 py-3 text-[11px] font-semibold text-white transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 active:translate-y-0 active:scale-95 motion-reduce:transition-none ${
                  status === "sent" ? "bg-emerald-600" : "bg-[#1f1f1f] hover:bg-black"
                }`}
              >
                <span className={`transition-all duration-300 ${status === "idle" ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}>
                  Submit Enquiry →
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${status === "sending" ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${status === "sent" ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                  Sent ✓
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
