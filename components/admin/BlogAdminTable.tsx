"use client";
import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@prisma/client";

export default function BlogAdminTable({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState(initialPosts);

  async function deletePost(id: string) {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 border border-border rounded-lg">
        <p className="text-fg-faint mb-3">No posts yet.</p>
        <Link href="/admin/blog/new" className="text-gold hover:underline text-sm">Create the first one →</Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-bg-elevated border-b border-border">
            <th className="text-left px-4 py-3 text-fg-faint font-normal">Title</th>
            <th className="text-left px-4 py-3 text-fg-faint font-normal hidden lg:table-cell">Slug</th>
            <th className="text-left px-4 py-3 text-fg-faint font-normal hidden md:table-cell">Published</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-b border-border hover:bg-bg-elevated/50 transition-colors">
              <td className="px-4 py-3">
                <p className="text-fg font-medium">{p.title}</p>
              </td>
              <td className="px-4 py-3 hidden lg:table-cell">
                <code className="text-xs text-fg-faint bg-bg-elevated px-2 py-0.5 rounded">{p.slug}</code>
              </td>
              <td className="px-4 py-3 text-fg-faint text-xs hidden md:table-cell">
                {new Date(p.publishedAt).toLocaleDateString("en-GB")}
              </td>
              <td className="px-4 py-3 flex items-center gap-3 justify-end">
                <Link href={`/admin/blog/${p.id}`} className="text-fg-muted hover:text-gold text-xs transition-colors">
                  Edit
                </Link>
                <Link href={`/blog/${p.slug}`} target="_blank" className="text-fg-faint hover:text-fg text-xs transition-colors">
                  View
                </Link>
                <button onClick={() => deletePost(p.id)} className="text-fg-faint hover:text-red-400 transition-colors text-xs">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
