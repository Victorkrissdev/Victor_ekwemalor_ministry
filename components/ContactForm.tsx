"use client";

import { useState, type FormEvent } from "react";
import { LIMITS, SUBJECTS, type ContactResponse } from "@/lib/contact";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "mt-2 block w-full rounded-none border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900";

const labelClass = "block text-sm tracking-wide text-neutral-800";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await res.json()) as ContactResponse;

      if (result.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(result.error);
      }
    } catch {
      setStatus("error");
      setError(
        "Sorry, your message could not be sent. Please check your connection and try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-neutral-900 px-6 py-12 text-center"
      >
        <p className="font-serif text-2xl leading-relaxed text-neutral-900">
          Thank you. Your message has been received. God bless you.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm tracking-wide text-neutral-600 underline underline-offset-4 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={LIMITS.name}
          autoComplete="name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={LIMITS.email}
          autoComplete="email"
          inputMode="email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <div className="relative">
          <select
            id="subject"
            name="subject"
            defaultValue={SUBJECTS[0]}
            className={`${inputClass} appearance-none pr-12`}
          >
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="pointer-events-none absolute top-1/2 right-4 mt-1 h-5 w-5 -translate-y-1/2 text-neutral-600"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={LIMITS.message}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Honeypot: hidden from people, but spam bots tend to fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-xs text-neutral-500">* Required</p>

      <div aria-live="polite">
        {status === "error" && (
          <p role="alert" className="border-l-2 border-neutral-900 bg-neutral-50 px-4 py-3 text-sm text-neutral-800">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-neutral-900 px-8 text-sm tracking-[0.15em] text-white uppercase transition-colors duration-300 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 disabled:cursor-wait disabled:bg-neutral-500 sm:w-auto"
      >
        {loading && (
          <span
            className="h-4 w-4 animate-spin rounded-full border border-white border-t-transparent motion-reduce:animate-none"
            aria-hidden="true"
          />
        )}
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
