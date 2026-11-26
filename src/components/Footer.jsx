import Image from "next/image";
import Link from "next/link";

/* ---------------- data ---------------- */

const COMPANY = [
  { label: "Properties", href: "/properties" },
  { label: "Destinations", href: "/destinations" },
  { label: "About Us", href: "/our-story" },
  { label: "Add Your Property", href: "/add-your-property" },
  { label: "Contact Us", href: "/contact" },
];

const POLICY = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Payments Terms", href: "/payment-terms" },
  { label: "Cancellation / Refund Policy", href: "/cancellation-policy" },
];

const EXPLORE = [
  {
    city: "Villas in Jaipur",
    stays: [
      { label: "Rossiero, Ashok Nagar", href: "/properties/rossiero" },
      { label: "Cozy Loft, Malviya Nagar", href: "/properties/cozy-loft-floor-1" },
    ],
  },
  {
    city: "Villas in Gurugram",
    stays: [{ label: "Lumen Royale, DLF Phase 2", href: "/properties/lumen-royale" }],
  },
];

const EMBLEM_SRC = "/images/footer-logo.png";
const WORDMARK_SRC = "/logo.png";

/* ---------------- small pieces ---------------- */

function ColumnTitle({ children }) {
  return (
    <h4 className="text-[12px] font-bold uppercase tracking-wide text-white lg:text-[13px]">
      {children}
    </h4>
  );
}

const linkCls =
  "text-[13px] font-light text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline";

/* social icons (inline SVG) */
function InstagramIcon() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)] text-white">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    </span>
  );
}

function FacebookIcon() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2]">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#fff" aria-hidden="true">
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3Z" />
      </svg>
    </span>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <rect x="1" y="5" width="22" height="14" rx="4.5" fill="#FF0000" />
      <path d="M10 9l5 3-5 3V9Z" fill="#fff" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/7_mirror_bnb/", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/", Icon: FacebookIcon }, // apna link
  { label: "YouTube", href: "https://www.youtube.com/", Icon: YouTubeIcon }, // apna link
];

/* ---------------- footer ---------------- */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1e1e1e] text-white">
      {/* ---------- top: brand + CTA ---------- */}
      <div className="px-5 pb-12 pt-14 text-center md:pt-16 lg:pb-16">
        <h3 className="font-playfair text-[30px] font-medium leading-tight md:text-[34px]">
          Seven Mirror Stays
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-[15px] font-light leading-relaxed text-white/90 md:text-[17px]">
          A small, currently limited portfolio of managed stays across Jaipur and Gurugram, with a
          resident team behind every home.
        </p>
        <Link
          href="/our-story"
          className="mt-7 inline-block rounded-full bg-white px-8 py-3.5 text-[13px] font-medium text-black transition duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] active:scale-95"
        >
          Discover our Story
        </Link>
      </div>

      {/* ---------- columns ---------- */}
      <div className="mx-auto max-w-[1200px] px-5 pb-14 lg:pb-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1fr_1fr_1.1fr_1fr_1fr] lg:gap-x-8">
          {/* company */}
          <nav aria-label="Company">
            <ColumnTitle>Company</ColumnTitle>
            <ul className="mt-5 space-y-0.5">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* policy */}
          <nav aria-label="Policy">
            <ColumnTitle>Policy</ColumnTitle>
            <ul className="mt-5 space-y-0.5">
              {POLICY.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* emblem */}
          <div className="order-first col-span-2 flex justify-center lg:order-none lg:col-span-1">
            <Image
              src={EMBLEM_SRC}
              alt=""
              width={120}
              height={160}
              className="h-[130px] w-auto object-contain"
            />
          </div>

          {/* explore stays */}
          <div>
            <ColumnTitle>Explore Stays</ColumnTitle>
            <div className="mt-5 space-y-2">
              {EXPLORE.map((group) => (
                <div key={group.city}>
                  <p className="text-[13px] font-bold text-white">{group.city}</p>
                  <ul className="mt-2 space-y-0.5">
                    {group.stays.map((s) => (
                      <li key={s.label}>
                        <Link href={s.href} className={linkCls}>
                          – {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* social */}
          <div>
            <ColumnTitle>Social</ColumnTitle>
            <ul className="mt-5 flex items-center gap-5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="block transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- bottom bar ---------- */}
      <div className="border-t border-white/15">
        <div className="mx-auto grid max-w-[1360px] items-center gap-6 px-5 py-8 text-center md:px-10 lg:grid-cols-3 lg:text-left">
          <p className="order-2 text-[12px] font-light text-white/90 lg:order-none lg:text-[13px]">
            © {year} Seven Mirror Stays. All rights reserved.
          </p>

          <div className="order-1 flex justify-center lg:order-none">
            <Image
              src={WORDMARK_SRC}
              alt="Seven Mirror Stays - Luxury Homes"
              width={300}
              height={70}
              className="h-14 w-auto object-contain opacity-40 brightness-0 invert md:h-16"
            />
          </div>

          <p className="order-3 text-[12px] font-light text-white/90 lg:order-none lg:text-right lg:text-[13px]">
            Design &amp; build by Kontent Kraft Digital
          </p>
        </div>
      </div>
    </footer>
  );
}