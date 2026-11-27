"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ---------- Photos: public/images/ me ye files rakho ----------
const NAME_PHOTOS = [
  { src: "/images/story/1.png", alt: "Hawa Mahal seen from the street, Jaipur" },
  { src: "/images/story/2.png", alt: "Pink palace facade with arched windows" },
  { src: "/images/story/3.png", alt: "Ornate painted palace gateway with steps" },
];

const CITIES = [
  { name: "Jaipur", stays: 4, src: "/images/story/city-jaipur.png" },
  { name: "Gurugram", stays: 4, src: "/images/story/city-gurugram.png" },
];

// har andar wali array = desktop par ek line
const QUESTION = [
  "We Started With One Question:",
  "Why Does A Beautiful Home So",
  "Rarely Come With Beautiful",
  "Hosting?",
];

const STORY = [
  "Seven Mirrors Stays began with a handful of properties we knew well — homes we’d have been happy to stay in ourselves. Rossiero, a bougainvillea-draped villa in Jaipur’s Ashok Nagar; Cozy Loft, three independent floors in Malviya Nagar built for easy group stays; and Lumen Royale, a designer residence in Gurugram’s DLF Phase 2.",
  "What connected them wasn’t size or price, but care — homes that felt looked-after long before a guest walked in, and still felt that way long after they left.",
  "We built Seven Mirrors Stays to manage that care properly: a resident team for every property, a direct line for every guest, and a standard we hold ourselves to whether a home has four bedrooms or one bookable floor.",
  "We’re still a small portfolio, on purpose. Every property we take on is one we’d stay in ourselves — and one our team can genuinely stay close to.",
];

const REFLECTIONS = [
  ["Privacy", "Every stay is treated as a private home first — never a shared or watched space."],
  ["Craft", "Interiors and details chosen with intent, not filled in to meet a listing checklist."],
  ["Presence", "A resident team behind every property, reachable directly — not a distant call centre."],
  ["Honesty", "Every home reflects the city it’s in, from Jaipur’s courtyards to Gurugram’s quiet residential streets."],
  ["Locality", "Every stay is treated as a private home first — never a shared or watched space."],
  ["Care", "Maintained the same way between guests as it is the day a guest checks in."],
  ["Trust", "For homeowners and guests alike — a small portfolio we can genuinely stand behind."],
];

const WRAP = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[74px]";
const EYEBROW = "text-[14px] uppercase leading-[22px]";
const HEADING = "font-playfair text-[28px] font-bold leading-[1.4] lg:text-[30px]";
const BODY = "text-[13px] leading-[18px]";

// .rise = page load par, [data-reveal] = scroll karke aane par. --d = delay
const ANIMATIONS = `
  @keyframes rise { from { opacity: 0; translate: 0 28px; } }
  .rise, [data-show] { animation: rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms) backwards; }
  [data-hide] { opacity: 0; }
  @keyframes ink { to { color: #111; } }
  .letter { color: #8f8f8f; animation: ink 0.4s ease forwards; animation-delay: calc(600ms + var(--i) * 40ms); }
  @media (prefers-reduced-motion: reduce) {
    .rise, [data-show] { animation: none; }
    .letter { color: #111; animation: none; }
    main * { transition-duration: 0s !important; }
  }
  @media print { [data-hide] { opacity: 1; } .letter { color: #111; animation: none; } }
`;
const delay = (ms) => ({ "--d": `${ms}ms` });

