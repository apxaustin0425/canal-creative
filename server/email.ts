/**
 * Canal Creative — Email Helper
 * Sends transactional emails via SMTP (Gmail App Password or SendGrid).
 * All application submissions are forwarded to NOTIFY_EMAIL.
 */

import nodemailer from "nodemailer";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "aaacuna1@gmail.com";

function createTransport() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.warn("[Email] SMTP credentials not configured — emails will be logged only.");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

export async function sendApplicationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessName: string;
  businessType: string;
  businessDescription: string;
  website?: string;
  spaceType: string;
  sqftNeeded?: string;
  moveInDate?: string;
  budget?: string;
  leaseLength?: string;
  additionalNeeds?: string;
}): Promise<boolean> {
  const subject = `New Space Application — ${data.firstName} ${data.lastName} (${data.businessName})`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Courier New', monospace; background: #0a0a0a; color: #e8e8e8; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #111; border: 1px solid #222; border-radius: 8px; overflow: hidden; }
    .header { background: #E8540A; padding: 20px 24px; }
    .header h1 { color: white; margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 0.05em; }
    .header p { color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 12px; }
    .body { padding: 24px; }
    .section { margin-bottom: 24px; }
    .section-title { color: #E8540A; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid #222; }
    .row { display: flex; gap: 12px; margin-bottom: 8px; }
    .label { color: #555; font-size: 11px; width: 120px; flex-shrink: 0; padding-top: 1px; }
    .value { color: #e8e8e8; font-size: 13px; flex: 1; }
    .footer { padding: 16px 24px; background: #0d0d0d; border-top: 1px solid #1a1a1a; }
    .footer p { color: #444; font-size: 11px; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Canal Creative — Space Application</h1>
      <p>Submitted ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET</p>
    </div>
    <div class="body">
      <div class="section">
        <div class="section-title">Personal</div>
        <div class="row"><span class="label">Name</span><span class="value">${data.firstName} ${data.lastName}</span></div>
        <div class="row"><span class="label">Email</span><span class="value"><a href="mailto:${data.email}" style="color:#E8540A">${data.email}</a></span></div>
        <div class="row"><span class="label">Phone</span><span class="value">${data.phone || "—"}</span></div>
      </div>
      <div class="section">
        <div class="section-title">Business</div>
        <div class="row"><span class="label">Business Name</span><span class="value">${data.businessName}</span></div>
        <div class="row"><span class="label">Type</span><span class="value">${data.businessType}</span></div>
        <div class="row"><span class="label">Description</span><span class="value">${data.businessDescription}</span></div>
        <div class="row"><span class="label">Website</span><span class="value">${data.website ? `<a href="${data.website}" style="color:#E8540A">${data.website}</a>` : "—"}</span></div>
      </div>
      <div class="section">
        <div class="section-title">Space Needs</div>
        <div class="row"><span class="label">Space Type</span><span class="value">${data.spaceType}</span></div>
        <div class="row"><span class="label">Sq Ft</span><span class="value">${data.sqftNeeded || "Not specified"}</span></div>
        <div class="row"><span class="label">Move-in</span><span class="value">${data.moveInDate || "Flexible"}</span></div>
        <div class="row"><span class="label">Budget</span><span class="value">${data.budget || "Flexible"}</span></div>
        <div class="row"><span class="label">Lease</span><span class="value">${data.leaseLength || "No preference"}</span></div>
        <div class="row"><span class="label">Notes</span><span class="value">${data.additionalNeeds || "—"}</span></div>
      </div>
    </div>
    <div class="footer">
      <p>Canal Creative · 531 Canal Street, Reading PA · canalcreative.net</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = [
    `CANAL CREATIVE — SPACE APPLICATION`,
    `Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET`,
    ``,
    `PERSONAL`,
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    ``,
    `BUSINESS`,
    `Business: ${data.businessName}`,
    `Type: ${data.businessType}`,
    `Description: ${data.businessDescription}`,
    `Website: ${data.website || "—"}`,
    ``,
    `SPACE NEEDS`,
    `Space Type: ${data.spaceType}`,
    `Sq Ft: ${data.sqftNeeded || "Not specified"}`,
    `Move-in: ${data.moveInDate || "Flexible"}`,
    `Budget: ${data.budget || "Flexible"}`,
    `Lease: ${data.leaseLength || "No preference"}`,
    `Notes: ${data.additionalNeeds || "—"}`,
  ].join("\n");

  const transport = createTransport();

  if (!transport) {
    // No SMTP configured — log the submission so it's not lost
    console.log("[Email] Would send to:", NOTIFY_EMAIL);
    console.log("[Email] Subject:", subject);
    console.log("[Email] Body:\n", text);
    return false;
  }

  try {
    await transport.sendMail({
      from: `"Canal Creative" <${process.env.SMTP_USER}>`,
      to: NOTIFY_EMAIL,
      replyTo: data.email,
      subject,
      text,
      html,
    });
    console.log(`[Email] Application sent to ${NOTIFY_EMAIL}`);
    return true;
  } catch (err) {
    console.error("[Email] Failed to send application email:", err);
    return false;
  }
}
