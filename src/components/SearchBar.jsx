"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Baby,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  User,
  Users,
} from "lucide-react";

/* ---------------- data ---------------- */

const DESTINATIONS = [
  {
    id: "jaipur",
    name: "Jaipur, Rajasthan",
    image: "/images/city/jaipur.png",
    meta: "20+ Stays | ₹6,999 for 2 Nights",
  },
  {
    id: "gurugram",
    name: "Gurugram, Haryana",
    image: "/images/city/gurgram.png",
    meta: "20+ Stays | ₹6,999 for 2 Nights",
  },
];

// Apne hisaab se edit/extend karo (Diwali, Holi etc. har saal add karni hongi).
// Calendar ke neeche aane wale 3 chips yahin se aate hain (sirf aane wali dates).
const HOLIDAYS = [
  { date: "2026-12-25", name: "Christmas" },
  { date: "2027-01-01", name: "New Year's Day" },
  { date: "2027-01-26", name: "Republic Day" },
  { date: "2027-08-15", name: "Independence Day" },
  { date: "2027-10-02", name: "Gandhi Jayanti" },
];

const DEFAULT_GUESTS = { adults: 2, children: 0, infants: 0 };
const LIMITS = { adults: [1, 12], children: [0, 8], infants: [0, 4] };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ---------------- date helpers ---------------- */

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const sameDay = (a, b) => !!a && !!b && a.getTime() === b.getTime();
const fmt = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseYmd = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

/* ---------------- main component ---------------- */

