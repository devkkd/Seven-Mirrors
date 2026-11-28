"use client";

import { cloneElement, useEffect, useRef, useState } from "react";

const GROUP_TYPES = [
  "Friends",
  "Family",
  "Sr Citizens",
  "Corporate",
  "College Students",
  "Stag",
];

const INITIAL = { name: "", phone: "", city: "", groupType: "" };

export default function RequestCallbackModal({ open, onClose }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [shown, setShown] = useState(false); // enter animation ke liye
  const firstFieldRef = useRef(null);

  // Esc se close, body scroll lock, enter animation, first field focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => {
      setShown(true);
      firstFieldRef.current?.focus();
    });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      setShown(false);
    };
  }, [open, onClose]);

  // Modal band hone par form reset
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setForm(INITIAL);
      setErrors({});
      setStatus("idle");
    }, 200);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    const phone = form.phone.replace(/[\s-]/g, "").replace(/^\+91/, "");
    if (!form.name.trim()) er.name = "Please enter your full name";
    if (!/^[6-9]\d{9}$/.test(phone))
      er.phone = "Enter a valid 10-digit mobile number";
    if (!form.city.trim()) er.city = "Please enter your city";
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("loading");
    try {
      // TODO: apni API route / CRM endpoint yahan lagayein
      const res = await fetch("/api/request-callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
      className={`fixed inset-0 z-[1000] flex items-center justify-center overflow-y-auto bg-black/45 px-4 py-10 backdrop-blur-[3px] transition-opacity duration-200 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rcm-title"
        className={`relative m-auto w-full max-w-[420px] transition duration-300 ease-out motion-reduce:transition-none ${
          shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-5 left-1/2 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-white text-neutral-900 shadow-md transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M9 9l6 6M15 9l-6 6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="rounded-[32px] bg-white px-6 pb-8 pt-9 text-neutral-900 shadow-2xl sm:px-8">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <h2 id="rcm-title" className="text-xl font-bold">
                Thank you, {form.name.trim().split(" ")[0]}!
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                We have received your request. Our team will call you back
                shortly with the best stays and offers.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 h-11 min-w-[170px] rounded-full bg-neutral-900 px-6 text-sm font-semibold text-white transition hover:bg-black"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2
                id="rcm-title"
                className="mb-3 text-center text-xl font-bold tracking-tight"
              >
                Planning your perfect getaway?
              </h2>
              <p className="mx-auto mb-7 max-w-[320px] text-center text-xs leading-relaxed text-neutral-600">
                Tell us a little about yourself, and we&rsquo;ll help you find
                the perfect stay along with exclusive offers from ELĀRA.
              </p>

              <Field label="Full Name" required error={errors.name}>
                <input
                  ref={firstFieldRef}
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={setField("name")}
                  autoComplete="name"
                />
              </Field>

              <Field label="Phone Number" required error={errors.phone}>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={setField("phone")}
                  autoComplete="tel"
                />
              </Field>

              <Field label="City" required error={errors.city}>
                <input
                  type="text"
                  placeholder="Enter your city"
                  value={form.city}
                  onChange={setField("city")}
                  autoComplete="address-level2"
                />
              </Field>

              <div className="mb-2">
                <span className="mb-2 block text-xs text-neutral-800">
                  Group Type
                </span>
                <div
                  role="radiogroup"
                  aria-label="Group Type"
                  className="flex flex-wrap gap-2"
                >
                  {GROUP_TYPES.map((g) => {
                    const active = form.groupType === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() =>
                          setForm((f) => ({ ...f, groupType: active ? "" : g }))
                        }
                        className={`rounded-full border px-4 py-2 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 ${
                          active
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-900"
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              {status === "error" && (
                <p className="mt-4 text-center text-xs text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="mt-7 flex justify-center">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-12 min-w-[200px] rounded-full bg-neutral-900 px-8 text-sm font-semibold text-white transition hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                >
                  {status === "loading" ? "Sending..." : "Request a Callback →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-xs text-neutral-800">
        {label}
        {required && "*"}
      </label>
      {cloneElement(children, {
        "aria-invalid": !!error,
        className: `h-11 w-full rounded-full border bg-white px-5 text-xs text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10 ${
          error ? "border-red-600" : "border-neutral-200"
        }`,
      })}
      {error && <p className="ml-4 mt-1.5 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}
