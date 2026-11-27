"use client";

import { useEffect, useRef } from "react";

export default function PaymentTerms() {
  const rootRef = useRef(null);

  const title = "Payment Terms";
  const subtitle = "How payments, pricing and deposits work.";

  const sections = [
    { title: "Accepted payment methods", body: "Bookings are paid online through our secure payment gateway. Accepted methods depend on the gateway in use at the time of booking (typically cards, UPI and net banking)." },
    { title: "Booking confirmation", body: "A booking is confirmed only after successful payment of the full amount or agreed advance. You will receive a confirmation by email, with a WhatsApp confirmation where available." },
    { title: "Pricing", body: "Rates shown at the time of booking include the charges stated on the property page; any additional services (transfers, add-ons) are charged separately and confirmed before booking." },
    { title: "Security deposit", body: "A refundable security deposit may be required at the time of booking, as stated on the property page. This is returned within 7 business days of check-out, less any deductions for damage, missing items, or violations of the House Rules." },
    { title: "Taxes", body: "Applicable taxes (including GST, where relevant) are added to the displayed rate unless stated otherwise." },
    { title: "Failed or disputed payments", body: "If a payment fails to reflect after a successful deduction, please contact us with your transaction reference so we can verify it with the gateway. Chargebacks raised without first contacting us may delay resolution." },
    { title: "Currency", body: "All prices are listed in Indian Rupees (INR) unless stated otherwise." },
    { title: "Contact", body: "Payment queries can be sent to stay@sevenmirrors.com or raised directly with your property's host team." },
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