export default function SearchBar({ onOpenChange, inline = false }) {
  const router = useRouter();
  const formRef = useRef(null);

  const [open, setOpen] = useState(null); // "where" | "dates" | "guests" | null
  const [destination, setDestination] = useState(null);
  const [range, setRange] = useState({ start: null, end: null });
  const [hover, setHover] = useState(null);
  const [guests, setGuests] = useState(DEFAULT_GUESTS);

  // "today" client par set hota hai (SSR/hydration mismatch se bachne ke liye)
  const [today, setToday] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    const t = startOfDay(new Date());
    setToday(t);
    setView(new Date(t.getFullYear(), t.getMonth(), 1));
  }, []);

  // parent (slider) ko batao ki panel khula hai, taaki autoplay ruke
  useEffect(() => {
    onOpenChange?.(open !== null);
  }, [open, onOpenChange]);

  // bahar click ya Esc par band
  useEffect(() => {
    const onDown = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) setOpen(null);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const holidays = useMemo(() => {
    if (!today) return [];
    return HOLIDAYS.map((h) => ({ ...h, d: parseYmd(h.date) }))
      .filter((h) => h.d >= today)
      .slice(0, 3);
  }, [today]);

  const toggle = (name) => setOpen((o) => (o === name ? null : name));

  const pickDate = (d) => {
    const { start, end } = range;
    if (!start || end || d <= start) {
      setRange({ start: d, end: null });
      return;
    }
    setRange({ start, end: d });
    setHover(null);
    setTimeout(() => setOpen("guests"), 250); // agla step: travellers
  };

  const pickHoliday = (d) => {
    setRange({ start: d, end: null });
    setView(new Date(d.getFullYear(), d.getMonth(), 1));
  };

  const setGuest = (key, value) => {
    const [min, max] = LIMITS[key];
    setGuests((g) => ({ ...g, [key]: Math.min(max, Math.max(min, value)) }));
  };

  const search = () => {
    const params = new URLSearchParams();
    if (destination) params.set("city", destination.id);
    if (range.start) params.set("checkIn", ymd(range.start));
    if (range.end) params.set("checkOut", ymd(range.end));
    params.set("adults", guests.adults);
    params.set("children", guests.children);
    params.set("infants", guests.infants);
    setOpen(null);
    router.push(`/properties?${params.toString()}`); // apna route yahan set karo
  };

  /* labels */
  const dateLabel = range.start
    ? `${fmt(range.start)} - ${range.end ? fmt(range.end) : "Add checkout"}`
    : "";
  const total = guests.adults + guests.children;
  // design me "2 Guest" hai; "Guests" chahiye to niche wali line badal do
  const guestLabel = `${total} Guest${
    guests.infants ? `, ${guests.infants} Infant${guests.infants > 1 ? "s" : ""}` : ""
  }`;

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        search();
      }}
      // slider ke swipe se conflict na ho
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
     className={`pointer-events-auto z-30 grid max-w-[780px] grid-cols-2 gap-1 rounded-3xl bg-white p-2 shadow-lg md:flex md:items-center md:rounded-full md:p-1.5 ${
  inline
    ? "relative mx-auto w-full border border-black/10 md:w-[88%] lg:w-[780px]"
    : "absolute left-1/2 top-3 w-[calc(100%-1.5rem)] -translate-x-1/2 md:w-[88%] lg:w-[68%]"
}`}>
      {/* Stay In */}
      <FieldButton
        label="Stay In"
        value={destination?.name}
        placeholder="Select Destination"
        active={open === "where"}
        onClick={() => toggle("where")}
        className="col-span-2 md:col-span-1 md:flex-[1.2]"
      />
      <Divider show={open !== "where" && open !== "dates"} />

      {/* Your Dates */}
      <FieldButton
        label="Your Dates"
        value={dateLabel}
        placeholder="Add Date"
        active={open === "dates"}
        onClick={() => toggle("dates")}
      />
      <Divider show={open !== "dates" && open !== "guests"} />

      {/* Travellers */}
      <FieldButton
        label="Travellers"
        value={guestLabel}
        active={open === "guests"}
        onClick={() => toggle("guests")}
      />

      <button
        type="submit"
        className="col-span-2 whitespace-nowrap rounded-full bg-[#1a1a1a] px-8 py-3.5 text-[12px] font-medium text-white transition hover:bg-black md:col-span-1 md:ml-1 md:py-4"
      >
        Find Your Stay
      </button>

      {/* ---------- Panel: destinations ---------- */}
      <Panel open={open === "where"} className="left-0 right-0 md:right-auto md:w-[340px]">
        <div className="grid grid-cols-2 gap-3 p-4">
          {DESTINATIONS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                setDestination(d);
                setOpen("dates");
              }}
              className="group text-center"
            >
              <div
                className={`overflow-hidden rounded-xl ring-2 transition ${
                  destination?.id === d.id ? "ring-[#1a1a1a]" : "ring-transparent"
                }`}
              >
                <Image
                  src={d.image}
                  alt={d.name}
                  width={240}
                  height={170}
                  className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <p className="mt-2 text-[12px] font-semibold text-neutral-900">{d.name}</p>
              <p className="mt-0.5 text-[10px] text-neutral-400">{d.meta}</p>
            </button>
          ))}
        </div>
      </Panel>

      {/* ---------- Panel: dates ---------- */}
      <Panel
        open={open === "dates"}
        className="left-0 right-0 md:left-1/2 md:right-auto md:w-full md:-translate-x-1/2 lg:w-[620px]"
      >
        {today && view && (
          <DateContent
            today={today}
            view={view}
            setView={setView}
            range={range}
            hover={hover}
            setHover={setHover}
            onPick={pickDate}
            holidays={holidays}
            onHoliday={pickHoliday}
            onClear={() => {
              setRange({ start: null, end: null });
              setHover(null);
            }}
          />
        )}
      </Panel>

      {/* ---------- Panel: travellers ---------- */}
      <Panel open={open === "guests"} className="left-0 right-0 md:left-auto md:right-3 md:w-[290px]">
        <div className="p-4">
          <CounterRow
            icon={Users}
            title="Adults"
            hint="Age 13 years and more"
            value={guests.adults}
            min={LIMITS.adults[0]}
            max={LIMITS.adults[1]}
            onChange={(v) => setGuest("adults", v)}
          />
          <CounterRow
            icon={User}
            title="Children"
            hint="Age 3-12 years"
            value={guests.children}
            min={LIMITS.children[0]}
            max={LIMITS.children[1]}
            onChange={(v) => setGuest("children", v)}
          />
          <CounterRow
            icon={Baby}
            title="Infants"
            hint="Age 0-2 years"
            value={guests.infants}
            min={LIMITS.infants[0]}
            max={LIMITS.infants[1]}
            onChange={(v) => setGuest("infants", v)}
          />

          <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-4">
            <button
              type="button"
              onClick={() => setGuests(DEFAULT_GUESTS)}
              className="text-[12px] text-neutral-700 underline-offset-4 hover:underline"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={search}
              className="flex items-center gap-1.5 rounded-full bg-[#1a1a1a] px-5 py-3 text-[12px] font-medium text-white transition hover:bg-black"
            >
              Apply &amp; Search <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </Panel>
    </form>
  );
}

/* ---------------- small UI pieces ---------------- */

function FieldButton({ label, value, placeholder, active, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      className={`flex min-w-0 flex-1 flex-col items-start rounded-2xl px-5 py-2.5 text-left transition-colors duration-300 md:rounded-full ${
        active ? "bg-[#F4EFE4]" : "hover:bg-black/[0.03]"
      } ${className}`}
    >
      <span className="text-[10px] text-neutral-400">{label}</span>
      <span className="w-full truncate text-[12px] font-medium text-neutral-900">
        {value || placeholder}
      </span>
    </button>
  );
}

