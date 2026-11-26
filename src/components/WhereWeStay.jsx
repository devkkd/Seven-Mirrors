
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ---------------- data ---------------- */

const HEADING = [
  [
    { w: "Where", dark: true },
    { w: "We", dark: true },
    { w: "Stay", dark: true },
  ],
  [
    { w: "Two", dark: true },
    { w: "Cities" },
    { w: "Beautiful" },
    { w: "Homes" },
  ],
  [
    { w: "Choose" },
    { w: "Yours" },
  ],
];

let order = 0;

const LINES = HEADING.map((line) =>
  line.map((word) => ({
    ...word,
    letters: [...word.w].map((ch) => ({
      ch,
      order: word.dark ? null : order++,
    })),
  }))
);

const LETTER_DELAY = 50;
const START_DELAY = 200;

const CITIES = [
  {
    id: "jaipur",
    name: "JAIPUR",
    count: 56,
    desc: "Stay in thoughtfully selected homes that capture the character, comfort, and charm of Jaipur.",
    image: "/images/gurgram.png",
    href: "/properties?city=jaipur",
  },
  {
    id: "gurugram",
    name: "GURUGRAM",
    count: 24,
    desc: "Stay in thoughtfully selected homes that bring modern comfort to the heart of Gurugram.",
    image: "/images/jaipur.png",
    href: "/properties?city=gurugram",
  },
];

/* ---------------- useInView hook ---------------- */

function useInView(threshold = 0.6) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || seen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, seen]);

  return [ref, seen];
}

/* ---------------- city panel ---------------- */



function CityPanel({ city }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rafId = null;

    const updateAnimation = () => {
      const rect = card.getBoundingClientRect();
      const viewportWidth =
        document.documentElement.clientWidth || window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Initial card width
      const initialWidth = Math.min(viewportWidth * 0.92, 1200);

      // Scroll progress: 0 to 1
      const progress = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight - rect.top) / (viewportHeight * 0.65)
        )
      );

      // Smooth width expansion (never exceeding client viewport width)
      const currentWidth = Math.min(
        viewportWidth,
        initialWidth + (viewportWidth - initialWidth) * progress
      );

      // Smooth rounded corners
      const radius = 24 * (1 - progress);

      // Apply styles directly for smooth performance
      card.style.width = `${currentWidth}px`;
      card.style.maxWidth = "100%";
      card.style.borderRadius = `${radius}px`;

      // Image zoom
      const image = card.querySelector(".city-card-image");

      if (image) {
        const scale = 1 + progress * 0.08;
        image.style.transform = `scale(${scale})`;
      }
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(updateAnimation);
    };

    updateAnimation();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      href={city.href}
      className="group relative mx-auto block h-[300px] overflow-hidden sm:h-[420px] lg:h-[500px]"
      style={{
        width: "92%",
        maxWidth: "1200px",
        borderRadius: "24px",
      }}
    >
      {/* Background Image */}
      <Image
        src={city.image}
        alt={`${city.name} exclusive stays`}
        fill
        priority={city.id === "jaipur"}
        sizes="100vw"
        className="city-card-image object-cover"
      />

      {/* Bottom Information Bar */}
      <div className="absolute bottom-5 left-1/2 w-[92%] -translate-x-1/2 sm:bottom-7 sm:w-[72%] lg:bottom-8 lg:w-[64%]">
        <div className="flex items-center rounded-full bg-white px-4 py-3 shadow-lg sm:px-6 sm:py-4">

          {/* City Name */}
          <div className="shrink-0 pr-3 sm:pr-6">
            <h3 className="font-playfair text-base font-bold text-black sm:text-xl">
              {city.name}
            </h3>
          </div>

          {/* Divider */}
          <div className="h-9 w-px shrink-0 bg-gray-300 sm:h-11" />

          {/* Description */}
          <div className="min-w-0 flex-1 px-3 sm:px-5">
            <p className="text-[8px] font-bold leading-tight text-black sm:text-[12px]">
              {city.count} Exclusive Stays
            </p>

            <p className="mt-1 line-clamp-2 text-[7px] leading-relaxed text-gray-600 sm:text-[9px]">
              {city.desc}
            </p>
          </div>

          {/* Button */}
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-black px-3 py-2 text-[7px] text-white transition-colors duration-300 group-hover:bg-[#B5651D] sm:px-5 sm:py-3 sm:text-[9px]">
            See All Stays
            <ArrowRight size={10} />
          </span>
        </div>
      </div>
    </Link>
  );
}



/* ---------------- section ---------------- */

export default function WhereWeStay() {
  const [headRef, seen] = useInView(0.6);

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24">
      {/* Heading */}
      <h2
        ref={headRef}
        aria-label="Where We Stay. Two Cities Beautiful Homes. Choose Yours."
        className="mb-12 px-5 text-center font-playfair text-[28px] font-bold leading-[1.4] sm:text-[36px] lg:mb-16 lg:text-[44px]"
      >
        <span aria-hidden="true">
          {LINES.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => (
                <span key={wi}>
                  <span className="inline-block whitespace-nowrap">
                    {word.letters.map((letter, i) => (
                      <span
                        key={i}
                        className={`transition-colors duration-700 ease-out motion-reduce:transition-none ${
                          word.dark || seen
                            ? "text-[#0b0b0b]"
                            : "text-[#9b9b9b]"
                        }`}
                        style={{
                          transitionDelay: word.dark
                            ? "0ms"
                            : `${START_DELAY + letter.order * LETTER_DELAY}ms`,
                        }}
                      >
                        {letter.ch}
                      </span>
                    ))}
                  </span>

                  {wi < line.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          ))}
        </span>
      </h2>

      {/* City panels */}
     
{/* City Panels */}
<div className="flex flex-col gap-10">
  {CITIES.map((city) => (
    <CityPanel key={city.id} city={city} />
  ))}
</div>

    </section>
  );
}
