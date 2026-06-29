import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await requireAdmin();
  redirect(session ? "/admin/applications" : "/admin/login");
}
