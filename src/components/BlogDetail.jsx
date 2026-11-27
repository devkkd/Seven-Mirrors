"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// .rise = page load par, [data-reveal] = scroll karke aane par. --d = delay
const ANIMATIONS = `
  @keyframes rise { from { opacity: 0; translate: 0 32px; } }
  .rise, [data-show] { animation: rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms) backwards; }
  @keyframes settle { from { scale: 1.12; } }
  .settle { animation: settle 1.6s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
  [data-hide] { opacity: 0; }
  @media (prefers-reduced-motion: reduce) {
    .rise, .settle, [data-show] { animation: none; }
    main * { transition-duration: 0s !important; }
  }
  @media print { [data-hide] { opacity: 1; } }
`;
const delay = (ms) => ({ "--d": `${ms}ms` });

export default function BlogDetail({ post, related }) {
  const pageRef = useRef(null);

  // neeche wali cheezein scroll karne par smoothly aate hain
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
    <main ref={pageRef} className="overflow-x-clip bg-white pb-20 pt-4 text-[#111]">
      <style>{ANIMATIONS}</style>

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[74px]">
        {/* ---------- Cover photo ---------- */}
        <div className="rise relative h-[240px] overflow-hidden rounded-[16px] bg-[#f6f0e5] sm:h-[380px] lg:h-[525px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1440px) 1292px, 100vw"
            className="settle object-cover"
          />
        </div>

        <div className="mt-[34px] grid gap-14 lg:grid-cols-[minmax(0,726px)_301px] lg:justify-between lg:gap-10">
          {/* ---------- Article ---------- */}
          <article>
            <h1
              style={delay(150)}
              className="rise font-playfair text-[28px] font-bold leading-[1.4] lg:text-[38px] lg:leading-[60px]"
            >
              {post.title}
            </h1>

            <div className="mt-[35px] text-[13.5px] leading-[22px]">
              {post.content.map((block, i) =>
                block.type === "h2" ? (
                  <h2
                    key={i}
                    data-reveal
                    className="mb-[25px] mt-[34px] text-[20px] font-bold leading-[32px] tracking-[-0.02em] lg:text-[24px]"
                  >
                    {block.text}
                  </h2>
                ) : (
                  <p key={i} data-reveal className="mb-[22px]">
                    {block.text}
                  </p>
                )
              )}
            </div>
          </article>

          {/* ---------- More blogs ---------- */}
          <aside aria-label="More blogs">
            <ul className="grid content-start gap-[40px] sm:grid-cols-2 lg:grid-cols-1">
              {related.map((post, i) => (
                <li key={post.slug} data-reveal style={delay(200 + (i % 2) * 120)}>
              <article className="group flex h-full flex-col">
                <Link
                  href={`/blog/${post.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative block aspect-[4/3] overflow-hidden rounded-[16px] bg-[#f6f0e5] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-xl"
                >
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 301px, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </Link>
  
                <h3 className="mt-[17px] font-playfair text-[18px] font-bold leading-[28px]">
                  {post.title}
                </h3>
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
          </aside>
        </div>
      </div>
    </main>
  );
}
