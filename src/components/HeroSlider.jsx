"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Share,
  Volume2,
  VolumeX,
} from "lucide-react";


const SLIDES = [
  {
    id: 1,
    video: "/images/video-1.mp4",
    poster: "/images/hero-1.png",
    eyebrow: "Private Villa Stays Across India",
    title: "Stay In The Extraordinary",
    subtitle:
      "Curated Private Villas Across India's Most Coveted Destinations - Exclusively Yours.",
  },
  {
    id: 2,
    video: "/images/video-2.mp4",
    poster: "/images/hero-2.png",
    eyebrow: "Heritage Havelis In Rajasthan",
    title: "Live Like Royalty",
    subtitle: "Centuries-old architecture, reimagined for modern luxury.",
  },
  {
    id: 3,
    video: "/images/video-1.mp4",
    poster: "/images/hero-3.png",
    eyebrow: "Beachfront Retreats",
    title: "Where The Sea Meets Serenity",
    subtitle: "Wake up to the sound of waves in your own private villa.",
  },
  {
    id: 4,
    video: "/images/video-2.mp4",
    poster: "/images/hero-2.png",
    eyebrow: "Himalayan Escapes",
    title: "Find Your Quiet",
    subtitle: "Mountain homes with views that stay with you long after.",
  },
];

const N = SLIDES.length;
const GAP = 12; // px gap between slides
const AUTOPLAY_MS = 4000;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const mod = (n, m) => ((n % m) + m) % m;

// Position of slide i relative to the active slide: 0 = centre, ±1 = peeking, ±2 = hidden
function offsetOf(i, active, dir) {
  const raw = mod(i - active, N);
  if (raw === 0) return 0;
  if (raw === 1) return 1;
  if (raw === N - 1) return -1;
  return dir > 0 ? -2 : 2; // hidden slides continue in the direction of travel
}

const reveal = (on, delay) => ({
  opacity: on ? 1 : 0,
  transform: on ? "translateY(0)" : "translateY(24px)",
  transition: `opacity 700ms ${EASE} ${on ? delay : 0}ms, transform 700ms ${EASE} ${on ? delay : 0}ms`,
});

export default function HeroSlider() {
  const [{ index, dir }, setNav] = useState({ index: 0, dir: 1 });
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const videoRefs = useRef([]);
  const prev = useRef({ index: 0, dir: 1 });
  const touchX = useRef(null);
  const [hovered, setHovered] = useState(false);
const [searchOpen, setSearchOpen] = useState(false);

  const step = useCallback(
    (d) => setNav((s) => ({ index: mod(s.index + d, N), dir: d })),
    []
  );
  const goTo = (i) =>
    setNav((s) => ({ index: i, dir: i > s.index ? 1 : -1 }));

  // remember previous state (used to detect slides that wrap around)
  useEffect(() => {
    prev.current = { index, dir };
  });

  useEffect(() => {
  if (!playing || hovered || searchOpen) return;
  const t = setTimeout(() => step(1), AUTOPLAY_MS);
  return () => clearTimeout(t);
}, [index, playing, hovered, searchOpen, step]);

  // play only the active video
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = muted;
      if (i === index && playing) v.play().catch(() => {});
      else v.pause();
    });
  }, [index, playing, muted]);

  // autoplay
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => step(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, playing, step]);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const share = async () => {
    const data = { title: "Seven Mirror Stays", url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(data.url);
    } catch {}
  };

  return (
    <section
  aria-roledescription="carousel"
  aria-label="Featured stays"
  className="relative z-20 w-full overflow-x-clip py-3 [container-type:inline-size] overflow-hidden"
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
  onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(diff) > 50) step(diff < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="relative h-[clamp(440px,72vh,720px)] [--sw:92cqw] md:[--sw:78.4cqw] overflow-hidden">
        {/* ---------- Slides ---------- */}
        {SLIDES.map((s, i) => {
          const offset = offsetOf(i, index, dir);
          const prevOffset = offsetOf(i, prev.current.index, prev.current.dir);
          const wrapped = Math.abs(offset - prevOffset) > 2;
          const isActive = offset === 0;
          const visible = Math.abs(offset) <= 1;

          return (
            <article
              key={s.id}
              aria-hidden={!isActive}
              onClick={() => visible && !isActive && goTo(i)}
              className={`absolute top-0 h-full overflow-hidden rounded-[28px] bg-neutral-900 ${
                visible && !isActive ? "cursor-pointer" : ""
              }`}
              style={{
                width: "var(--sw)",
                left: "calc(50% - var(--sw) / 2)",
                zIndex: isActive ? 2 : 1,
                transform: `translateX(calc(${offset} * (var(--sw) + ${GAP}px)))`,
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? "auto" : "none",
                transition: wrapped
                  ? "opacity 600ms ease"
                  : `transform 900ms ${EASE}, opacity 600ms ease`,
              }}
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src={s.video}
                poster={s.poster}
                muted
                loop
                playsInline
                preload={Math.abs(offset) <= 1 ? "auto" : "metadata"}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  transform: isActive ? "scale(1)" : "scale(1.08)",
                  transition: "transform 1600ms ease-out",
                }}
              />

              {/* readability gradient + dim for side slides */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />
              <div
                className="absolute inset-0 bg-black/40 transition-opacity duration-700"
                style={{ opacity: isActive ? 0 : 1 }}
              />

              {/* slide text */}
              <div className="absolute inset-x-0 bottom-20 px-6 text-center text-white">
                <p
                  className="text-[11px] uppercase tracking-[0.2em] md:text-[13px]"
                  style={reveal(isActive, 500)}
                >
                  {s.eyebrow}
                </p>
                <h2
                  className="mt-3 font-playfair text-3xl font-semibold md:text-[44px] md:leading-[1.15]"
                  style={reveal(isActive, 650)}
                >
                  {s.title}
                </h2>
                <p
                  className="mx-auto mt-3 max-w-xl text-xs text-white/85 md:text-sm"
                  style={reveal(isActive, 800)}
                >
                  {s.subtitle}
                </p>
              </div>
            </article>
          );
        })}

        {/* ---------- Controls (aligned to the centre slide) ---------- */}
        <div
          className="pointer-events-none absolute top-0 z-10 h-full"
          style={{ width: "var(--sw)", left: "calc(50% - var(--sw) / 2)" }}
        >
          <SearchBar onOpenChange={setSearchOpen} />

          {/* arrows */}
          <button
            aria-label="Previous slide"
            onClick={() => step(-1)}
            className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 p-2 text-white/80 transition hover:scale-110 hover:text-white md:left-5"
          >
            <ChevronLeft strokeWidth={1.25} className="h-8 w-8" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => step(1)}
            className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/80 transition hover:scale-110 hover:text-white md:right-5"
          >
            <ChevronRight strokeWidth={1.25} className="h-8 w-8" />
          </button>

          {/* play / pause */}
          <button
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((p) => !p)}
            className="pointer-events-auto absolute bottom-4 left-4 flex h-9 w-12 items-center justify-center rounded-full bg-white text-black shadow-md transition hover:scale-105"
          >
            {playing ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Play className="h-4 w-4 fill-current" />
            )}
          </button>

          {/* dots */}
          <div className="pointer-events-auto absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* sound + share */}
          <div className="pointer-events-auto absolute bottom-4 right-4 flex h-9 items-center gap-4 rounded-full bg-white px-4 text-black shadow-md">
            <button
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={() => setMuted((m) => !m)}
              className="transition hover:scale-110"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              aria-label="Share"
              onClick={share}
              className="transition hover:scale-110"
            >
              <Share className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

