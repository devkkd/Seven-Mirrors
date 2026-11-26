"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Minus,
  Plus,
  SlidersHorizontal,
  X,
} from "lucide-react";

/* ---------------- data (sample: apna data / images lagao) ---------------- */

const PH = ["/images/hero-1.png", "/images/hero-2.png", "/images/hero-3.png"];
const photos = (n = 5) => Array.from({ length: n }, (_, i) => PH[i % PH.length]);
// Real images: ["/properties/rossiero/1.jpg", "/properties/rossiero/2.jpg", ...]

const STAYS = [
  {
    slug: "rossiero",
    city: "jaipur",
    cityName: "Jaipur",
    area: "Ashok Nagar",
    name: "Rossiero",
    type: "Entire Villa",
    tagline: "A Charming 4-Bedroom Private Villa In The Heart Of The Pink City.",
    desc: "Surrounded by lush greenery and bursts of vibrant bougainvillea blooms, Rossiero is a serene retreat that blends traditional Rajasthani elegance with modern comfort. The name captures exactly what the villa offers.",
    tags: ["4 Bedrooms", "Private Garden"],
    address: "S-22, Durgadas Colony, Ashok Marg, Ashok Nagar, Jaipur, Rajasthan, India",
    price: 6000,
    bedrooms: 4,
    greatFor: ["Food", "Services", "Kids", "Pet"],
    images: photos(),
  },
  {
    slug: "cozy-loft-floor-1",
    city: "jaipur",
    cityName: "Jaipur",
    area: "Malviya Nagar",
    name: "Cozy Loft - Floor 1",
    type: "Private Floor",
    tagline: "A Bright, Welcoming Floor With Its Own Private Garden.",
    desc: "Private 4-bedroom floor in a quiet residential lane, with a private garden and a central location close to Jaipur's best cafes and markets.",
    tags: ["4 Bedrooms", "Private Garden", "Central Location"],
    address: "B-14, Malviya Nagar, Jaipur, Rajasthan, India",
    price: 6000,
    bedrooms: 4,
    greatFor: ["Food", "Kids", "Senior Citizens"],
    images: photos(),
  },
  {
    slug: "lumen-royale",
    city: "gurugram",
    cityName: "Gurugram",
    area: "DLF Phase 2",
    name: "Lumen Royale",
    type: "Entire Residence",
    tagline: "Timeless Luxury In The Heart Of Gurugram.",
    desc: "A Ralph Lauren-inspired designer residence where classic elegance meets contemporary comfort, with generous living spaces and private balconies.",
    tags: ["Private Balcony", "Elevator Access"],
    address: "DLF Phase 2, Sector 25, Gurugram, Haryana, India",
    price: 9500,
    bedrooms: 3,
    greatFor: ["Services", "View", "Senior Citizens"],
    images: photos(),
  },
  {
    slug: "haveli-suite",
    city: "jaipur",
    cityName: "Jaipur",
    area: "C-Scheme",
    name: "Haveli Suite",
    type: "Entire Residence",
    tagline: "Heritage Charm With A Private Courtyard.",
    desc: "A heritage-style 3-bedroom residence centred around a quiet courtyard, with a chef on request and easy access to the old city.",
    tags: ["3 Bedrooms", "Courtyard"],
    address: "C-Scheme, Ashok Nagar, Jaipur, Rajasthan, India",
    price: 8500,
    bedrooms: 3,
    greatFor: ["Food", "Services", "View"],
    images: photos(),
  },
  {
    slug: "skyline-residence",
    city: "gurugram",
    cityName: "Gurugram",
    area: "Golf Course Road",
    name: "Skyline Residence",
    type: "Entire Apartment",
    tagline: "A Full-Floor Apartment With Open City Views.",
    desc: "A full-floor 3-bedroom apartment with a private lift, floor-to-ceiling windows and concierge service for effortless long stays.",
    tags: ["3 Bedrooms", "City Views", "Private Lift"],
    address: "Golf Course Road, Sector 54, Gurugram, Haryana, India",
    price: 11000,
    bedrooms: 3,
    greatFor: ["Services", "View"],
    images: photos(),
  },
  {
    slug: "royal-bagh",
    city: "jaipur",
    cityName: "Jaipur",
    area: "Civil Lines",
    name: "Royal Bagh",
    type: "Entire Villa",
    tagline: "A Grand Villa Set In Its Own Gardens.",
    desc: "A large 6-bedroom villa with sweeping lawns, a private pool and staff quarters, ideal for weddings, reunions and family celebrations.",
    tags: ["6 Bedrooms", "Private Pool", "Lawns"],
    address: "Civil Lines, Jaipur, Rajasthan, India",
    price: 24000,
    bedrooms: 6,
    greatFor: ["Food", "Services", "Kids", "Pet", "View"],
    images: photos(),
  },
];

