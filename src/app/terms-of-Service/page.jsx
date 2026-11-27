"use client";

import { useEffect, useRef } from "react";

export default function TermsOfService() {
  const rootRef = useRef(null);

  const title = "Terms of Service";
  const subtitle = "The terms that govern your use of our site and your stay with us.";
  const intro =
    "By browsing this website or making a booking with Seven Mirrors Stays, you agree to the terms below. Please read them alongside our Cancellation Policy and House Rules, which apply to every stay.";

  const sections = [
    { title: "Who we are", body: "Seven Mirrors Stays manages a small portfolio of privately owned properties in Jaipur and Gurugram, currently including Rossiero, Cozy Loft and Lumen Royale. We act as the booking and management platform for these properties." },
    { title: "Making a booking", body: "A booking is confirmed only once payment (or the agreed advance) has been received and a confirmation has been sent by email or WhatsApp. All guests must be 18 or older to book; bookings made on behalf of a group must be honestly represented at the time of booking." },
    { title: "Guest responsibilities", body: "Guests are expected to use the property respectfully, follow the House Rules provided at booking, and take responsibility for their own belongings and conduct, and that of anyone they bring to the property. Guests are liable for any damage caused during their stay beyond normal wear and tear." },
    { title: "Our responsibilities", body: "We will provide the property broadly as described and photographed at the time of booking. Should a property become unavailable for reasons beyond our control, we will offer a comparable alternative or a full refund." },
    { title: "Website use", body: "Content on this site — text, photography and branding — belongs to Seven Mirrors Stays or its property partners and may not be copied or reused without permission." },
    { title: "Limitation of liability", body: "We are not liable for indirect losses, missed connections, or circumstances outside our reasonable control (including weather, strikes, or government restrictions). Nothing in these terms limits liability that cannot be excluded under applicable law." },
    { title: "Changes to these terms", body: "We may update these terms from time to time; the version live on this site at the time of your booking applies." },
    { title: "Governing law", body: "These terms are governed by the laws of India, with courts in Jaipur, Rajasthan having jurisdiction." },
    { title: "Contact", body: "Questions about these terms can be sent to stay@sevenmirrors.com." },
  ];

  // Scroll par smooth fade-up (ek hi observer sabke liye)
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
      { threshold: 0.1 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const reveal =
    "opacity-0 translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0";

  return (
    <main ref={rootRef} className="font-mona min-h-screen bg-white px-6 pb-24 pt-10 text-neutral-900 antialiased">
      <header className="mx-auto max-w-3xl text-center">
        <h1
          data-reveal
          className={`${reveal} font-playfair text-3xl font-bold uppercase tracking-tight text-neutral-950 sm:text-[34px]`}
        >
          {title}
        </h1>
        <p
          data-reveal
          style={{ transitionDelay: "100ms" }}
          className={`${reveal} font-playfair mt-5 text-[13px] text-neutral-800`}
        >
          {subtitle}
        </p>
      </header>

      <article className="mx-auto mt-16 max-w-[680px] text-[11.5px] leading-[1.45] text-neutral-900">
        <p data-reveal className={`${reveal} mb-5`}>
          {intro}
        </p>

        {sections.map((s, i) => (
          <section
            key={s.title}
            data-reveal
            style={{ transitionDelay: `${Math.min(i, 3) * 60}ms` }}
            className={`${reveal} mb-5`}
          >
            <h2 className="font-normal">
              {i + 1}. {s.title}
            </h2>
            <p>{s.body}</p>
          </section>
        ))}
      </article>
    </main>
  );
}
