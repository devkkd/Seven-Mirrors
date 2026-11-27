"use client";

import { useEffect, useRef } from "react";

export default function CancellationRefundPolicy() {
  const rootRef = useRef(null);

  const title = "Cancellation / Refund Policy";
  const subtitle = "What happens if your plans change.";
  const intro = "We know travel plans shift. Here's exactly what to expect if you need to cancel or modify a booking.";

  const sections = [
    { title: "Free cancellation window", body: "Cancellations made more than 7 days before check-in receive a full refund, less any non-refundable payment gateway charges." },
    { title: "Partial refund window", body: "Cancellations made 3–7 days before check-in receive a 50% refund of the total booking amount." },
    { title: "No refund window", body: "Cancellations made less than 72 hours before check-in, or no-shows, are not eligible for a refund." },
    { title: "Security deposit", body: "Your security deposit (where applicable) is refunded in full within 7 business days of check-out, provided the House Rules were followed and no damage occurred." },
    { title: "Date changes", body: "Requests to move your dates are treated as a new booking, subject to availability at the new dates' prevailing rate, and are not guaranteed." },
    { title: "Early check-out", body: "No refund is provided for guests who choose to leave earlier than their confirmed check-out date." },
    { title: "Cancellations by us", body: "In the rare case we need to cancel a confirmed booking (property issue, force majeure, etc.), you will receive a full refund or the option of a comparable alternative property." },
    { title: "How to cancel", body: "Cancellations must be requested in writing via email or WhatsApp to the property's host team, quoting your booking reference. Refunds are processed to the original payment method within 7–10 business days of approval." },
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
