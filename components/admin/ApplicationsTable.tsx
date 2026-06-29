"use client";
import { useState } from "react";
import type { Application, ApplicationStatus } from "@prisma/client";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  NEW: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  CONTACTED: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  PUBLISHED: "bg-green-500/20 text-green-300 border-green-500/30",
  REJECTED: "bg-red-500/20 text-red-300 border-red-500/30",
};

const STATUSES: ApplicationStatus[] = ["NEW", "CONTACTED", "PUBLISHED", "REJECTED"];

export default function ApplicationsTable({ initialApplications }: { initialApplications: Application[] }) {
  const [apps, setApps] = useState(initialApplications);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function updateStatus(id: string, status: ApplicationStatus) {
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    }
  }

  async function deleteApp(id: string) {
    if (!confirm("Delete this application?")) return;
    const res = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
    if (res.ok) setApps((prev) => prev.filter((a) => a.id !== id));
  }

  if (apps.length === 0) {
    return (
      <div className="text-center py-16 border border-border rounded-lg">
        <p className="text-gray-500">No applications yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-bg-elevated border-b border-border">
            <th className="text-left px-4 py-3 text-gray-500 font-normal">Name</th>
            <th className="text-left px-4 py-3 text-gray-500 font-normal hidden md:table-cell">Company</th>
            <th className="text-left px-4 py-3 text-gray-500 font-normal hidden lg:table-cell">Email</th>
            <th className="text-left px-4 py-3 text-gray-500 font-normal">Status</th>
            <th className="text-left px-4 py-3 text-gray-500 font-normal hidden md:table-cell">Date</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <>
              <tr key={app.id} className="border-b border-border hover:bg-bg-elevated/50 transition-colors">
                <td className="px-4 py-3">
                  <button onClick={() => setExpanded(expanded === app.id ? null : app.id)} className="text-left">
                    <p className="text-fg font-medium">{app.name}</p>
                    <p className="text-gray-500 text-xs">{app.title}</p>
                  </button>
                </td>
                <td className="px-4 py-3 text-gray-300 hidden md:table-cell">{app.company}</td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <a href={`mailto:${app.email}`} className="text-gold hover:underline">{app.email}</a>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value as ApplicationStatus)}
                    className={`text-xs border rounded px-2 py-1 bg-transparent cursor-pointer ${STATUS_COLORS[app.status]}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-bg-card text-fg">{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">
                  {new Date(app.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => deleteApp(app.id)} className="text-gray-600 hover:text-red-400 transition-colors text-xs">
                    Delete
                  </button>
                </td>
              </tr>
              {expanded === app.id && (
                <tr key={`${app.id}-exp`} className="border-b border-border bg-bg-elevated/30">
                  <td colSpan={6} className="px-4 py-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        {app.linkedinUrl && (
                          <p className="text-xs text-gray-500 mb-2">
                            <span className="text-gray-600">LinkedIn: </span>
                            <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline break-all">
                              {app.linkedinUrl}
                            </a>
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mb-1">Why they want to talk:</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{app.message}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
