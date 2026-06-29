import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const apps = await prisma.application.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(apps);
}
