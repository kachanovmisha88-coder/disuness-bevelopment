import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

interface Params { params: Promise<{ id: string }> }

const schema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/).optional(),
  guestName: z.string().min(1).optional(),
  guestTitle: z.string().min(1).optional(),
  guestCompany: z.string().min(1).optional(),
  guestBio: z.string().optional(),
  photoUrl: z.string().url().optional().or(z.literal("")),
  keyQuote: z.string().min(1).optional(),
  content: z.string().optional(),
  embedUrl: z.string().url().optional().or(z.literal("")),
  published: z.boolean().optional(),
});

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const current = await prisma.interview.findUnique({ where: { id } });
    const publishedAt = data.published && !current?.published ? new Date() : current?.publishedAt;

    const interview = await prisma.interview.update({
      where: { id },
      data: { ...data, publishedAt },
    });
    return NextResponse.json(interview);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.interview.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
