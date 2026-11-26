"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export default function Newsletter() {
  const [ref, seen] = useInView(0.2);
  const inputId = useId();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      // TODO: apna API call lagao, jaise:
      // const res = await fetch("/api/newsletter", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: email.trim() }),
      // });
      // if (!res.ok) throw new Error("Request failed");
      await new Promise((r) => setTimeout(r, 800)); // demo delay, API lagane par hata do

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-white px-5 py-10 md:px-[5.4%] md:py-14">
      <div
        ref={ref}
        className={`mx-auto max-w-[1360px] overflow-hidden rounded-[24px] bg-[#1e1e1e] transition-all duration-1000 ease-out lg:flex lg:min-h-[clamp(420px,36vw,520px)] lg:items-center lg:justify-end lg:bg-transparent lg:px-[5.8%] lg:py-7 ${
          seen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        } relative isolate`}
      >
        {/* background image */}
        <div className="relative h-56 w-full sm:h-72 lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
          <Image
            src="/images/hero-3.png" // -> "/images/newsletter.jpg"
            alt="Bright living room overlooking the sea"
            fill
            sizes="(max-width: 1024px) 100vw, 1360px"
            className={`object-cover transition-transform duration-[1800ms] ease-out ${
              seen ? "scale-100" : "scale-110"
            }`}
          />
        </div>

        {/* dark card */}
        <div
          className={`px-6 py-8 text-white transition-all delay-300 duration-1000 ease-out sm:px-8 lg:w-[30%] lg:min-w-[380px] lg:rounded-[24px] lg:bg-[#1e1e1e] lg:px-9 lg:py-6 ${
            seen
              ? "translate-x-0 translate-y-0 opacity-100"
              : "translate-y-6 opacity-0 lg:translate-x-12 lg:translate-y-0"
          }`}
        >
          <p className="text-[13px] font-light text-white/90 lg:text-[14px]">Newsletter</p>

          <h2 className="mt-4 font-playfair text-[32px] font-bold leading-tight sm:text-[36px] lg:mt-3 lg:text-[38px] xl:text-[40px]">
            Stay In The Know
          </h2>

          <p className="mt-3 text-[12px] font-light leading-[1.7] text-white/90 lg:text-[13px]">
            Get Weekly Travel Inspiration, Exclusive Offers, And Early Access To Our Newest Homes,
            Destinations, And Experiences.
          </p>

          {status === "success" ? (
            <div className="mt-10 flex items-start gap-3" role="status">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <Check className="h-4 w-4" />
              </span>
              <p className="text-[14px] leading-relaxed text-white">
                You&rsquo;re on the list. Watch your inbox for our next letter.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-6">
              <label htmlFor={inputId} className="block text-[13px] font-light text-white/90">
                Email Address
              </label>
              <input
                id={inputId}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter Your Email Address"
                autoComplete="email"
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? `${inputId}-error` : undefined}
                className={`mt-2 w-full border-b bg-transparent pb-3 pt-1 text-[13px] text-white outline-none transition-colors placeholder:text-white/50 focus:border-white ${
                  status === "error" ? "border-red-400" : "border-white/35"
                }`}
              />
              <p
                id={`${inputId}-error`}
                role="alert"
                className={`mt-2 min-h-[18px] text-[12px] text-red-300 transition-opacity ${
                  status === "error" ? "opacity-100" : "opacity-0"
                }`}
              >
                {status === "error" ? error : ""}
              </p>

              <p className="mt-3 text-[12px] font-light text-white/90 lg:text-[13px]">
                By Subscribing, You Agree To Our{" "}
                <Link href="/terms" className="font-bold text-white hover:underline">
                  Terms
                </Link>{" "}
                And{" "}
                <Link href="/privacy-policy" className="font-bold text-white hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-9 py-3.5 text-[14px] font-semibold text-black transition duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {status === "loading" ? "Submitting..." : "Submit"}
                {status !== "loading" && (
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}