import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const INTERVIEW_1 = `<h2>You've been in iGaming BD for over a decade. What's the one thing that's changed most about how deals actually get done?</h2>
<p>Honestly? The bullshit tolerance has dropped. Used to be you could wine and dine someone for three months and get a deal purely on relationship. Now operators have spreadsheets, KPIs, and six layers of sign-off. Which is fine — it means the conversations have to be sharper from day one.</p>
<blockquote>The operators who are still slow to close are usually the ones who haven't figured out what they actually want.</blockquote>
<p>We used to hide behind "let's align internally" for weeks. Now I tell people in the first call: here's what we need, here's what we're offering, here's where there's no flex. It speeds everything up — even when the answer is no.</p>

<h2>What does a deal going sideways usually look like?</h2>
<p>The classic one is when procurement gets involved six weeks in. You've built rapport with the BD team, everyone's excited, and then legal or procurement rewrites your commercials from scratch.</p>
<p>I've learned to ask about procurement on the second call. Not the first — that's too aggressive. But early. "Who else is going to touch this agreement?" That question alone saves months.</p>

<h2>What's the biggest misconception about affiliate deals from the operator side?</h2>
<p>That the affiliate doesn't know their own numbers as well as you do. They absolutely do. And they're running eight conversations like yours simultaneously. If you come in with a CPA model that doesn't account for LTV variance by market, they'll know before you've finished the sentence.</p>
<blockquote>The affiliates who are still here in five years will be the ones who pushed back on bad terms and walked away from deals that didn't make sense.</blockquote>`;

const INTERVIEW_2 = `<h2>You launched a game studio during a bear market in crypto gaming. That's either brave or unhinged — which is it?</h2>
<p>Both, honestly. We launched in Q3 of a year when every crypto gaming project had either imploded or was quietly pivoting to "web2 with a token." The timing looked terrible from the outside.</p>
<p>But here's the thing — bad markets are great for hiring. The people who want stability had already gone back to Pragmatic or Evolution. The people who stayed genuinely believed in the build. That team cohesion is worth a lot.</p>

<h2>What do operators actually want from an indie studio that they're not saying out loud?</h2>
<p>They want something they can explain in one sentence to their marketing team. "It's slots but with X." Or "It's live casino but with Y." The moment you need three minutes to explain the mechanic, you've lost 80% of the room.</p>
<blockquote>Your game doesn't have to be revolutionary. It has to be explainable. There's a difference.</blockquote>
<p>We spent four months rebuilding our core loop because we realized our own salespeople couldn't demo it cleanly. That was humbling but necessary.</p>

<h2>What's the one thing you'd tell a team launching their first game right now?</h2>
<p>Don't skip the math on compliance. Jurisdiction by jurisdiction, RTP requirements, volatility ceilings, bonus mechanics — it's not glamorous and it will consume two months you didn't plan for. But getting locked out of Germany or Sweden because you shipped a bonus feature that violates their rules is a much worse six months.</p>
<p>Also: talk to operators before you lock the design doc. Not after. Most studios do it backwards.</p>`;

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const email = process.env.ADMIN_EMAIL || "admin@disunessbevelopment.com";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
  console.log(`✓ Admin user: ${email}`);

  // Interview 1
  await prisma.interview.upsert({
    where: { slug: "marta-kowalski-bd-director-spinfast" },
    update: {},
    create: {
      slug: "marta-kowalski-bd-director-spinfast",
      guestName: "Marta Kowalski",
      guestTitle: "Director of Business Development",
      guestCompany: "SpinFast Group",
      guestBio: "15 years in iGaming BD across Poland, Malta, and the UK. Closed deals with over 200 operators and affiliates. Currently leading BD strategy at SpinFast Group.",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      keyQuote: "The operators who are still slow to close are usually the ones who haven't figured out what they actually want.",
      content: INTERVIEW_1,
      published: true,
      publishedAt: new Date("2024-11-15"),
    },
  });
  console.log("✓ Interview 1: Marta Kowalski");

  // Interview 2
  await prisma.interview.upsert({
    where: { slug: "andrei-popescu-studio-founder-reelcraft" },
    update: {},
    create: {
      slug: "andrei-popescu-studio-founder-reelcraft",
      guestName: "Andrei Popescu",
      guestTitle: "Co-Founder & CPO",
      guestCompany: "ReelCraft Studios",
      guestBio: "Built three games at Playtech before co-founding ReelCraft Studios in 2022. ReelCraft's debut title launched in 14 jurisdictions. Based in Bucharest.",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      keyQuote: "Your game doesn't have to be revolutionary. It has to be explainable. There's a difference.",
      content: INTERVIEW_2,
      published: true,
      publishedAt: new Date("2024-12-03"),
    },
  });
  console.log("✓ Interview 2: Andrei Popescu");

  console.log("\n✅ Seeding complete.");
  console.log(`\n   Admin login: ${email} / ${password}`);
  console.log("   (Change this password in .env before going live)\n");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
