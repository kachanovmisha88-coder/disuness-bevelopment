import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import InterviewsAdminTable from "@/components/admin/InterviewsAdminTable";

export const dynamic = "force-dynamic";

export default async function AdminInterviewsPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const interviews = await prisma.interview.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-fg font-serif text-2xl">Interviews</h1>
            <p className="text-gray-500 text-sm mt-1">{interviews.length} total</p>
          </div>
          <Link href="/admin/interviews/new" className="px-4 py-2 bg-gold text-black text-sm font-semibold rounded hover:bg-gold-light transition-colors">
            + New Interview
          </Link>
        </div>
        <InterviewsAdminTable initialInterviews={interviews} />
      </div>
    </AdminShell>
  );
}
