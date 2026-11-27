"use client";

import { useEffect, useRef, useState } from "react";

// Apne asli numbers yahan daalo (country code ke saath, bina + ya space ke)
const WHATSAPP_NUMBER = ""; // jaise "91XXXXXXXXXX"
const PHONE_NUMBER = ""; // jaise "+91XXXXXXXXXX"

// \n = desktop par design jaisi line break
const REASONS = [
  {
    title: "Fully managed",
    text: "Housekeeping, guest\nhandling, maintenance\nand staffing — run end to\nend by our team, not\nyours.",
  },
  {
    title: "Honest earnings",
    text: "A clear payout structure\nagreed before you list,\nwith monthly statements\nno surprises at\nsettlement.",
  },
  {
    title: "Styled, not staged",
    text: "We present your home\nthe way we’d want to find\nit real photography,\nhonest listing copy, no\nfiller.",
  },
  {
    title: "You stay in control",
    text: "Block out personal\ndates any time, and\napprove your listing\nbefore it ever goes live.",
  },
];

const FIELDS = [
  { name: "name", label: "Full name", placeholder: "Your name", autoComplete: "name" },
  { name: "phone", label: "Phone number", placeholder: "+91", type: "tel", autoComplete: "tel" },
  { name: "location", label: "Property location", placeholder: "City & neighbourhood" },
  { name: "type", label: "Property type", placeholder: "Villa / Independent floor / Other" },
];

const WE_HANDLE = [
  "Guest bookings & communication",
  "Housekeeping & on-ground staff",
  "Listing, pricing & photography",
  "Maintenance coordination",
  "Monthly earnings & reporting",
];

const YOU_KEEP = [
  "Full ownership of the property",
  "Final approval on your listing",
  "Personal-use dates, blocked as needed",
  "Say in who manages your home, always",
  "The right to pause or exit the partnership",
];

const TAGS = ["Jaipur", "Gurugram", "Villas & Independent Floors", "2+ Bedrooms"];

const CRITERIA = [
  ["Location", "Currently onboarding in Jaipur and Gurugram, with more cities added carefully."],
  ["Condition", "Move-in ready, or close to it - we’ll help with final styling, not renovation."],
  ["Access", "A private entrance and space we can style as a stand-alone stay."],
  ["Availability", "Open to guest bookings for a meaningful part of the year."],
];

const STEPS = [
  {
    title: "Tell us about your home",
    text: "A short call or WhatsApp conversation - location, size, and what makes the property worth staying in.",
  },
  {
    title: "A Site Visit",
    text: "Our team visits in person to understand the space, check readiness, and talk through what onboarding involves.",
  },
  {
    title: "Styling & Listing",
    text: "Photography, pricing and listing copy — reviewed and approved by you before anything goes live.",
  },
  {
    title: "You Start Earning",
    text: "Bookings, guest communication and on-ground service are handled by us; you receive monthly earnings and reports.",
  },
];

const FAQS = [
  [
    "Do I lose control of my own home?",
    "No. You approve the listing before it goes live, and you can block personal-use dates whenever you need the property.",
  ],
  [
    "How is my earning calculated?",
    "We agree a payout structure with you before listing, based on your property and location, and share monthly statements so it stays transparent.",
  ],
  [
    "What if I want to stop at some point?",
    "You’re free to pause or end the partnership — the property is, and always remains, yours.",
  ],
  [
    "Do you manage properties outside Jaipur and Gurugram?",
    "Not yet. We’re onboarding carefully in these two cities first, and will expand as our on-ground team does.",
  ],
];

// sizes 1440px wide design ke hisaab se
const WRAP = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[74px]";
const EYEBROW = "text-[14px] uppercase leading-[22px]";
const HEADING = "font-playfair text-[28px] font-bold leading-[1.4] lg:text-[32px]";

const LISTS = [
  { title: "We Handle", items: WE_HANDLE, dark: true },
  { title: "You Keep", items: YOU_KEEP },
];

