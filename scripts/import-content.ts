import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface InterviewRecord {
  slug: string; guestName: string; guestTitle: string; guestCompany: string;
  guestBio: string; keyQuote: string; publishedAt: string; content: string;
}
interface BlogRecord {
  slug: string; title: string; excerpt: string; publishedAt: string; content: string;
}

async function main() {
  const raw = fs.readFileSync(path.join(__dirname, "content.json"), "utf-8");
  const data = JSON.parse(raw) as { interviews: InterviewRecord[]; blogs: BlogRecord[] };

  console.log("📥 Importing content from Telegram channel...\n");

  // ---- Interviews (upsert by slug, leaves existing seed interviews intact) ----
  for (const iv of data.interviews) {
    const publishedAt = new Date(iv.publishedAt);
    await prisma.interview.upsert({
      where: { slug: iv.slug },
      update: {
        guestName: iv.guestName, guestTitle: iv.guestTitle, guestCompany: iv.guestCompany,
        guestBio: iv.guestBio, keyQuote: iv.keyQuote, content: iv.content,
        published: true, publishedAt,
      },
      create: {
        slug: iv.slug, guestName: iv.guestName, guestTitle: iv.guestTitle,
        guestCompany: iv.guestCompany, guestBio: iv.guestBio, keyQuote: iv.keyQuote,
        content: iv.content, photoUrl: null, embedUrl: null,
        published: true, publishedAt,
      },
    });
    console.log(`  ✓ Interview: ${iv.guestName} — ${iv.guestCompany}`);
  }

  // ---- Blog posts ----
  for (const post of data.blogs) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: { title: post.title, excerpt: post.excerpt, content: post.content, publishedAt: new Date(post.publishedAt) },
      create: {
        slug: post.slug, title: post.title, excerpt: post.excerpt,
        content: post.content, publishedAt: new Date(post.publishedAt),
      },
    });
    console.log(`  ✓ Blog: ${post.title}`);
  }

  const [ivCount, blogCount] = await Promise.all([
    prisma.interview.count({ where: { published: true } }),
    prisma.blogPost.count(),
  ]);

  console.log(`\n✅ Import complete.`);
  console.log(`   ${data.interviews.length} interviews imported (${ivCount} published total)`);
  console.log(`   ${data.blogs.length} blog posts imported (${blogCount} total)\n`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
