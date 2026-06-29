"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/interviews", label: "Interviews" },
  { href: "/admin/blog", label: "Blog" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="bg-bg-card border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-serif text-fg text-sm">
            DB <span className="text-gold">Admin</span>
          </Link>
          <nav className="flex gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm px-3 py-1.5 rounded transition-colors ${pathname.startsWith(l.href)
                  ? "bg-gold/10 text-gold"
                  : "text-gray-400 hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            View site →
          </Link>
          <button onClick={logout} className="text-xs text-gray-500 hover:text-red-400 transition-colors px-3 py-1.5 border border-border rounded">
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
