import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendApplicationNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2).max(100),
  title: z.string().min(2).max(100),
  company: z.string().min(1).max(100),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  email: z.string().email(),
  message: z.string().min(20).max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const application = await prisma.application.create({
      data: { ...data, linkedinUrl: data.linkedinUrl || "" },
    });

    sendApplicationNotification(data).catch(console.error);

    return NextResponse.json({ id: application.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
