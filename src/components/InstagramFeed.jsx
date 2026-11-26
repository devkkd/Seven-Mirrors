"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Copy, Play } from "lucide-react";

/* ---------------- data (sample: apne posts lagao) ---------------- */

const HANDLE = "7_mirror_bnb";
const PROFILE_URL = `https://www.instagram.com/${HANDLE}/`;

const PH = ["/images/hero-1.png", "/images/hero-2.png", "/images/hero-3.png"];

const POSTS = [
  { id: 1, type: "reel", image: PH[0], href: PROFILE_URL }, // -> "/images/instagram/1.jpg"
  { id: 2, type: "carousel", image: PH[1], href: PROFILE_URL },
  { id: 3, type: "carousel", image: PH[2], href: PROFILE_URL },
  { id: 4, type: "carousel", image: PH[0], href: PROFILE_URL },
  { id: 5, type: "carousel", image: PH[1], href: PROFILE_URL },
];
// href me har post ka direct link daalo: https://www.instagram.com/p/XXXXXXXX/

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

// lucide ke naye versions me brand icons nahi hain, isliye inline SVG
function InstagramGlyph({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

/* ---------------- section ---------------- */

export default function InstagramFeed() {
  const [ref, seen] = useInView(0.15);

  return (
    <section ref={ref} className="bg-white py-14 md:py-20">
      {/* heading + follow row */}
      <div
        className={`px-5 text-center transition-all duration-1000 ease-out ${
          seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <h2 className="font-playfair text-[30px] font-bold leading-tight text-neutral-950 md:text-[40px]">
          Stay Inspired, Follow Along
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-[12px] leading-relaxed text-neutral-800 md:text-[13px]">
          Discover beautiful stays, hidden escapes, and unforgettable moments from Seven Mirror
          Stays. Follow us on Instagram for travel inspiration, new properties, guest experiences,
          and a glimpse into life at our stays.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[13px] text-neutral-800 transition-opacity hover:opacity-70"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)] text-white">
              <InstagramGlyph className="h-5 w-5" />
            </span>
            @{HANDLE}
          </a>

          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#1a1a1a] px-8 py-3.5 text-[13px] font-semibold text-white transition duration-300 hover:scale-105 hover:bg-black active:scale-95"
          >
            Follow us
          </a>
        </div>
      </div>

      {/* tiles */}
      <div className="mx-auto mt-10 max-w-[1360px] md:mt-12 lg:px-[5.4%]">
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 scroll-px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:snap-none lg:grid-cols-5 lg:gap-0 lg:overflow-hidden lg:rounded-[14px] lg:px-0">
          {POSTS.map((post, i) => (
            <div
              key={post.id}
              className={`w-[62vw] shrink-0 snap-start transition-all duration-700 ease-out sm:w-[34vw] lg:w-auto ${
                seen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              style={{ transitionDelay: seen ? `${300 + i * 100}ms` : "0ms" }}
            >
              <Tile post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- tile ---------------- */

function Tile({ post }) {
  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View Instagram ${post.type === "reel" ? "reel" : "post"} ${post.id}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-neutral-200 lg:rounded-none"
    >
      <Image
        src={post.image}
        alt={`Instagram post ${post.id}`}
        fill
        sizes="(max-width: 640px) 62vw, (max-width: 1024px) 34vw, 20vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* type icon (top-right) */}
      <span className="absolute right-2.5 top-2.5 text-white drop-shadow-md">
        {post.type === "reel" ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-[5px] border-[1.5px] border-white">
            <Play className="h-2.5 w-2.5 fill-white text-white" />
          </span>
        ) : (
          <Copy className="h-5 w-5" strokeWidth={1.75} />
        )}
      </span>

      {/* hover overlay */}
      <span className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <InstagramGlyph className="h-8 w-8 text-white" />
      </span>
    </a>
  );
}