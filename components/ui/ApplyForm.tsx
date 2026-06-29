"use client";
import { useState } from "react";

interface FormState {
  name: string; title: string; company: string;
  linkedinUrl: string; email: string; message: string;
}

export default function ApplyForm() {
  const [form, setForm] = useState<FormState>({
    name: "", title: "", company: "", linkedinUrl: "", email: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function update(key: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="py-16">
        <div className="w-10 h-px bg-gold mb-8" />
        <h2 className="font-serif text-[1.75rem] text-fg mb-4">Application received.</h2>
        <p className="text-fg-muted text-[0.9375rem] leading-[1.75]">
          I&apos;ll be in touch if there&apos;s a fit. No promises, no timeline — this runs on my time.
          If you don&apos;t hear back within 3 weeks, assume it&apos;s not the right moment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-9">

      {/* Row 1: Name + Title */}
      <div className="grid grid-cols-2 gap-6">
        <Field label="Name" required>
          <input
            required
            type="text"
            className="field-input"
            placeholder="Alex Ivanov"
            value={form.name}
            onChange={update("name")}
          />
        </Field>
        <Field label="Title" required>
          <input
            required
            type="text"
            className="field-input"
            placeholder="Head of BD"
            value={form.title}
            onChange={update("title")}
          />
        </Field>
      </div>

      {/* Company */}
      <Field label="Company" required>
        <input
          required
          type="text"
          className="field-input"
          placeholder="Acme Gaming"
          value={form.company}
          onChange={update("company")}
        />
      </Field>

      {/* Email */}
      <Field label="Email" required>
        <input
          required
          type="email"
          className="field-input"
          placeholder="you@company.com"
          value={form.email}
          onChange={update("email")}
        />
      </Field>

      {/* LinkedIn */}
      <Field label="LinkedIn URL">
        <input
          type="url"
          className="field-input"
          placeholder="https://linkedin.com/in/…"
          value={form.linkedinUrl}
          onChange={update("linkedinUrl")}
        />
      </Field>

      {/* Message */}
      <Field
        label="Why should we talk?"
        required
        hint="Be specific. Generic answers don't get read."
      >
        <textarea
          required
          rows={6}
          className="field-input resize-none"
          placeholder="What's the real story you want to tell? What's on your mind about this industry that nobody's saying out loud?"
          value={form.message}
          onChange={update("message")}
        />
      </Field>

      {status === "error" && (
        <p className="text-[0.8125rem] text-red-400 -mt-2">{error}</p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-3 px-8 py-3.5 bg-gold text-black text-[0.8rem] font-semibold tracking-[0.08em] uppercase hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <span className="w-3.5 h-3.5 border border-black/30 border-t-black rounded-full animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Submit Application
              <svg width={16} height={16} className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label, required, hint, children,
}: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="field-label">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      {children}
      {hint && <p className="mt-2 text-[0.72rem] text-fg-faint tracking-wide">{hint}</p>}
    </div>
  );
}