const INPUT =
  "mt-[8px] block w-full rounded-[16px] border border-[#e6e6e6] px-[15px] text-[12px] outline-none transition placeholder:text-[#d6d3ca] focus:border-[#212121]";
const LABEL = "block text-[12px] uppercase leading-[18px]";
const LINK = "underline-offset-4 hover:underline";

// ---------- Animations ----------
// .rise = page load par, [data-reveal] = scroll karke aane par. --d = delay
const ANIMATIONS = `
  @keyframes rise { from { opacity: 0; translate: 0 28px; } }
  .rise, [data-show] { animation: rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms) backwards; }
  [data-hide] { opacity: 0; }
  @media (prefers-reduced-motion: reduce) {
    .rise, [data-show] { animation: none; }
    main * { transition-duration: 0s !important; }
  }
  @media print { [data-hide] { opacity: 1; } }
`;
const delay = (ms) => ({ "--d": `${ms}ms` });

export default function AddPropertyPage() {
  const [error, setError] = useState("");
  // design me step 02 dark hai, hover/focus karne par highlight badalta hai
  const [active, setActive] = useState(1);
  const pageRef = useRef(null);

  // jo cheezein screen ke neeche hain, wo scroll karne par smoothly aati hain
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
          // upar nikal chuke elements (fast scroll) bhi dikha do
          if (!isIntersecting && boundingClientRect.top > 0) return;
          target.removeAttribute("data-hide");
          target.setAttribute("data-show", "");
          io.unobserve(target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    const items = pageRef.current.querySelectorAll("[data-reveal]");
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return; // pehle se dikh raha hai
      el.setAttribute("data-hide", "");
      io.observe(el);
    });

    return () => {
      io.disconnect();
      items.forEach((el) => el.removeAttribute("data-hide"));
    };
  }, []);

  // Abhi form WhatsApp par message kholta hai. Backend ho to yahan fetch() lagao.
  function handleSubmit(e) {
    e.preventDefault();
    if (!WHATSAPP_NUMBER) {
      setError("Enquiry is not set up yet: add WHATSAPP_NUMBER in the code.");
      return;
    }
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const message = [
      "Property enquiry",
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      `Location: ${d.location}`,
      `Type: ${d.type}`,
      `Details: ${d.details}`,
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <main ref={pageRef} className="overflow-x-clip bg-white text-[#111]">
      <style>{ANIMATIONS}</style>

      {/* ---------- Hero ---------- */}
      <header className={`${WRAP} pb-16 pt-12 text-center lg:pb-[73px] lg:pt-[44px]`}>
        <p className={`${EYEBROW} rise`}>Add Your Property</p>
        <h1 style={delay(100)} className="rise mt-[23px] font-playfair text-[30px] font-bold leading-[1.3] tracking-[-0.01em] lg:text-[38px] lg:leading-[50px]">
          Let Your Second Home Welcome The World.
        </h1>
        <p style={delay(200)} className="rise mt-[17px] font-playfair text-[15px] capitalize leading-[26px] lg:text-[16px]">
          With Seven Mirrors Stays, your property becomes a curated, carefully hosted escape
          beautifully maintained, thoughtfully managed, and never left to run itself.
        </p>
      </header>

      {/* ---------- Why owners partner with us ---------- */}
      <section className={`${WRAP} pb-16 lg:pb-[75px]`}>
        <p style={delay(300)} className={`${EYEBROW} rise`}>Why owners partner with us</p>

        <div className="mt-[22px] grid gap-8 xl:grid-cols-[391px_1fr] xl:gap-0">
          <h2 style={delay(350)} className={`${HEADING} rise !leading-[48px]`}>
            <span className="block">Tailored Earnings.</span>
            <span className="block">Zero Hassle.</span>
            <span className="block">Your Home, Still yours</span>
          </h2>

          {/* border: container par top/left, har card par right/bottom */}
          <ol className="grid border-l border-t border-[#e8e8e8] sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r, i) => (
              <li
                key={r.title}
                style={delay(400 + i * 100)}
                className="rise transition-colors duration-300 hover:bg-[#f6f0e5]/60 border-b border-r border-[#e8e8e8] px-6 py-[37px] min-[1400px]:pl-[37px] min-[1400px]:pr-0 text-[14px] leading-[22px] lg:min-h-[225px]"
              >
                <p className="font-bold">0{i + 1}</p>
                <h3 className="font-bold">{r.title}</h3>
                <p className="min-[1400px]:whitespace-pre">{r.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Enquiry form ---------- */}
      <section id="enquiry" className="bg-[#f6f0e5]">
        <div className={`${WRAP} grid gap-10 py-14 lg:grid-cols-[691fr_601fr] lg:gap-0 lg:pb-[45px] lg:pt-[60px]`}>
          <div data-reveal className="lg:pt-[19px]">
            <h2 className={HEADING}>Tell Us About Your Home</h2>
            <p className="mt-[22px] text-[14px] leading-[22px]">
              Share a few details and our team will get back to you - usually within a day - to
              arrange a call or a site visit.
            </p>
            <p className="mt-[21px] text-[14px] leading-[22px]">
              <strong>Prefer to talk directly?</strong> Message us on{" "}
              {WHATSAPP_NUMBER ? (
                <a className={LINK} href={`https://wa.me/${WHATSAPP_NUMBER}`}>WhatsApp</a>
              ) : (
                "WhatsApp"
              )}{" "}
              or{" "}
              {PHONE_NUMBER ? (
                <a className={LINK} href={`tel:${PHONE_NUMBER}`}>call our partnerships team</a>
              ) : (
                "call our partnerships team"
              )}
              .
            </p>
          </div>

          <div data-reveal style={delay(150)} className="w-full max-w-[451px]">
            <form onSubmit={handleSubmit} className="rounded-[16px] bg-white px-[22px] pb-[27px] pt-[23px] transition-shadow duration-500 focus-within:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                  <div className="space-y-[16px]">
                    {FIELDS.map((f) => (
                      <label key={f.name} className={LABEL}>
                        {f.label}
                        <input
                          name={f.name}
                          type={f.type ?? "text"}
                          autoComplete={f.autoComplete}
                          placeholder={f.placeholder}
                          required
                          className={`${INPUT} h-[45px]`}
                        />
                      </label>
                    ))}

                    <label className={LABEL}>
                      Tell us a little more
                      <textarea
                        name="details"
                        placeholder="Bedrooms, current use, anything else worth knowing"
                        className={`${INPUT} h-[90px] resize-none py-[14px]`}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="group mt-[15px] inline-flex h-[41px] w-[141px] items-center justify-center gap-1 rounded-full bg-[#212121] text-[12px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-lg active:scale-95"
                  >
                    Submit Enquiry
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </button>

                  {error && (
                    <p role="alert" className="mt-3 text-[13px] text-red-600">
                      {error}
                    </p>
                  )}
                </form>
          </div>
        </div>
      </section>

      {/* ---------- What's handled, what's yours ---------- */}
      <section className={`${WRAP} py-14 lg:pb-[63px] lg:pt-[47px]`}>
        <p data-reveal className={EYEBROW}>What’s handled, what’s yours</p>

        <div className="mt-[23px] grid gap-6 md:grid-cols-2 lg:grid-cols-[377px_1fr_1fr] lg:gap-x-[37px]">
          <h2 data-reveal className={`${HEADING} md:col-span-2 lg:col-span-1 !leading-[48px]`}>
            <span className="lg:block">A Clear LINE Between </span>
            <span className="lg:block">Our Job And Your </span>
            <span className="lg:block">Ownership.</span>
          </h2>
          {LISTS.map(({ title, items, dark }, i) => (
            <div
              key={title}
              data-reveal
              style={delay(120 + i * 150)}
              className={`px-[30px] pb-[41px] pt-[42px] ${
                dark ? "bg-[#212121] text-white" : "border border-[#e8e8e8] bg-white"
              }`}
            >
              <h3 className="text-[24px] font-bold leading-[32px] tracking-[-0.02em]">{title}</h3>
              <ul className="mt-[11px]">
                {items.map((item) => (
                  <li
                    key={item}
                    className={`border-b pb-[18px] pt-[15px] text-[14px] leading-[18px] transition-[padding] duration-300 hover:pl-2 ${dark ? "border-[#8a8a8a]" : "border-[#ececec]"}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Who we're looking for ---------- */}
      <section className={`${WRAP} grid gap-10 pb-16 pt-6 lg:grid-cols-[616fr_676fr] lg:gap-0 lg:pb-[71px] lg:pt-[13px]`}>
        <div data-reveal>
          <h2 className={`${HEADING} !leading-[42px]`}>Who We&apos;Re Looking For</h2>
          <p className="mt-[17px] text-[14px] leading-[22px]">
            We stay small on purpose, so every property gets real attention.
            <br />
            That means we’re selective about what we take on.
          </p>
          <ul className="mt-[19px] flex flex-wrap gap-[17px]">
            {TAGS.map((tag) => (
              <li key={tag} className="rounded-full bg-[#f6f0e5] px-[15px] text-[12px] leading-[33px] transition duration-300 hover:-translate-y-0.5 hover:bg-[#212121] hover:text-white">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <dl>
          {CRITERIA.map(([term, text], i) => (
            <div
              key={term}
              data-reveal
              style={delay(i * 100)}
              className={`grid gap-2 py-[25px] sm:grid-cols-[186px_1fr] sm:items-center ${
                i === 0 ? "!pt-[5px]" : ""
              } ${i < CRITERIA.length - 1 ? "border-b border-[#ececec]" : "!pb-0"}`}
            >
              <dt className="text-[22px] font-bold leading-[32px] tracking-[-0.02em] lg:text-[24px]"><span className="whitespace-pre">{term === "Access" ? "Access  -" : `${term} -`}</span></dt>
              <dd className="text-[13px] leading-[20px]">{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="bg-[#f6f0e5] py-14 lg:pb-[61px] lg:pt-[59px]">
        <div data-reveal className={WRAP}>
          <p className={EYEBROW}>How it works</p>
          <h2 className={`${HEADING} mt-[19px] !leading-[42px]`}>From First Conversation To First Guest</h2>
        </div>

        <ol className="mt-[18px]">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`outline-none transition-colors duration-500 ease-out ${
                active === i ? "bg-[#0f0f0f] text-white" : ""
              }`}
            >
              <div data-reveal style={delay(i * 100)} className={WRAP}>
                <div className="grid grid-cols-[48px_1fr] items-center gap-x-3 gap-y-2 border-b border-[#8c8a82]/20 py-7 lg:h-[114px] lg:grid-cols-[149px_417px_1fr] lg:py-0 lg:gap-0">
                  <span className="text-[20px] font-bold tracking-[-0.02em] lg:text-[24px]">0{i + 1}.</span>
                  <h3 className="text-[20px] font-bold tracking-[-0.02em] lg:text-[24px]">{step.title}</h3>
                  <p className="col-start-2 text-[13px] leading-[1.6] lg:col-start-3">{step.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Common questions ---------- */}
      <section className={`${WRAP} grid gap-8 py-14 lg:grid-cols-[541fr_751fr] lg:gap-0 lg:pb-[110px] lg:pt-[76px]`}>
        <div data-reveal>
          <p className={EYEBROW}>Common questions</p>
          <h2 className={`${HEADING} mt-[26px] !leading-[42px]`}>Before You Reach Out</h2>
        </div>

        <dl className="lg:pt-[37px]">
          {FAQS.map(([q, a], i) => (
            <div
              key={q}
              data-reveal
              style={delay(i * 90)}
              // design me dusre sawal ke neeche line text ke paas hai
              className={`border-b border-[#ececec] pt-[23px] first:pt-0 ${i === 1 ? "pb-[2px]" : "pb-[21px]"}`}
            >
              <dt className="text-[14px] font-bold leading-[22px]">{q}</dt>
              <dd className="text-[13px] leading-[22px]">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
