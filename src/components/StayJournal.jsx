"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const POSTS = [
  {
    slug: "four-days-in-jaipur",
    title: "Four Days in Jaipur: A Local's Guide to the Pink City",
    excerpt: "Where to eat, wander and watch the sunset, mapped around a stay at Rossiero.",
    image: "/images/stay-1.png", // -> "/images/blog/jaipur-guide.jpg"
  },
  {
    slug: "what-fully-managed-means",
    title: 'What "Fully Managed" Actually Means for Your Second Home',
    excerpt: "A behind-the-scenes look at how we care for a property between guest stays.",
    image: "/images/stay-4.png", // -> "/images/blog/fully-managed.jpg"
  },
  {
    slug: "corporate-stays-in-gurugram",
    title: "Corporate Stays in Gurugram: Why Guests Are Choosing Residences",
    excerpt: "Inside the appeal of Lumen Royale for business travel, relocations and long stays.",
    image: "/images/stay-3.png", // -> "/images/blog/corporate-stays.jpg"
  },
  {
    slug: "staycations-in-gurugram",
    title: "Staycations in Gurugram: Weekend Escapes Without the Flight",
    excerpt: "Why a well-run home in the city beats a hotel for short, restful breaks.",
    image: "/images/stay-2.png", // -> "/images/blog/staycations.jpg"
  },
];

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

export default function StayJournal() {
  const [ref, seen] = useInView(0.15);

  return (
    <section ref={ref} className="bg-white py-14 md:py-20">
      {/* heading */}
      <div
        className={`px-5 text-center transition-all duration-1000 ease-out ${
          seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <h2 className="font-playfair text-[30px] font-bold leading-tight text-neutral-950 md:text-[40px]">
          The Stay Journal
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[12px] text-neutral-800 md:text-[13px]">
          Travel Stories, Local Guides, And Thoughtful Inspiration For Your Next Escape
        </p>
      </div>

      {/* grid */}
      <div className="mx-auto mt-10 max-w-[1320px] px-5 md:mt-12 md:px-10">
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {POSTS.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} seen={seen} />
          ))}
        </div>
      </div>

      {/* see all */}
      <div className="mt-12 flex justify-center px-5">
        <Link
          href="/blog" // apna route
          className="group flex items-center gap-2 rounded-full bg-[#1a1a1a] px-9 py-4 text-[13px] font-semibold text-white transition duration-300 hover:scale-105 hover:bg-black active:scale-95"
        >
          See All Blogs
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

/* ---------------- card ---------------- */

function PostCard({ post, index, seen }) {
  const href = `/blog/${post.slug}`; // apna route

  return (
    <article
      className={`flex flex-col transition-all duration-700 ease-out ${
        seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: seen ? `${200 + index * 120}ms` : "0ms" }}
    >
      <Link
        href={href}
        className="group relative block aspect-[4/3] overflow-hidden rounded-[18px] bg-neutral-200"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Link>

      <h3 className="mt-5 line-clamp-2 font-playfair text-[18px] font-bold leading-snug text-neutral-950">
        <Link href={href} className="transition-opacity hover:opacity-70">
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 line-clamp-2 text-[12px] leading-relaxed text-neutral-800 md:text-[13px]">
        {post.excerpt}
      </p>

      <div className="mt-auto pt-5">
        <Link
          href={href}
          className="group/btn inline-flex items-center gap-1.5 rounded-full border border-neutral-400 px-6 py-2.5 text-[12px] text-neutral-900 transition duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
        >
          Read More
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}