function Divider({ show }) {
  return (
    <span
      className={`hidden h-7 w-px bg-black/10 transition-opacity md:block ${
        show ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

function Panel({ open, className = "", children }) {
  return (
    <div
      aria-hidden={!open}
      className={`absolute top-full z-50 mt-2 rounded-2xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition-all duration-300 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-2 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CounterRow({ icon: Icon, title, hint, value, min, max, onChange }) {
  const btn =
    "flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-[#F4EFE4] disabled:opacity-30 disabled:hover:bg-transparent";
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-neutral-500" strokeWidth={1.5} />
        <div>
          <p className="text-[12px] font-semibold text-neutral-900">{title}</p>
          <p className="text-[10px] text-neutral-400">{hint}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[12px]">
        <button
          type="button"
          aria-label={`Decrease ${title}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className={btn}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-5 text-center tabular-nums">{String(value).padStart(2, "0")}</span>
        <button
          type="button"
          aria-label={`Increase ${title}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className={btn}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ---------------- calendar ---------------- */

function NavBtn({ dir, onClick, disabled, className = "" }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous month" : "Next month"}
      onClick={onClick}
      disabled={disabled}
      className={`absolute ${
        dir === "prev" ? "left-0" : "right-0"
      } flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[#F4EFE4] disabled:opacity-30 disabled:hover:bg-transparent ${className}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function DateContent({
  today,
  view,
  setView,
  range,
  hover,
  setHover,
  onPick,
  holidays,
  onHoliday,
  onClear,
}) {
  const months = [view, addMonths(view, 1)];
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="p-4 md:p-5" onMouseLeave={() => setHover(null)}>
      <div className="grid gap-8 md:grid-cols-2">
        {months.map((m, idx) => (
          <div key={idx} className={idx === 1 ? "hidden md:block" : ""}>
            <div className="relative mb-3 flex h-8 items-center justify-center">
              {idx === 0 && (
                <NavBtn dir="prev" disabled={!canPrev} onClick={() => setView(addMonths(view, -1))} />
              )}
              <span className="text-[12px] font-semibold text-neutral-900">
                {MONTHS[m.getMonth()]} {m.getFullYear()}
              </span>
              {idx === 0 && (
                <NavBtn dir="next" className="md:hidden" onClick={() => setView(addMonths(view, 1))} />
              )}
              {idx === 1 && <NavBtn dir="next" onClick={() => setView(addMonths(view, 1))} />}
            </div>

            <div className="mb-1 grid grid-cols-7 border-b border-black/10 pb-2 text-center text-[11px]">
              {WEEKDAYS.map((w, i) => (
                <span key={w} className={i >= 5 ? "text-[#E5484D]" : "text-neutral-800"}>
                  {w}
                </span>
              ))}
            </div>

            <Month
              year={m.getFullYear()}
              month={m.getMonth()}
              today={today}
              range={range}
              hover={hover}
              onPick={onPick}
              onHover={setHover}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/10 pt-4">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {holidays.map((h) => (
            <button
              key={h.date}
              type="button"
              onClick={() => onHoliday(h.d)}
              className="shrink-0 rounded-lg bg-[#E9E3D8] px-3 py-2 text-left transition hover:bg-[#DDD5C6]"
            >
              <span className="block text-[9px] text-neutral-600">Holiday</span>
              <span className="block text-[12px] font-semibold text-neutral-900">{fmt(h.d)}</span>
              <span className="block text-[10px] text-neutral-600">{h.name}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 rounded-full bg-[#E9E3D8] px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-neutral-800 transition hover:bg-[#DDD5C6]"
        >
          Clear Date
        </button>
      </div>
    </div>
  );
}

function Month({ year, month, today, range, hover, onPick, onHover }) {
  const lead = (new Date(year, month, 1).getDay() + 6) % 7; // Monday start
  const count = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(lead).fill(null),
    ...Array.from({ length: count }, (_, i) => new Date(year, month, i + 1)),
  ];

  const { start, end } = range;
  const previewEnd = end || (start && hover && hover > start ? hover : null);

  return (
    <div className="grid grid-cols-7">
      {cells.map((d, i) => {
        if (!d) return <div key={`b${i}`} />;

        const col = i % 7;
        const past = d < today;
        const isStart = sameDay(d, start);
        const isEnd = sameDay(d, previewEnd);
        const between = !!(start && previewEnd && d > start && d < previewEnd);
        const inStrip = !!(start && previewEnd) && (isStart || isEnd || between);
        const isToday = sameDay(d, today);

        // continuous dark bar for the selected range
        let strip = "";
        if (inStrip) {
          strip = "bg-[#1a1a1a]";
          if (isStart || col === 0 || d.getDate() === 1) strip += " rounded-l-full";
          if (isEnd || col === 6 || d.getDate() === count) strip += " rounded-r-full";
        }

        const dot = !inStrip && (isStart || isToday);
        const btn = past
          ? "cursor-not-allowed text-neutral-300"
          : inStrip
          ? "text-white"
          : dot
          ? "bg-[#1a1a1a] text-white"
          : "text-neutral-900 hover:bg-[#F4EFE4]";

        return (
          <div
            key={i}
            className={`flex h-9 items-center justify-center ${strip}`}
            onMouseEnter={() => !past && onHover(d)}
          >
            <button
              type="button"
              disabled={past}
              onClick={() => onPick(d)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-[12px] transition-colors ${btn}`}
            >
              {d.getDate()}
            </button>
          </div>
        );
      })}
    </div>
  );
}