"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Design me "Haveli & Hearth" likha tha, apna brand naam yahan badlo
const BRAND = "Haveli & Hearth";

function useInView(threshold = 0.25) {
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

export default function AddYourProperty() {
  const [ref, seen] = useInView(0.25);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-white">
      {/* background image */}
      <div className="relative h-64 w-full sm:h-80 lg:absolute lg:inset-0 lg:h-auto">
        <Image
          src="/images/hero-2.png" // -> "/images/add-property.jpg"
          alt="Elegant living room interior"
          fill
          sizes="100vw"
          className={`object-cover transition-transform duration-[1800ms] ease-out ${
            seen ? "scale-100" : "scale-110"
          }`}
        />
      </div>

      {/* content */}
      <div className="relative -mt-12 px-5 pb-10 lg:mt-0 lg:flex lg:min-h-[clamp(520px,48vw,720px)] lg:items-center lg:px-[5.4%] lg:py-7">
        <div
          className={`rounded-[28px] bg-[#1e1e1e] px-7 py-9 text-white shadow-2xl transition-all duration-1000 ease-out lg:w-[34.4vw] lg:min-w-[380px] lg:max-w-[560px] lg:px-9 lg:py-11 ${
            seen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-[13px] font-light uppercase tracking-wide text-white/90 lg:text-[14px]">
            Add Your Property
          </p>

          <h2 className="mt-5 font-playfair text-[30px] font-bold leading-[1.35] sm:text-[34px] lg:mt-6 lg:text-[34px] xl:text-[40px]">
            <span className="block">Give Your Second Home</span>
            <span className="block">Its Best Life</span>
          </h2>

          <p className="mt-5 text-[12px] font-light leading-[1.7] text-white/90 lg:mt-6 lg:text-[13px]">
            With {BRAND}, your property becomes more than an empty house between visits it&rsquo;s
            a well-kept, thoughtfully hosted stay, managed end to end by a team that treats it like
            their own.
          </p>

          <div className="mt-5 text-[12px] leading-[1.7] text-white/90 lg:text-[13px]">
            <p className="font-semibold text-white">Steady income, zero hassle</p>
            <p className="font-light">
              Every detail - from housekeeping to guest handling - fully managed by our resident
              team.
            </p>
          </div>

          <p className="mt-4 text-[12px] font-semibold text-white lg:text-[13px]">
            Currently managing homes in Jaipur &amp; Gurugram
          </p>

          <Link
            href="/add-your-property" // apna route
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 text-[14px] font-medium text-black transition duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] active:scale-95"
          >
            Enquire For Partner
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}