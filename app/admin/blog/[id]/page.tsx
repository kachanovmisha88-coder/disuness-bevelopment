import { redirect, notFound } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import BlogEditor from "@/components/admin/BlogEditor";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }> }

export default async function EditBlogPostPage({ params }: Props) {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <AdminShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-2xl text-fg mb-2">Edit Post</h1>
        <p className="text-fg-faint text-sm mb-8">{post.title}</p>
        <BlogEditor post={post} />
      </div>
    </AdminShell>
  );
}
