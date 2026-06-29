"use client";
import { useState } from "react";
import Link from "next/link";
import type { Interview } from "@prisma/client";

export default function InterviewsAdminTable({ initialInterviews }: { initialInterviews: Interview[] }) {
  const [interviews, setInterviews] = useState(initialInterviews);

  async function togglePublish(id: string, published: boolean) {
    const res = await fetch(`/api/admin/interviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published }),
    });
    if (res.ok) {
      const updated = await res.json();
      setInterviews((prev) => prev.map((iv) => (iv.id === id ? updated : iv)));
    }
  }

  async function deleteInterview(id: string) {
    if (!confirm("Delete this interview?")) return;
    const res = await fetch(`/api/admin/interviews/${id}`, { method: "DELETE" });
    if (res.ok) setInterviews((prev) => prev.filter((iv) => iv.id !== id));
  }

  if (interviews.length === 0) {
    return (
      <div className="text-center py-16 border border-border rounded-lg">
        <p className="text-gray-500 mb-3">No interviews yet.</p>
        <Link href="/admin/interviews/new" className="text-gold hover:underline text-sm">Create the first one →</Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-bg-elevated border-b border-border">
            <th className="text-left px-4 py-3 text-gray-500 font-normal">Guest</th>
            <th className="text-left px-4 py-3 text-gray-500 font-normal hidden md:table-cell">Company</th>
            <th className="text-left px-4 py-3 text-gray-500 font-normal hidden lg:table-cell">Slug</th>
            <th className="text-left px-4 py-3 text-gray-500 font-normal">Status</th>
            <th className="text-left px-4 py-3 text-gray-500 font-normal hidden md:table-cell">Created</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {interviews.map((iv) => (
            <tr key={iv.id} className="border-b border-border hover:bg-bg-elevated/50 transition-colors">
              <td className="px-4 py-3">
                <p className="text-fg font-medium">{iv.guestName}</p>
                <p className="text-gray-500 text-xs">{iv.guestTitle}</p>
              </td>
              <td className="px-4 py-3 text-gray-300 hidden md:table-cell">{iv.guestCompany}</td>
              <td className="px-4 py-3 hidden lg:table-cell">
                <code className="text-xs text-gray-500 bg-bg-elevated px-2 py-0.5 rounded">{iv.slug}</code>
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => togglePublish(iv.id, !iv.published)}
                  className={`text-xs border rounded px-2 py-1 transition-colors ${
                    iv.published
                      ? "bg-green-500/20 text-green-300 border-green-500/30 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30"
                      : "bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-green-500/20 hover:text-green-300 hover:border-green-500/30"
                  }`}
                >
                  {iv.published ? "Published" : "Draft"}
                </button>
              </td>
              <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">
                {new Date(iv.createdAt).toLocaleDateString("en-GB")}
              </td>
              <td className="px-4 py-3 flex items-center gap-3 justify-end">
                <Link href={`/admin/interviews/${iv.id}`} className="text-gray-400 hover:text-gold text-xs transition-colors">
                  Edit
                </Link>
                <Link href={`/interviews/${iv.slug}`} target="_blank" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                  View
                </Link>
                <button onClick={() => deleteInterview(iv.id)} className="text-gray-600 hover:text-red-400 transition-colors text-xs">
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
