"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Landmark,
} from "lucide-react";

/* ---------------- data (sample: apna data / images yahan lagao) ---------------- */

const PH = ["/images/rooms/1.png", "/images/rooms/2.png", "/images/rooms/3.png"];
const photos = (n = 3) => Array.from({ length: n }, (_, i) => PH[i % PH.length]);
// Real images: ["/properties/cozy-loft-1/1.jpg", "/properties/cozy-loft-1/2.jpg", ...]

const PROPERTIES = [
  {
    slug: "cozy-loft-floor-1",
    city: "jaipur",
    area: "Malviya Nagar, Jaipur",
    name: "Cozy Loft",
    suffix: "Floor 1",
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
    blurb: "One residence per floor · 4 in the building.",
    features: ["Private Balcony", "Elevator Access", "Boutique Service"],
    images: photos(),
  },
  {
    slug: "cozy-loft-floor-2",
    city: "jaipur",
    area: "Malviya Nagar, Jaipur",
    name: "Cozy Loft",
    suffix: "Floor 2",
    price: 6000,
    blurb: "Private 4-Bedroom Villa",
    features: ["4 Bedrooms", "Private garden", "Central location"],
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
];

const TABS = [
  { id: "all", label: "All Stays" },
  { id: "jaipur", label: "Jaipur", icon: "/images/icons/jaipur.png" },
  { id: "gurugram", label: "Gurugram", icon: "/images/icons/gurgram.png" },
];

const GAP = 20; // px (gap-5)
const mod = (n, m) => ((n % m) + m) % m;

/* ---------------- main section ---------------- */

export default function DiscoverStays() {
  const [tab, setTab] = useState("all"); // selected tab
  const [shown, setShown] = useState("all"); // list actually rendered
  const [fading, setFading] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [dragging, setDragging] = useState(false);

  const scrollerRef = useRef(null);
  const thumbRef = useRef(null);
  const timer = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const list = shown === "all" ? PROPERTIES : PROPERTIES.filter((p) => p.city === shown);

  /* progress bar + arrow states (DOM se direct, taaki scroll par re-render na ho) */
  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const thumb = Math.min(100, Math.max(20, (el.clientWidth / el.scrollWidth) * 100));
    const p = max > 0 ? el.scrollLeft / max : 0;
    if (thumbRef.current) {
      thumbRef.current.style.width = `${thumb}%`;
      thumbRef.current.style.left = `${p * (100 - thumb)}%`;
    }
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(max <= 2 || el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update, shown]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const changeTab = (id) => {
    if (id === tab) return;
    setTab(id);
    setFading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(id);
      scrollerRef.current?.scrollTo({ left: 0 });
      setFading(false);
    }, 250);
  };

  const scrollByCard = (dirn) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector("[data-card]");
    const pitch = first ? first.getBoundingClientRect().width + GAP : el.clientWidth * 0.8;
    el.scrollBy({ left: dirn * pitch, behavior: "smooth" });
  };

  /* mouse drag-to-scroll (touch par native swipe chalta hai) */
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: scrollerRef.current.scrollLeft,
      moved: false,
    };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5 && !d.moved) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) scrollerRef.current.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  };

  return (
    <section className="bg-white py-14">
      {/* heading */}
      {/* heading */}
<div className="px-5 text-center">
  <p className="font-mona text-[14px] font-normal text-neutral-900 sm:text-[16px] lg:text-[18px]">
    A Small, Hand-picked Portfolio - Every Home Run By Our Own Resident Team.
  </p>

  <h2 className="mt-5 font-playfair text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-neutral-900 sm:text-[40px] lg:mt-7 lg:text-[48px]">
    Discover Places Worth{" "}
    <em className="font-normal italic">Going To</em>
  </h2>

  <p className="mx-auto mt-4 max-w-3xl font-mona text-[13px] font-light text-[#8A8A8A] sm:text-[15px] lg:mt-5 lg:text-[18px]">
    This is the full portfolio today. New homes are added as they&apos;re onboarded -
    nothing shown here is a placeholder.
  </p>
</div>

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
      className={`-mb-px font-mona flex items-center gap-2 border-b-2 px-2 pb-3 pt-1 text-[15px] transition-colors sm:px-4 ${
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
          className="h-6 w-6 object-contain sm:h-12 sm:w-12"
        />
      )}
      {label}
    </button>
  );
})}
        </div>
      </div>

      {/* slider */}
      <div
        className={`mt-10 transition-all duration-300 ease-out ${
          fading ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div
          ref={scrollerRef}
          onScroll={update}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={(e) => {
            // drag ke baad accidental click block karo
            if (drag.current.moved) {
              e.preventDefault();
              e.stopPropagation();
              drag.current.moved = false;
            }
          }}
          className={`flex select-none gap-5 overflow-x-auto px-5 scroll-px-5 md:px-[6vw] md:scroll-px-[6vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            dragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
          }`}
        >
          {list.map((p) => (
            <PropertyCard key={p.slug} p={p} />
          ))}
        </div>
      </div>

      {/* controls */}
      {/* <div className="mx-auto mt-10 flex w-fit items-center gap-5">
        <button
          aria-label="Previous stays"
          disabled={atStart}
          onClick={() => scrollByCard(-1)}
          className="p-1 text-neutral-900 transition hover:-translate-x-0.5 disabled:opacity-30 disabled:hover:translate-x-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="relative h-0.5 w-44 bg-[#E7E1D5] md:w-64">
          <div ref={thumbRef} className="absolute inset-y-0 left-0 w-[40%] bg-[#1a1a1a]" />
        </div>

        <button
          aria-label="Next stays"
          disabled={atEnd}
          onClick={() => scrollByCard(1)}
          className="p-1 text-neutral-900 transition hover:translate-x-0.5 disabled:opacity-30 disabled:hover:translate-x-0"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div> */}
    </section>
  );
}

/* ---------------- card ---------------- */

function PropertyCard({ p }) {
  const href = `/properties/${p.slug}`; // apna route yahan set karo

  return (
    <article
      data-card
      className="w-[78vw] max-w-[380px] shrink-0 snap-start sm:w-[44vw] md:w-[30vw] lg:w-[22vw]"
    >
      <CardImages images={p.images} alt={p.name} />

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[11px] uppercase tracking-wide text-neutral-600">
            {p.area}
          </p>
          <Link href={href} className="mt-1 block truncate text-neutral-900">
            <span className="text-[18px] font-bold sm:text-[20px]">{p.name}</span>
            {p.suffix && (
              <span className="ml-1.5 text-[13px] font-semibold sm:text-[14px]">- {p.suffix}</span>
            )}
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="text-right">
            <p className="text-[16px] font-bold leading-tight text-neutral-900">
              ₹{p.price.toLocaleString("en-IN")}
            </p>
            <p className="text-[10px] text-neutral-500">/night + tax</p>
          </div>
          <Link
            href={href}
            aria-label={`View ${p.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-white transition hover:scale-110"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <p className="mt-3 text-[12px] text-neutral-700">{p.blurb}</p>
      <p className="mt-1 text-[12px] text-neutral-700">{p.features.join(" · ")}</p>
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
    <div className="group relative aspect-[9/10] overflow-hidden rounded-[24px] bg-neutral-200">
      {images.map((src, n) => (
        <Image
          key={`${src}-${n}`}
          src={src}
          alt={`${alt} - photo ${n + 1}`}
          fill
          draggable={false}
          sizes="(max-width: 640px) 78vw, (max-width: 768px) 44vw, 380px"
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
          <button
            key={n}
            aria-label={`Photo ${n + 1}`}
            onClick={() => setI(n)}
            className="p-1"
          >
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