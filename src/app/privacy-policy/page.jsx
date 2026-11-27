"use client";

import { useEffect, useRef } from "react";

export default function PrivacyPolicy() {
  const rootRef = useRef(null);

  const title = "Privacy Policy";
  const subtitle = "How we collect, use and protect your information.";
  const intro = "We collect only what we need to run your booking well, and we don't sell your data.";

  const sections = [
    { title: "What we collect", body: "Name, phone number, email address, ID proof (for check-in), payment details (processed securely by our payment gateway, not stored by us), and any preferences you share with our team." },
    { title: "How we use it", body: "To confirm and manage your booking, send confirmations via email or WhatsApp, coordinate check-in with the on-ground team, and respond to enquiries. We do not use guest data for unrelated marketing without consent." },
    { title: "Sharing your information", body: "We share information only with the people who need it to run your stay — our property teams, our payment gateway provider, and WhatsApp Business (if you choose to communicate that way). We do not sell guest data to third parties." },
    { title: "Photo ID", body: "ID proof shared before check-in is used solely for verification and statutory guest-registration requirements, and is stored securely." },
    { title: "Cookies", body: "This website may use basic cookies to remember preferences and understand how the site is used. You can disable cookies in your browser at any time." },
    { title: "Data retention", body: "We retain booking and guest information only as long as needed for the stay, legal record-keeping, and dispute resolution." },
    { title: "Your rights", body: "You can ask us what information we hold about you, request corrections, or ask us to delete it (subject to legal record-keeping requirements) by emailing stay@sevenmirrors.com." },
    { title: "Security", body: "We take reasonable technical and organisational measures to protect your data, though no online system can be guaranteed 100% secure." },
    { title: "Changes to this policy", body: "We may update this policy periodically; the version live on this site applies to your booking." },
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
