"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Stays" },
  { href: "/properties", label: "Properties" },
  { href: "/add-your-property", label: "Add Your Property" },
  { href: "/our-story", label: "Our Story" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full px-4 pt-3">
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
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-5 py-3 font-mona text-[14px] leading-none transition ${
                  active
                    ? "bg-[#1a1a1a] text-white"
                    : "text-[#1a1a1a] hover:bg-black/5"
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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-1.4-.7-2.3-1.2-3.2-2.8-.2-.3.2-.3.7-1.1.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.5-1 2.4.1 1 .5 2 1.2 2.8 1.2 1.7 2.7 3 4.6 3.7.7.3 1.8.5 2.5.4.8-.1 1.6-.7 1.9-1.5.1-.3.1-.6.1-.7-.1-.1-.3-.2-.5-.3Z" />
            </svg>
          </a>

          <button
            aria-label="Menu"
            className="flex h-10 w-10 flex-col cursor-pointer items-center justify-center gap-[5px] rounded-full bg-[#F4EFE4]"
          >
        <Image src="/images/icons/sound.png" alt="Menu" width={20} height={20} className="" />    
            {/* <span className="h-[1.5px] w-4 bg-black" />
            <span className="h-[1.5px] w-4 bg-black" /> */}
          </button>
        </div>
      </div>
    </header>
  );
}