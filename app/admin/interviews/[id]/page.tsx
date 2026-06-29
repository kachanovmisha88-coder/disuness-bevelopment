import { redirect, notFound } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import InterviewEditor from "@/components/admin/InterviewEditor";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }> }

export default async function EditInterviewPage({ params }: Props) {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const interview = await prisma.interview.findUnique({ where: { id } });
  if (!interview) notFound();

  return (
    <AdminShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-2xl text-fg mb-2">Edit Interview</h1>
        <p className="text-gray-500 text-sm mb-8">{interview.guestName} — {interview.guestCompany}</p>
        <InterviewEditor interview={interview} />
      </div>
    </AdminShell>
  );
}