export default function StoryPage() {
  let letterIndex = 0; // har letter ko apni baari ka number
  const pageRef = useRef(null);

  // scroll karne par cheezein smoothly aati hain
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
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
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.setAttribute("data-hide", "");
      io.observe(el);
    });

    return () => {
      io.disconnect();
      items.forEach((el) => el.removeAttribute("data-hide"));
    };
  }, []);

  return (
    <main ref={pageRef} className="overflow-x-clip bg-white text-[#111]">
      <style>{ANIMATIONS}</style>

      {/* ---------- Hero ---------- */}
      <header className={`${WRAP} pb-14 pt-12 text-center lg:pb-[75px] lg:pt-[29px]`}>
        <p className={`${EYEBROW} rise`}>Our Story</p>
        <h1
          style={delay(100)}
          className="rise mt-[22px] font-playfair text-[30px] font-bold leading-[1.3] tracking-[-0.01em] lg:text-[38px] lg:leading-[50px]"
        >
          A Home Reflects Whoever Looks After It.
        </h1>
        <p style={delay(200)} className="rise mt-[17px] font-playfair text-[15px] font-bold leading-[26px]">
          Seven Mirrors Stays manages a small, hand-picked collection of homes in Jaipur and
          Gurugram — each one run the way we’d want a guest in our own house to be treated.
        </p>
      </header>

      {/* ---------- Our story ---------- */}
      <section className={`${WRAP} pb-16 lg:pb-[112px]`}>
        <p style={delay(300)} className={`${EYEBROW} rise`}>Our Story</p>

        <div className="mt-[22px] grid gap-8 lg:grid-cols-[690fr_602fr] lg:gap-0">
          <h2
            aria-label={QUESTION.join(" ")}
            style={delay(350)}
            className={`${HEADING} rise !leading-[48px] lg:!text-[32px]`}
          >
            {QUESTION.map((line) => (
              <span key={line} aria-hidden="true" className="xl:block">
                {line.split(" ").map((word, w) => (
                  <span key={w}>
                    {/* word ek saath rahe, beech se line na toote */}
                    <span className="inline-block">
                      {[...word].map((char, c) => (
                        <span key={c} className="letter" style={{ "--i": letterIndex++ }}>
                          {char}
                        </span>
                      ))}
                    </span>{" "}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <div style={delay(450)} className={`${BODY} rise space-y-[18px] lg:pt-[7px]`}>
            {STORY.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Where the name comes from ---------- */}
      <section className="bg-[#f6f0e5]">
        <div className={`${WRAP} grid gap-10 py-12 lg:grid-cols-[497fr_795fr] lg:gap-0 lg:py-0`}>
          <div data-reveal className="lg:self-center lg:pr-8">
            <h2 className={HEADING}>Where The Name Comes From</h2>
            <div className={`${BODY} mt-[28px] space-y-[18px]`}>
              <p>
                Rajasthan’s havelis are known for sheesh mahal work — walls set with hundreds of
                small mirrors, each catching the light a little differently, together forming one
                room.
              </p>
              <p>
                That’s the idea behind Seven Mirrors Stays. Every property in our care reflects its
                own city, its own architecture, its own way of hosting — Jaipur doesn’t look like
                Gurugram, and we don’t want it to. What stays constant across every reflection is
                the standard of care behind it.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-[15px]">
            {NAME_PHOTOS.map((photo, i) => (
              <div
                key={photo.src}
                data-reveal
                style={delay(i * 150)}
                className="group relative h-[190px] overflow-hidden rounded-[12px] bg-[#e6ddcb] sm:h-[300px] lg:h-[375px] lg:rounded-[16px]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 18vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- The seven reflections ---------- */}
      <section className={`${WRAP} pb-12 pt-16 lg:pb-[40px] lg:pt-[110px]`}>
        <div data-reveal>
          <h2 className={`${HEADING} !leading-[42px]`}>The Seven Reflections</h2>
          <p className={`${BODY} mt-[26px]`}>
            Seven things we hold every property to, whether it’s a villa, a private floor, or a
            designer residence
          </p>
        </div>

        <ol className="mt-[24px]">
          {REFLECTIONS.map(([title, text], i) => (
            <li
              key={title}
              data-reveal
              className="grid grid-cols-[48px_1fr] items-center gap-x-3 gap-y-2 border-b border-[#efefef] py-7 transition-colors duration-300 hover:bg-[#f6f0e5]/60 lg:h-[113px] lg:grid-cols-[190fr_374fr_728fr] lg:gap-0 lg:py-0"
            >
              <span className="text-[20px] font-bold tracking-[-0.02em] lg:text-[24px]">0{i + 1}.</span>
              <h3 className="text-[20px] font-bold tracking-[-0.02em] lg:text-[24px]">{title}</h3>
              <p className="col-start-2 text-[13px] leading-[1.6] lg:col-start-3">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Where we stay ---------- */}
      <section className={`${WRAP} py-14 lg:pb-[76px] lg:pt-[84px]`}>
        <div data-reveal>
          <h2 className={`${HEADING} !leading-[42px]`}>
            Where we <em className="font-normal text-[#999]">Stay</em>
          </h2>
          <p className="mt-[18px] text-[15px] leading-[28px] text-[#6f6f6f] lg:text-[18px]">
            Two cities today. Choose one to jump straight to those homes.
          </p>
        </div>

        <div className="mt-[23px] grid gap-5 md:grid-cols-2 md:gap-[30px]">
          {CITIES.map((city, i) => (
            <div key={city.name} data-reveal style={delay(i * 150)}>
              <Link
                href={`/properties?city=${city.name}`}
                className="group relative block h-[220px] overflow-hidden rounded-[16px] bg-[#3b3b3b] text-white transition duration-500 hover:-translate-y-1 hover:shadow-2xl lg:h-[300px]"
              >
                <Image
                  src={city.src}
                  alt={`Stays in ${city.name}`}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <span className="absolute bottom-[16px] left-[15px]">
                  <span className="block font-playfair text-[18px] font-bold">{city.name}</span>
                  <span className="mt-[6px] block text-[11px] uppercase">{city.stays} stays available</span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Our team ---------- */}
      <section className={`${WRAP} grid gap-5 pb-16 lg:grid-cols-2 lg:gap-0 lg:pb-[140px]`}>
        <h2 data-reveal className={`${HEADING} uppercase lg:pt-[6px]`}>Our Team</h2>
        <p data-reveal style={delay(150)} className="max-w-[610px] text-[14px] leading-[22px] lg:pl-[15px]">
          Every Seven Mirrors property is looked after by a team based in that city, not a shared
          helpline. They handle everything from check-in to housekeeping to the small requests that
          come up mid-stay — so by the time a guest arrives, the only thing left to do is settle in.
        </p>
      </section>
    </main>
  );
}