const CITIES = [
  { id: "jaipur", label: "Jaipur" },
  { id: "gurugram", label: "Gurugram" },
];
const GREAT_FOR = ["Food", "Services", "View", "Senior Citizens", "Kids", "Pet"];
const PRICES = [
  { id: "under-10000", label: "Under ₹10,000", test: (p) => p < 10000 },
  { id: "10000-20000", label: "₹10,000 - ₹20,000", test: (p) => p >= 10000 && p <= 20000 },
  { id: "20000-35000", label: "₹20,000 - ₹35,000", test: (p) => p > 20000 && p <= 35000 },
  { id: "35000-50000", label: "₹35,000 - ₹50,000", test: (p) => p > 35000 && p <= 50000 },
  { id: "above-50000", label: "More than ₹50,000", test: (p) => p > 50000 },
];

const DEFAULT_FILTERS = {
  rooms: 1,
  cities: CITIES.map((c) => c.id),
  greatFor: [],
  price: null, // design me "under-10000" pehle se selected tha; chaho to yahan "under-10000" kar do
};

const pad = (n) => String(n).padStart(2, "0");
const mod = (n, m) => ((n % m) + m) % m;

function useInView(threshold = 0.1) {
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

/* ---------------- main ---------------- */

export default function PropertiesListing({ initialCity = null }) {
  const startFilters = {
    ...DEFAULT_FILTERS,
    cities: CITIES.some((c) => c.id === initialCity) ? [initialCity] : DEFAULT_FILTERS.cities,
  };

  const [draft, setDraft] = useState(startFilters); // filter panel me jo chuna
  const [applied, setApplied] = useState(startFilters); // "Apply" ke baad jo lagu hai
  const [fading, setFading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // mobile drawer: body scroll lock + Esc se band
  useEffect(() => {
    if (!drawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const apply = () => {
    setDrawerOpen(false);
    setFading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setApplied(draft);
      setFading(false);
    }, 200);
  };

  const clearAll = () => {
    setDraft(DEFAULT_FILTERS);
    setApplied(DEFAULT_FILTERS);
  };

  const results = STAYS.filter((s) => {
    if (applied.cities.length && !applied.cities.includes(s.city)) return false;
    if (s.bedrooms < applied.rooms) return false;
    if (applied.greatFor.length && !applied.greatFor.some((g) => s.greatFor.includes(g)))
      return false;
    if (applied.price) {
      const range = PRICES.find((p) => p.id === applied.price);
      if (range && !range.test(s.price)) return false;
    }
    return true;
  });

  const activeCount =
    (applied.rooms > 1 ? 1 : 0) +
    (applied.cities.length > 0 && applied.cities.length < CITIES.length ? 1 : 0) +
    applied.greatFor.length +
    (applied.price ? 1 : 0);

  return (
    <div className="mx-auto mt-12 max-w-[1360px] px-5 md:px-10">
      {/* title */}
      <header className="text-center">
        <h1 className="font-playfair text-[28px] font-bold leading-tight text-neutral-950 md:text-[36px]">
          Properties of Seven Mirror Stays
        </h1>
        <p className="mt-4 text-[14px] text-neutral-500">
          {results.length} Stay{results.length === 1 ? "" : "s"} found
        </p>
      </header>

      <div className="mt-10 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        {/* desktop filters */}
        <aside className="hidden lg:sticky lg:top-6 lg:block lg:self-start lg:border-r lg:border-black/10 lg:pr-8">
          <FilterPanel
            idPrefix="desktop"
            draft={draft}
            setDraft={setDraft}
            onApply={apply}
            onClear={clearAll}
          />
        </aside>

        <div>
          {/* mobile filter button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="mb-5 flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-[13px] font-medium text-neutral-900 transition hover:border-neutral-900 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>

          {/* cards */}
          <div
            className={`space-y-5 transition-opacity duration-200 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {results.length > 0 ? (
              results.map((s) => <StayCard key={s.slug} s={s} />)
            ) : (
              <div className="rounded-[20px] border border-black/10 px-6 py-16 text-center">
                <p className="font-playfair text-[22px] font-bold text-neutral-950">
                  No stays match your filters
                </p>
                <p className="mt-2 text-[13px] text-neutral-500">
                  Try changing or clearing a few filters.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-6 rounded-full bg-[#1a1a1a] px-7 py-3 text-[13px] font-semibold text-white transition hover:bg-black"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${drawerOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 left-0 w-[88%] max-w-[360px] overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
            className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-black/5"
          >
            <X className="h-5 w-5" />
          </button>
          <FilterPanel
            idPrefix="mobile"
            draft={draft}
            setDraft={setDraft}
            onApply={apply}
            onClear={clearAll}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- filters ---------------- */

function FilterPanel({ idPrefix, draft, setDraft, onApply, onClear }) {
  const toggleIn = (key, value) =>
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(value) ? d[key].filter((v) => v !== value) : [...d[key], value],
    }));

  const stepper =
    "flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-[#F4EFE4] disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div className="text-neutral-900">
      <div className="flex items-center justify-between pr-10 lg:pr-0">
        <h2 className="text-[16px] font-bold">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-[12px] text-neutral-600 underline-offset-4 transition hover:text-neutral-900 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* rooms */}
      <Section title="Rooms">
        <div className="flex items-center justify-between text-[13px]">
          <span>No. of Rooms</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease rooms"
              disabled={draft.rooms <= 1}
              onClick={() => setDraft((d) => ({ ...d, rooms: d.rooms - 1 }))}
              className={stepper}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center tabular-nums">{pad(draft.rooms)}+</span>
            <button
              type="button"
              aria-label="Increase rooms"
              disabled={draft.rooms >= 10}
              onClick={() => setDraft((d) => ({ ...d, rooms: d.rooms + 1 }))}
              className={stepper}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </Section>

      {/* city */}
      <Section title="City">
        <div className="space-y-3.5">
          {CITIES.map((c) => (
            <Checkbox
              key={c.id}
              label={c.label}
              checked={draft.cities.includes(c.id)}
              onChange={() => toggleIn("cities", c.id)}
            />
          ))}
        </div>
      </Section>

      {/* great for */}
      <Section title="Great For">
        <div className="space-y-3.5">
          {GREAT_FOR.map((g) => (
            <Checkbox
              key={g}
              label={g}
              checked={draft.greatFor.includes(g)}
              onChange={() => toggleIn("greatFor", g)}
            />
          ))}
        </div>
      </Section>

      {/* price */}
      <Section title="Price Per Night" last>
        <div className="space-y-3.5">
          {PRICES.map((p) => (
            <Radio
              key={p.id}
              name={`price-${idPrefix}`}
              label={p.label}
              checked={draft.price === p.id}
              onChange={() => setDraft((d) => ({ ...d, price: p.id }))}
              onClick={() => draft.price === p.id && setDraft((d) => ({ ...d, price: null }))}
            />
          ))}
        </div>
      </Section>

      <button
        type="button"
        onClick={onApply}
        className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-8 py-4 text-[13px] font-semibold text-white transition duration-300 hover:scale-105 hover:bg-black active:scale-95"
      >
        Apply All Filter
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}

function Section({ title, children, last = false }) {
  return (
    <div className={`mt-6 pb-6 ${last ? "" : "border-b border-black/10"}`}>
      <h3 className="mb-4 text-[12px] font-bold">{title}</h3>
      {children}
    </div>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[13px] text-neutral-800">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border border-neutral-400 bg-white text-white transition peer-checked:border-[#1a1a1a] peer-checked:bg-[#1a1a1a] peer-focus-visible:ring-2 peer-focus-visible:ring-black/30">
        <Check
          strokeWidth={3}
          className={`h-3 w-3 transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}
        />
      </span>
      {label}
    </label>
  );
}

function Radio({ checked, onChange, onClick, label, name }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[13px] text-neutral-800">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        onClick={onClick}
        className="peer sr-only"
      />
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-neutral-400 transition peer-checked:border-[#1a1a1a] peer-focus-visible:ring-2 peer-focus-visible:ring-black/30">
        <span
          className={`h-2.5 w-2.5 rounded-full bg-[#1a1a1a] transition-transform duration-200 ${
            checked ? "scale-100" : "scale-0"
          }`}
        />
      </span>
      {label}
    </label>
  );
}

/* ---------------- stay card ---------------- */

function StayCard({ s }) {
  const [ref, seen] = useInView(0.1);
  const href = `/properties/${s.slug}`; // apna route
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`;

  return (
    <article
      ref={ref}
      className={`overflow-hidden rounded-[20px] border border-black/10 bg-white transition-all duration-700 ease-out md:flex ${
        seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {/* image */}
      <div className="relative aspect-[4/3] shrink-0 md:aspect-auto md:min-h-[320px] md:w-[44%]">
        <CardSlider images={s.images} alt={s.name} cityName={s.cityName} type={s.type} />
      </div>

      <div className="flex flex-1 flex-col xl:flex-row">
        {/* details */}
        <div className="flex-1 p-5 md:p-6">
          <p className="text-[11px] uppercase tracking-wide text-neutral-800">
            {s.cityName} · {s.area}
          </p>

          <h3 className="mt-2 font-playfair text-[26px] font-bold leading-tight text-neutral-950 lg:text-[30px]">
            <Link href={href} className="transition-opacity hover:opacity-70">
              {s.name}
            </Link>
          </h3>

          <p className="mt-3 font-playfair text-[15px] font-bold leading-snug text-neutral-950 lg:text-[16px]">
            {s.tagline}
          </p>

          <p className="mt-3 line-clamp-3 text-[12px] font-light leading-relaxed text-neutral-700 lg:text-[13px]">
            {s.desc}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {s.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-[#F4EFE4] px-4 py-2 text-[11px] leading-none text-neutral-800 lg:text-[12px]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-[#F4EFE4] p-4">
            <p className="text-[12px] leading-relaxed text-neutral-800">
              <span className="font-bold">ADDRESS :</span> {s.address}
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] text-neutral-900 shadow-sm transition hover:shadow"
            >
              <MapPin className="h-3.5 w-3.5 text-[#EA4335]" />
              Get Directions
            </a>
          </div>
        </div>

        {/* price */}
        <div className="flex items-center justify-between gap-4 border-t border-black/10 p-5 md:px-6 xl:w-[200px] xl:flex-col xl:justify-center xl:border-l xl:border-t-0 xl:px-5">
          <div className="xl:text-left">
            <p className="text-[28px] font-medium leading-none text-neutral-950 xl:text-[32px]">
              ₹{s.price.toLocaleString("en-IN")}
            </p>
            <p className="mt-1.5 text-[12px] text-neutral-500">/night + tax</p>
          </div>
          <Link
            href={`${href}#reserve`}
            className="group flex items-center gap-1.5 rounded-full bg-[#111] px-8 py-3.5 text-[12px] font-semibold text-white transition duration-300 hover:scale-105 hover:bg-black active:scale-95 xl:w-full xl:justify-center xl:px-0"
          >
            Reserve
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* card ke andar image slider: crossfade + arrows + counter + badges */
function CardSlider({ images, alt, cityName, type }) {
  const [i, setI] = useState(0);
  const n = images.length;
  const go = (d) => setI((x) => mod(x + d, n));

  // sirf current aur aas-paas ki images mount karo (performance)
  const near = (k) => {
    const d = Math.abs(k - i);
    return Math.min(d, n - d) <= 1;
  };

  const arrow =
    "absolute top-1/2 -translate-y-1/2 p-1 text-white drop-shadow-md transition hover:scale-110";
  const pill =
    "rounded-full bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-neutral-900";

  return (
    <div className="absolute inset-0 overflow-hidden bg-neutral-200">
      {images.map((src, k) =>
        near(k) ? (
          <Image
            key={`${src}-${k}`}
            src={src}
            alt={`${alt} - photo ${k + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 44vw"
            className={`object-cover transition-all duration-700 ease-out ${
              k === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
        ) : null
      )}

      <span className={`absolute left-3 top-3 ${pill}`}>{cityName}</span>
      <span className={`absolute right-3 top-3 ${pill}`}>{type}</span>

      <button aria-label="Previous photo" onClick={() => go(-1)} className={`${arrow} left-2`}>
        <ChevronLeft strokeWidth={1.25} className="h-7 w-7" />
      </button>
      <button aria-label="Next photo" onClick={() => go(1)} className={`${arrow} right-2`}>
        <ChevronRight strokeWidth={1.25} className="h-7 w-7" />
      </button>

      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-medium tabular-nums text-neutral-900">
        {i + 1}/{n}
      </span>
    </div>
  );
}