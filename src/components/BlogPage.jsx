"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// .rise = page load par, [data-reveal] = scroll karke aane par. --d = delay
const ANIMATIONS = `
  @keyframes rise { from { opacity: 0; translate: 0 32px; } }
  .rise, [data-show] { animation: rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms) backwards; }
  [data-hide] { opacity: 0; }
  @media (prefers-reduced-motion: reduce) {
    .rise, [data-show] { animation: none; }
    main * { transition-duration: 0s !important; }
  }
  @media print { [data-hide] { opacity: 1; } }
`;
const delay = (ms) => ({ "--d": `${ms}ms` });

export default function BlogPage({ posts }) {
  const pageRef = useRef(null);

  // neeche wale cards scroll karne par smoothly aate hain
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
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("rise"); // pehle se screen par hai, to load animation
        return;
      }
      el.setAttribute("data-hide", "");
      io.observe(el);
    });

    return () => {
      io.disconnect();
      items.forEach((el) => el.removeAttribute("data-hide"));
    };
  }, []);

  return (
    <main ref={pageRef} className="overflow-x-clip bg-white pb-20 text-[#111]">
      <style>{ANIMATIONS}</style>

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[74px]">
        {/* ---------- Heading ---------- */}
        <header className="pb-12 pt-10 text-center lg:pb-[53px] lg:pt-[20px]">
          <p className="rise text-[14px] uppercase leading-[22px]">Blogs</p>
          <h1
            style={delay(100)}
            className="rise mt-[22px] font-playfair text-[30px] font-bold leading-[1.3] tracking-[-0.01em] lg:text-[38px] lg:leading-[48px]"
          >
            The Stay Journal
          </h1>
          <p style={delay(200)} className="rise mt-[14px] font-playfair text-[15px] font-bold capitalize leading-[24px]">
            Travel stories, local guides, and thoughtful inspiration for your next escape
          </p>
        </header>

        {/* ---------- Blog cards ---------- */}
        <ul className="grid gap-x-[30px] gap-y-[49px] sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, i) => (
            <li key={post.slug} data-reveal style={delay((i % 4) * 110)}>
              <article className="group flex h-full flex-col">
                <Link
                  href={`/blogs/${post.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative block aspect-[4/3] overflow-hidden rounded-[16px] bg-[#f6f0e5] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-xl"
                >
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </Link>

                <h2 className="mt-[17px] font-playfair text-[18px] font-bold leading-[28px]">
                  {post.title}
                </h2>
                <p className="mt-[18px] text-[12px] leading-[17px]">{post.excerpt}</p>

                <div className="mt-auto pt-[16px]">
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read more: ${post.title}`}
                    className="inline-flex h-[38px] w-[115px] items-center justify-center gap-1 rounded-full border border-[#bdbdbd] text-[12px] transition-colors duration-300 hover:border-[#212121] hover:bg-[#212121] hover:text-white"
                  >
                    Read More
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
