"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Stays" },
  { href: "/properties", label: "Properties" },
  { href: "/add-your-property", label: "Add Your Property" },
  { href: "/our-story", label: "Our Story" },
];

const menuItems = [
  { href: "/journal", title: "The Stay Journal", sub: "Travel Tips & Inspiration" },
  { href: "/contact-us", title: "Contact", sub: "We're Here to Help" },
  { href: "/login", title: "Log in or Sign up", sub: "Access Your Account" },
];

const ITEM_H = 56; // har menu item ki height (px) - highlight isi se slide karta hai

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0); // kaun sa item highlighted hai
  const menuRef = useRef(null);

  // Route change par dropdown band
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bahar click ya Escape par band
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="relative z-50 w-full px-4 pt-3">
      <div className="mx-auto grid h-[68px] max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center rounded-2xl bg-white px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center justify-self-start">
          <Image
            src="/logo.png"
            alt="Seven Mirror Stays"
            width={220}
            height={48}
            priority
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Center: pill nav */}
        <nav className="hidden items-center gap-1 rounded-full bg-[#F4EFE4] p-2 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-5 py-3 font-mona text-[14px] leading-none transition-colors duration-300 ${
                  isActive ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a] hover:bg-black/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: buttons */}
        <div className="col-start-3 flex items-center justify-end gap-3">
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-1.4-.7-2.3-1.2-3.2-2.8-.2-.3.2-.3.7-1.1.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.5-1 2.4.1 1 .5 2 1.2 2.8 1.2 1.7 2.7 3 4.6 3.7.7.3 1.8.5 2.5.4.8-.1 1.6-.7 1.9-1.5.1-.3.1-.6.1-.7-.1-.1-.3-.2-.5-.3Z" />
            </svg>
          </a>

          {/* Menu button + dropdown */}
          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-haspopup="menu"
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#F4EFE4] transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              {/* Closed: aapki image */}
              <Image
                src="/images/icons/sound.png"
                alt=""
                width={20}
                height={20}
                className={`absolute transition-all duration-300 ease-out motion-reduce:transition-none ${
                  open ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
              />
              {/* Open: X icon */}
              <svg
                viewBox="0 0 24 24"
                className={`absolute h-[18px] w-[18px] transition-all duration-300 ease-out motion-reduce:transition-none ${
                  open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
                }`}
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="9.5" />
                <path d="M9 9l6 6M15 9l-6 6" />
              </svg>
            </button>

            {/* Dropdown panel */}
            <div
              role="menu"
              aria-hidden={!open}
              className={`absolute right-0 top-[calc(100%+14px)] w-[200px] origin-top-right rounded-[24px] bg-[#F4EFE4] p-2 shadow-xl shadow-black/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                open
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-2 scale-95 opacity-0"
              }`}
            >
              <div className="relative" onMouseLeave={() => setActive(0)}>
                {/* Sliding white highlight */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 rounded-2xl bg-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                  style={{ height: ITEM_H, transform: `translateY(${active * ITEM_H}px)` }}
                />

                {menuItems.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    tabIndex={open ? 0 : -1}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setOpen(false)}
                    style={{
                      height: ITEM_H,
                      transitionDelay: open ? `${80 + i * 60}ms` : "0ms",
                    }}
                    className={`relative flex flex-col justify-center rounded-2xl px-4 font-mona text-[11px] leading-snug text-[#1a1a1a] transition-all duration-500 ease-out motion-reduce:transition-none ${
                      open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                    }`}
                  >
                    <span className="font-semibold">{item.title}</span>
                    <span className="mt-0.5">{item.sub}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
