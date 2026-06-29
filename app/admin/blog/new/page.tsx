import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";
import BlogEditor from "@/components/admin/BlogEditor";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-2xl text-fg mb-8">New Post</h1>
        <BlogEditor />
      </div>
    </AdminShell>
  );
}
