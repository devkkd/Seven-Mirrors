"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- data (sample: apna data / images lagao) ---------------- */

const PH = ["/images/hero-1.png", "/images/hero-2.png", "/images/hero-3.png"];
const photos = (n = 5) => Array.from({ length: n }, (_, i) => PH[i % PH.length]);
// Real images: ["/properties/rossiero/1.jpg", "/properties/rossiero/2.jpg", ...]

const VILLAS = [
  {
    slug: "rossiero",
    city: "jaipur",
    area: "Ashok Nagar, Jaipur",
    name: "Rossiero",
    price: 6000,
    blurb: "Private 4-Bedroom Villa",
    features: ["4 Bedrooms", "Private garden", "Central location"],
    images: photos(),
  },
  {
    slug: "lumen-royale",
    city: "gurugram",
    area: "DLF Phase 2, Gurugram",
    name: "Lumen Royale",
    price: 6000,
    blurb: "Designer residence with private balconies",
    features: ["Private Balcony", "Elevator Access", "Boutique Service"],
    images: photos(),
  },
  {
    slug: "haveli-suite",
    city: "jaipur",
    area: "C-Scheme, Jaipur",
    name: "Haveli Suite",
    price: 8500,
    blurb: "Heritage-style 3-Bedroom Residence",
    features: ["3 Bedrooms", "Courtyard", "Chef on request"],
    images: photos(),
  },
  {
    slug: "skyline-residence",
    city: "gurugram",
    area: "Golf Course Road, Gurugram",
    name: "Skyline Residence",
    price: 9500,
    blurb: "Full-floor 3-Bedroom Apartment",
    features: ["City views", "Private lift", "Concierge"],
    images: photos(),
  },
  {
    slug: "garden-retreat",
    city: "jaipur",
    area: "Vaishali Nagar, Jaipur",
    name: "Garden Retreat",
    price: 7200,
    blurb: "Independent 2-Bedroom Villa",
    features: ["2 Bedrooms", "Lawn", "Pet friendly"],
    images: photos(),
  },
  {
    slug: "aria-penthouse",
    city: "gurugram",
    area: "Sector 54, Gurugram",
    name: "Aria Penthouse",
    price: 11000,
    blurb: "Penthouse with private terrace",
    features: ["3 Bedrooms", "Terrace", "Skyline views"],
    images: photos(),
  },
];

const TABS = [
  { id: "all", label: "All Stays" },
  { id: "jaipur", label: "Jaipur", icon: "/images/icons/jaipur.png" },
  { id: "gurugram", label: "Gurugram", icon: "/images/icons/gurgram.png" },
];

const LIMIT = 3; // kitne cards dikhane hain
const mod = (n, m) => ((n % m) + m) % m;

/* ---------------- helpers ---------------- */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen];
}

/* ---------------- section ---------------- */

export default function BestRatedVillas() {
  const [tab, setTab] = useState("all"); // selected tab
  const [shown, setShown] = useState("all"); // list actually rendered
  const [fading, setFading] = useState(false);
  const [gridRef, seen] = useInView(0.15);
  const timer = useRef(null);

  const list = (shown === "all" ? VILLAS : VILLAS.filter((v) => v.city === shown)).slice(0, LIMIT);

  useEffect(() => () => clearTimeout(timer.current), []);

  const changeTab = (id) => {
    if (id === tab) return;
    setTab(id);
    setFading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(id);
      setFading(false);
    }, 250);
  };

  return (
    <section className="bg-white py-14 md:py-20">
      {/* heading */}
      <h2 className="px-5 text-center font-playfair text-[30px] font-bold leading-tight text-neutral-950 md:text-[40px]">
        Best Rated Villas
      </h2>

      {/* tabs */}
      <div className="px-5">
        <div
          role="tablist"
          className="mx-auto mt-8 flex w-full max-w-[460px] items-end justify-between border-b border-[#E7E1D5]"
        >
          {TABS.map(({ id, label, icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => changeTab(id)}
                className={`-mb-px flex items-center gap-2 border-b-2 px-2 pb-3 pt-1 text-[13px] transition-colors sm:px-4 ${
                  active
                    ? "border-[#1a1a1a] font-semibold text-neutral-900"
                    : "border-transparent text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {icon && (
                  <Image
                    src={icon}
                    alt=""
                    width={32}
                    height={32}
                    className="h-6 w-6 object-contain sm:h-8 sm:w-8"
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* grid */}
      <div
        ref={gridRef}
        className={`mx-auto mt-10 max-w-[1320px] px-5 transition-all duration-300 ease-out md:px-10 ${
          fading ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
          {list.map((v, i) => (
            <VillaCard key={v.slug} v={v} index={i} seen={seen} />
          ))}
        </div>
      </div>

      {/* see all */}
      <div className="mt-12 flex justify-center px-5">
        <Link
          href="/properties" // apna route
          className="group flex items-center gap-2 rounded-full bg-[#1a1a1a] px-9 py-4 text-[13px] font-semibold text-white transition duration-300 hover:scale-105 hover:bg-black active:scale-95"
        >
          See All Villas
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

/* ---------------- card ---------------- */

function VillaCard({ v, index, seen }) {
  const href = `/properties/${v.slug}`; // apna route

  return (
    <article
      className={`transition-all duration-700 ease-out ${
        seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: seen ? `${index * 120}ms` : "0ms" }}
    >
      <CardImages images={v.images} alt={v.name} />

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[11px] uppercase tracking-wide text-neutral-800">
            {v.area}
          </p>
          <Link href={href} className="mt-2 block truncate">
            <span className="text-[26px] font-semibold leading-tight tracking-tight text-neutral-950 lg:text-[28px]">
              {v.name}
            </span>
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <div className="text-right">
            <p className="text-[17px] font-bold leading-tight text-neutral-950">
              ₹{v.price.toLocaleString("en-IN")}
            </p>
            <p className="text-[10px] text-neutral-500">/night + tax</p>
          </div>
          <Link
            href={href}
            aria-label={`View ${v.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-white transition hover:scale-110"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <p className="mt-3 text-[12px] text-neutral-800">{v.blurb}</p>
      <p className="mt-1 text-[12px] text-neutral-800">{v.features.join(" · ")}</p>
    </article>
  );
}

/* card ke andar mini image slider (dots + hover arrows) */
function CardImages({ images, alt }) {
  const [i, setI] = useState(0);
  const go = (d) => setI((x) => mod(x + d, images.length));

  const arrow =
    "absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-black shadow transition hover:bg-white md:opacity-0 md:group-hover:opacity-100";

  return (
    <div className="group relative aspect-[3/2] overflow-hidden rounded-[22px] bg-neutral-200">
      {images.map((src, n) => (
        <Image
          key={`${src}-${n}`}
          src={src}
          alt={`${alt} - photo ${n + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 ease-out ${
            n === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}

      <button aria-label="Previous photo" onClick={() => go(-1)} className={`${arrow} left-2`}>
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button aria-label="Next photo" onClick={() => go(1)} className={`${arrow} right-2`}>
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center">
        {images.map((_, n) => (
          <button key={n} aria-label={`Photo ${n + 1}`} onClick={() => setI(n)} className="p-1">
            <span
              className={`block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                n === i ? "scale-125 bg-white" : "bg-white/55"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}