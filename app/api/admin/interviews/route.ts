import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

const schema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  guestName: z.string().min(1),
  guestTitle: z.string().min(1),
  guestCompany: z.string().min(1),
  guestBio: z.string(),
  photoUrl: z.string().url().optional().or(z.literal("")),
  keyQuote: z.string().min(1),
  content: z.string(),
  embedUrl: z.string().url().optional().or(z.literal("")),
  published: z.boolean().optional(),
});

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const interviews = await prisma.interview.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(interviews);
}

export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = schema.parse(body);
    const interview = await prisma.interview.create({
      data: {
        ...data,
        photoUrl: data.photoUrl || null,
        embedUrl: data.embedUrl || null,
        publishedAt: data.published ? new Date() : null,
      },
    });
    return NextResponse.json(interview, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
