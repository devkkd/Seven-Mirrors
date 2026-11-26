"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- data (sample: apna data / images lagao) ---------------- */

const PH = ["/images/hero-1.png", "/images/hero-2.png", "/images/hero-3.png"];
const photos = (n = 5) => Array.from({ length: n }, (_, i) => PH[i % PH.length]);
// Real images: ["/properties/rossiero/1.jpg", "/properties/rossiero/2.jpg", ...]

const STAYS = [
  {
    slug: "rossiero",
    area: "Ashok Nagar · Jaipur",
    name: "Rossiero",
    tagline: "A Charming 4-Bedroom Private Villa In The Heart Of The Pink City.",
    tags: ["4 Bedrooms", "Private Garden", "Central Jaipur Location"],
    desc: "Surrounded by lush greenery and bursts of vibrant bougainvillea blooms, Rossiero is a serene retreat that blends traditional Rajasthani elegance with modern comfort. The name captures exactly what the villa offers charm, comfort, and a central location in Jaipur.",
    connectivity: [
      { place: "Jaipur Airport", info: "~14 km · 30-35 min" },
      { place: "Jaipur Railway Station", info: "~7 km · 20 min" },
      { place: "Pink City / Hawa Mahal", info: "~5 km · 15-20 min" },
      { place: "World Trade Park", info: "~5 km · 15 min" },
    ],
    price: 6000,
    images: photos(),
  },
  {
    slug: "lumen-royale",
    area: "DLF Phase 2 · Gurugram",
    name: "Lumen Royale",
    tagline: "Timeless luxury in the heart of Gurugram.",
    tags: ["Corporate stays", "Wedding Stays", "Long stays", "Staycations", "International travel"],
    desc: "A Ralph Lauren-inspired designer residence where classic elegance meets contemporary comfort. Thoughtfully curated interiors, generous living spaces and private balconies create a home that feels sophisticated, warm and effortlessly comfortable.",
    connectivity: [
      { place: "Cyber Hub", info: "~4 km · 10-15 min" },
      { place: "MG Road", info: "~3 km · 10 min" },
      { place: "Golf Course Road", info: "~2 km · 10 min" },
      { place: "New Delhi Airport", info: "~18 km · 30-40 min" },
    ],
    price: 6000,
    images: photos(),
  },
];

const mod = (n, m) => ((n % m) + m) % m;

/* ---------------- helpers ---------------- */

function useInView(threshold = 0.2) {
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

export default function FeaturedStays() {
  return (
    <section className="overflow-x-clip bg-white py-12 md:py-20">
      <div className="flex flex-col gap-14">
        {STAYS.map((stay, i) => (
          <StayRow key={stay.slug} stay={stay} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- one row ---------------- */

function StayRow({ stay, flip }) {
  const [ref, seen] = useInView(0.2);
  const href = `/properties/${stay.slug}`; // apna route yahan set karo

  return (
    <article
      ref={ref}
      className="relative px-5 lg:flex lg:min-h-[clamp(500px,38vw,280px)]  lg:items-center lg:px-0"
    >
      {/* outline frame (sirf desktop) */}
      <div
        className={`pointer-events-none absolute inset-y-0 hidden w-[60%] border-2 border-[#E5DFD5] transition-opacity duration-1000 lg:block ${
          flip ? "right-0 rounded-l-[32px] border-r-0" : "left-0 rounded-r-[32px] border-l-0"
        } ${seen ? "opacity-100" : "opacity-0"}`}
      />

      {/* image slider */}
      <div
        className={`relative aspect-[4/3] w-full transition-all duration-1000 ease-out lg:absolute lg:inset-y-4 lg:aspect-auto lg:w-[52%] ${
          flip ? "lg:left-0" : "lg:right-0"
        } ${
          seen
            ? "translate-x-0 opacity-100"
            : `opacity-0 ${flip ? "-translate-x-12" : "translate-x-12"}`
        }`}
      >
        <ImageSlider images={stay.images} alt={stay.name} flip={flip} />
      </div>

      {/* text */}
      <div
        className={`pt-6 transition-all delay-200 duration-1000 ease-out lg:w-[38%] lg:py-12 lg:pt-12 ${
          flip ? "lg:ml-auto lg:mr-[7%]" : "lg:ml-[5.4%]"
        } ${seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <p className="text-[11px] uppercase tracking-wide text-neutral-900 lg:text-[12px]">
          {stay.area}
        </p>

        <h3 className="mt-3 font-mona text-[34px] font-bold leading-tight tracking-tight text-neutral-950 lg:text-[40px]">
          {stay.name}
        </h3>

        <p className="mt-3 text-[13px] text-neutral-800 lg:text-[14px]">{stay.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {stay.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#F4EFE4] px-4 py-2 text-[11px] leading-none text-neutral-800 lg:text-[12px]"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-5 text-[12px] font-light leading-relaxed text-neutral-700 lg:text-[13px]">
          {stay.desc}
        </p>

        {/* connectivity */}
        <div className="mt-5 grid grid-cols-2 gap-y-4 rounded-[28px] border border-black/15 px-2 py-4 lg:grid-cols-4 lg:rounded-[40px] lg:px-2 lg:py-3.5">
          {stay.connectivity.map((c) => (
            <div
              key={c.place}
              className="px-3 lg:border-l lg:border-black/15 lg:first:border-l-0 lg:px-4"
            >
              <p className="text-[11px] font-medium leading-snug text-neutral-900 lg:text-[12px]">
                {c.place}
              </p>
              <p className="mt-1.5 text-[10px] text-neutral-400 lg:text-[11px]">{c.info}</p>
            </div>
          ))}
        </div>

        {/* price + buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p>
            <span className="text-[26px] font-medium text-neutral-950 lg:text-[30px]">
              ₹{stay.price.toLocaleString("en-IN")}
            </span>
            <span className="ml-2 text-[12px] text-neutral-400">/night + tax</span>
          </p>

          <div className="flex items-center gap-3">
            <Link
              href={href}
              className="group flex items-center gap-1.5 rounded-full border border-neutral-800 px-6 py-3 text-[12px] font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              Explore Stay
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={`${href}#reserve`}
              className="group flex items-center gap-1.5 rounded-full bg-[#111] px-7 py-3 text-[12px] font-medium text-white transition hover:bg-black"
            >
              Reserve Now
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------- image slider ---------------- */

function ImageSlider({ images, alt, flip }) {
  const [i, setI] = useState(0);
  const touchX = useRef(null);
  const go = (d) => setI((x) => mod(x + d, images.length));

  return (
    <div
      className={`group relative h-full w-full overflow-hidden rounded-3xl bg-neutral-200 ${
        flip ? "lg:rounded-l-none lg:rounded-r-[24px]" : "lg:rounded-l-[24px] lg:rounded-r-none"
      }`}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(diff) > 40) go(diff < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateX(-${i * 100}%)` }}
      >
        {images.map((src, n) => (
          <div key={`${src}-${n}`} className="relative h-full w-full shrink-0">
            <Image
              src={src}
              alt={`${alt} - photo ${n + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <button
        aria-label="Previous photo"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-white drop-shadow transition hover:scale-110 lg:left-4"
      >
        <ChevronLeft strokeWidth={1.25} className="h-7 w-7" />
      </button>
      <button
        aria-label="Next photo"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white drop-shadow transition hover:scale-110 lg:right-4"
      >
        <ChevronRight strokeWidth={1.25} className="h-7 w-7" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center lg:bottom-4">
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