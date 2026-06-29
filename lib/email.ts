import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendApplicationNotification(data: {
  name: string;
  title: string;
  company: string;
  email: string;
  message: string;
}) {
  if (!process.env.SMTP_HOST || !process.env.ADMIN_NOTIFY_EMAIL) return;

  await transporter.sendMail({
    from: `"Disuness Bevelopment" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_NOTIFY_EMAIL,
    subject: `New interview application: ${data.name} — ${data.company}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; background: #0a0a0a; color: #fff; padding: 32px; border-radius: 8px;">
        <h2 style="color: #c9a84c; margin-bottom: 24px;">New Interview Application</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888;">Name</td><td style="padding: 8px 0;"><strong>${data.name}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Title</td><td style="padding: 8px 0;">${data.title}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Company</td><td style="padding: 8px 0;">${data.company}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;">${data.email}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #181818; border-left: 3px solid #c9a84c; border-radius: 4px;">
          <p style="color: #888; margin: 0 0 8px 0; font-size: 12px;">WHY THEY WANT TO TALK</p>
          <p style="margin: 0;">${data.message}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #555;">
          Review at <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/applications" style="color: #c9a84c;">the admin panel</a>
        </p>
      </div>
    `,
  });
}
