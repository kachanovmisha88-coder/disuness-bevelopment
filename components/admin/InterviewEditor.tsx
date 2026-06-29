"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Interview } from "@prisma/client";

type FormData = Omit<Interview, "id" | "createdAt" | "updatedAt" | "publishedAt">;

const empty: FormData = {
  slug: "", guestName: "", guestTitle: "", guestCompany: "", guestBio: "",
  photoUrl: "", keyQuote: "", content: "", embedUrl: "", published: false,
};

interface Props { interview?: Interview }

export default function InterviewEditor({ interview }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(interview ? {
    slug: interview.slug, guestName: interview.guestName, guestTitle: interview.guestTitle,
    guestCompany: interview.guestCompany, guestBio: interview.guestBio,
    photoUrl: interview.photoUrl ?? "", keyQuote: interview.keyQuote,
    content: interview.content, embedUrl: interview.embedUrl ?? "", published: interview.published,
  } : empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(key: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));
  }

  function generateSlug() {
    const slug = form.guestName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setForm((p) => ({ ...p, slug }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = interview ? `/api/admin/interviews/${interview.id}` : "/api/admin/interviews";
    const method = interview ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/interviews");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
      setSaving(false);
    }
  }

  const inputClass = "w-full bg-bg-elevated border border-border focus:border-gold/60 outline-none rounded px-3 py-2.5 text-fg placeholder-gray-600 text-sm transition-colors";
  const labelClass = "block text-xs text-gray-500 uppercase tracking-widest mb-1.5";

  return (
    <form onSubmit={save} className="space-y-6 max-w-3xl">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Guest Name *</label>
          <input required className={inputClass} value={form.guestName} onChange={update("guestName")} placeholder="Alex Ivanov" />
        </div>
        <div>
          <label className={labelClass}>Slug *</label>
          <div className="flex gap-2">
            <input required className={inputClass} value={form.slug} onChange={update("slug")} placeholder="alex-ivanov" pattern="[a-z0-9-]+" />
            <button type="button" onClick={generateSlug} className="text-xs px-3 border border-border rounded text-gray-400 hover:text-fg hover:border-gold/40 transition-colors whitespace-nowrap">
              Auto
            </button>
          </div>
        </div>
        <div>
          <label className={labelClass}>Title *</label>
          <input required className={inputClass} value={form.guestTitle} onChange={update("guestTitle")} placeholder="Head of BD" />
        </div>
        <div>
          <label className={labelClass}>Company *</label>
          <input required className={inputClass} value={form.guestCompany} onChange={update("guestCompany")} placeholder="Acme Gaming" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Photo URL</label>
        <input className={inputClass} value={form.photoUrl ?? ""} onChange={update("photoUrl")} placeholder="https://..." />
      </div>

      <div>
        <label className={labelClass}>Short Bio</label>
        <textarea rows={2} className={inputClass + " resize-none"} value={form.guestBio} onChange={update("guestBio")} placeholder="2-3 sentences about the guest" />
      </div>

      <div>
        <label className={labelClass}>Key Quote * <span className="normal-case text-gray-600">(shown on cards)</span></label>
        <textarea required rows={3} className={inputClass + " resize-none"} value={form.keyQuote} onChange={update("keyQuote")} placeholder="The one thing they said that stopped you mid-sentence." />
      </div>

      <div>
        <label className={labelClass}>Embed URL <span className="normal-case text-gray-600">(YouTube/Spotify)</span></label>
        <input className={inputClass} value={form.embedUrl ?? ""} onChange={update("embedUrl")} placeholder="https://youtube.com/embed/..." />
      </div>

      <div>
        <label className={labelClass}>Interview Content * <span className="normal-case text-gray-600">(HTML — use &lt;h2&gt; for questions, &lt;p&gt; for answers, &lt;blockquote&gt; for highlights)</span></label>
        <textarea required rows={20} className={inputClass + " resize-y font-mono text-xs"} value={form.content} onChange={update("content")} placeholder="<h2>How did you get into iGaming?</h2>&#10;<p>Answer here...</p>" />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="published"
          checked={form.published}
          onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
          className="w-4 h-4 accent-gold"
        />
        <label htmlFor="published" className="text-sm text-gray-300">Publish immediately</label>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-gold text-black font-semibold rounded hover:bg-gold-light transition-colors disabled:opacity-50 text-sm">
          {saving ? "Saving..." : (interview ? "Save Changes" : "Create Interview")}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 border border-border text-gray-400 hover:text-fg rounded transition-colors text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}
