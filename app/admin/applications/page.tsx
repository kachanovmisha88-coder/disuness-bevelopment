import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import ApplicationsTable from "@/components/admin/ApplicationsTable";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const applications = await prisma.application.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-fg font-serif text-2xl">Applications</h1>
            <p className="text-gray-500 text-sm mt-1">{applications.length} total</p>
          </div>
        </div>
        <ApplicationsTable initialApplications={applications} />
      </div>
    </AdminShell>
  );
}
