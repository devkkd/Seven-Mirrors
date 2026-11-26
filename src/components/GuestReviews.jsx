"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

/* ---------------- data (sample: apne real reviews lagao) ---------------- */

const REVIEWS = [
  {
    id: 1,
    title: "A Beautiful Stay with an Amazing Experience",
    text: "We had a wonderful stay at Seven Mirror Stays. The property was beautifully maintained, comfortable, and exactly as shown in the photos. The location was convenient, and the entire check-in experience was smooth.",
    name: "Priya S.",
    rating: 5,
    stay: "Stayed for 2 nights · September 2026",
    image: "/images/reviews/2.png",
  },
  {
    id: 2,
    title: "A Beautiful Stay with an Amazing Experience",
    text: "We had a wonderful stay at Seven Mirror Stays. The property was beautifully maintained, comfortable, and exactly as shown in the photos. The location was convenient, and the entire check-in experience was smooth.",
    name: "Rahul S.",
    rating: 5,
    stay: "Stayed for 2 nights · September 2026",
    image: "/images/reviews/1.png",
  },
  {
    id: 3,
    title: "A Beautiful Stay with an Amazing Experience",
    text: "We had a wonderful stay at Seven Mirror Stays. The property was beautifully maintained, comfortable, and exactly as shown in the photos. The location was convenient, and the entire check-in experience was smooth.",
    name: "Rohit M.",
    rating: 5,
    stay: "Stayed for 2 nights · September 2026",
    image: "/images/reviews/3.png",
  },
  {
    id: 4,
    title: "Felt Like Home, Only Better",
    text: "Spotless rooms, thoughtful touches and a team that actually looks after you. Check-in was effortless and the home matched every photo.",
    name: "Shubham M.",
    rating: 5,
    stay: "Stayed for 3 nights · October 2026",
    image: "/images/reviews/1.png",
  },
];

const GAP = 32; // px (mr-8)

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

export default function GuestReviews() {
  const [sectionRef, seen] = useInView(0.15);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [dragging, setDragging] = useState(false);

  const scrollerRef = useRef(null);
  const thumbRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  /* progress bar + arrow states (DOM se direct, scroll par re-render nahi) */
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
  }, [update]);

  const scrollByItem = (dirn) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector("[data-item]");
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
    <section ref={sectionRef} className="overflow-x-clip bg-white py-14 md:py-20">
      {/* ---------- header ---------- */}
      <div
        className={`flex flex-col gap-8 px-5 transition-all duration-1000 ease-out lg:flex-row lg:items-start lg:justify-between lg:px-[5.2%] ${
          seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="flex items-start gap-3 md:gap-4">
          <span
            aria-hidden="true"
            className="select-none font-playfair text-[100px] leading-[0.75] text-[#E7E1D5] md:text-[140px]"
          >
            “
          </span>
          <div className="pt-1 md:pt-2">
            <h2 className="font-playfair text-[24px] font-bold leading-tight text-neutral-950 md:text-[34px]">
              Why Our Guests Love Staying With Us
            </h2>
            <p className="mt-3 max-w-xl text-[11px] leading-relaxed text-neutral-800 md:text-[12px]">
              Not A Room In A Building We Manage From A Distance A Home Someone From Our Team
              Actually Looks After.
            </p>
          </div>
        </div>

        <div className="lg:text-right">
          <p className="font-playfair text-[16px] font-semibold text-neutral-950 md:text-[18px]">
            Consistently Highly Rated Across
          </p>
          <RatingLogos />
        </div>
      </div>

      {/* ---------- slider ---------- */}
      <div
        className={`mt-10 transition-all delay-200 duration-1000 ease-out md:mt-12 ${
          seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
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
            if (drag.current.moved) {
              e.preventDefault();
              e.stopPropagation();
              drag.current.moved = false;
            }
          }}
          className={`flex select-none overflow-x-auto px-5 scroll-px-5 lg:px-[5.2%] lg:scroll-px-[5.2%] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            dragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
          }`}
        >
          {REVIEWS.map((r) => (
            <ReviewItem key={r.id} r={r} />
          ))}
        </div>
      </div>

      {/* ---------- controls ---------- */}
      <div className="mx-auto mt-10 flex w-fit items-center gap-5">
        <button
          aria-label="Previous reviews"
          disabled={atStart}
          onClick={() => scrollByItem(-1)}
          className="p-1 text-neutral-900 transition hover:-translate-x-0.5 disabled:opacity-30 disabled:hover:translate-x-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="relative h-0.5 w-44 bg-[#E7E1D5] md:w-[180px]">
          <div ref={thumbRef} className="absolute inset-y-0 left-0 w-[55%] bg-[#1a1a1a]" />
        </div>

        <button
          aria-label="Next reviews"
          disabled={atEnd}
          onClick={() => scrollByItem(1)}
          className="p-1 text-neutral-900 transition hover:translate-x-0.5 disabled:opacity-30 disabled:hover:translate-x-0"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

/* ---------------- review item ---------------- */

function ReviewItem({ r }) {
  return (
    <article
      data-item
      className="mr-8 flex w-[85vw] shrink-0 snap-start flex-col gap-5 border-r border-black/15 pr-8 last:mr-0 last:border-r-0 sm:w-[540px] sm:flex-row sm:gap-6"
    >
      <div className="relative h-60 w-full shrink-0 overflow-hidden rounded-[18px] bg-neutral-200 sm:h-auto sm:w-[34%] sm:aspect-[4/5]">
        <Image
          src={r.image}
          alt={r.name}
          fill
          draggable={false}
          sizes="(max-width: 640px) 85vw, 190px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col text-neutral-900">
        <h3 className="text-[14px] font-bold leading-snug md:text-[15px]">
          &ldquo;{r.title}&rdquo;
        </h3>
        <p className="mt-2 text-[12px] leading-[1.7] text-neutral-800 md:text-[13px]">{r.text}</p>

        <div className="mt-auto pt-4 text-[12px] font-semibold md:text-[13px]">
          <p>- {r.name}</p>
          <p className="mt-1 tracking-tight">
            {"★".repeat(r.rating)} {r.rating.toFixed(1)}
          </p>
          <p className="mt-1">{r.stay}</p>
        </div>
      </div>
    </article>
  );
}

/* ---------------- rating logos ---------------- */
// Official logos ke liye: <Image src="/images/logos/google.svg" ... /> se replace kar do

function RatingLogos() {
  const google = [
    ["G", "#4285F4"],
    ["o", "#EA4335"],
    ["o", "#FBBC05"],
    ["g", "#4285F4"],
    ["l", "#34A853"],
    ["e", "#EA4335"],
  ];

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
      {/* stars */}
      <div className="flex gap-1" aria-label="5 star rating">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} strokeWidth={0} className="h-[18px] w-[18px] fill-[#22b84c]" />
        ))}
      </div>

      {/* Google */}
      <span className="font-mona text-[22px] font-medium tracking-tight" aria-label="Google">
        {google.map(([ch, color], i) => (
          <span key={i} style={{ color }}>
            {ch}
          </span>
        ))}
      </span>

      {/* Trustpilot */}
      <span className="flex items-center gap-1 font-mona text-[18px] font-semibold text-neutral-900">
        <Star strokeWidth={0} className="h-5 w-5 fill-[#00b67a]" />
        Trustpilot
      </span>

      {/* airbnb */}
      <span className="font-mona text-[20px] font-medium tracking-tight text-[#ff5a5f]">
        airbnb
      </span>
    </div>
  );
}