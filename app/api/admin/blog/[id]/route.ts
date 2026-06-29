import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

interface Params { params: Promise<{ id: string }> }

const schema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/).optional(),
  excerpt: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  publishedAt: z.string().min(1).optional(),
});

export async function PATCH(req: NextRequest, { params }: Params) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const post = await prisma.blogPost.update({
      where: { id },
      data: { ...data, ...(data.publishedAt ? { publishedAt: new Date(data.publishedAt) } : {}) },
    });
    return NextResponse.json(post);
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
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
