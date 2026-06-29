import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import BlogAdminTable from "@/components/admin/BlogAdminTable";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-fg font-serif text-2xl">Blog</h1>
            <p className="text-fg-faint text-sm mt-1">{posts.length} total</p>
          </div>
          <Link href="/admin/blog/new" className="px-4 py-2 bg-gold text-black text-sm font-semibold rounded hover:bg-gold-light transition-colors">
            + New Post
          </Link>
        </div>
        <BlogAdminTable initialPosts={posts} />
      </div>
    </AdminShell>
  );
}
