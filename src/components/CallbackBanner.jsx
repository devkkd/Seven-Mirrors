"use client";

import { PhoneCall } from "lucide-react";

export default function CallbackBanner({ onRequest }) {
  return (
    <section className="px-5 py-10 md:py-14">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 rounded-[24px] bg-[#0f0f0f] px-6 py-7 md:flex-row md:items-center md:justify-between md:rounded-[32px] md:px-10 md:py-8">
        {/* text */}
        <div className="border-l-2 border-white py-0.5 pl-4">
          <h3 className="font-mona text-[16px] font-semibold leading-snug text-white md:text-[18px]">
            Finding your perfect vacation should be easy.
          </h3>
          <p className="mt-1 font-mona text-[13px] font-light text-white/90 md:text-[16px]">
            Tell us what you&apos;re looking for, and we&apos;ll help you plan the perfect getaway.
          </p>
        </div>

        {/* button */}
        <button
          type="button"
          onClick={onRequest}
          className="group flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 font-mona text-[14px] font-medium text-black transition duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] active:scale-95 md:px-10 md:py-[18px]"
        >
          <PhoneCall
            strokeWidth={1.5}
            className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-rotate-12"
          />
          Request Callback
        </button>
      </div>
    </section>
  );
}