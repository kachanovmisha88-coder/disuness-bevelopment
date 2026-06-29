"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@prisma/client";

interface FormData { title: string; slug: string; excerpt: string; content: string; publishedAt: string; }

function toDateInput(d: Date | string) {
  return new Date(d).toISOString().slice(0, 10);
}

interface Props { post?: BlogPost }

export default function BlogEditor({ post }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(post ? {
    title: post.title, slug: post.slug, excerpt: post.excerpt,
    content: post.content, publishedAt: toDateInput(post.publishedAt),
  } : { title: "", slug: "", excerpt: "", content: "", publishedAt: toDateInput(new Date()) });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(key: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));
  }

  function generateSlug() {
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setForm((p) => ({ ...p, slug }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = post ? `/api/admin/blog/${post.id}` : "/api/admin/blog";
    const method = post ? "PATCH" : "POST";
    const res = await fetch(url, {
      method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/admin/blog");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save");
      setSaving(false);
    }
  }

  const inputClass = "w-full bg-bg-elevated border border-border focus:border-gold/60 outline-none rounded px-3 py-2.5 text-fg placeholder-fg-faint text-sm transition-colors";
  const labelClass = "block text-xs text-fg-faint uppercase tracking-widest mb-1.5";

  return (
    <form onSubmit={save} className="space-y-6 max-w-3xl">
      <div>
        <label className={labelClass}>Title *</label>
        <input required className={inputClass} value={form.title} onChange={update("title")} placeholder="Why X matters in iGaming" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Slug *</label>
          <div className="flex gap-2">
            <input required className={inputClass} value={form.slug} onChange={update("slug")} placeholder="why-x-matters" pattern="[a-z0-9-]+" />
            <button type="button" onClick={generateSlug} className="text-xs px-3 border border-border rounded text-fg-muted hover:text-fg hover:border-gold/40 transition-colors whitespace-nowrap">
              Auto
            </button>
          </div>
        </div>
        <div>
          <label className={labelClass}>Published Date *</label>
          <input required type="date" className={inputClass} value={form.publishedAt} onChange={update("publishedAt")} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Excerpt *</label>
        <textarea required rows={2} className={inputClass + " resize-none"} value={form.excerpt} onChange={update("excerpt")} placeholder="One or two sentences shown on the blog list." />
      </div>

      <div>
        <label className={labelClass}>Content * <span className="normal-case text-fg-faint">(HTML — &lt;h2&gt; sections, &lt;p&gt; paragraphs, &lt;ul&gt;&lt;li&gt; lists, &lt;blockquote&gt; highlights)</span></label>
        <textarea required rows={22} className={inputClass + " resize-y font-mono text-xs"} value={form.content} onChange={update("content")} placeholder="<h2>Section</h2>&#10;<p>Paragraph...</p>" />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-gold text-black font-semibold rounded hover:bg-gold-light transition-colors disabled:opacity-50 text-sm">
          {saving ? "Saving..." : (post ? "Save Changes" : "Create Post")}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 border border-border text-fg-muted hover:text-fg rounded transition-colors text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}
