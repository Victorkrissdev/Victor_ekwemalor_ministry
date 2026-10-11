import nodemailer from "nodemailer";
import {
  LIMITS,
  isSubject,
  isValidEmail,
  type ContactResponse,
} from "@/lib/contact";

// ---------------------------------------------------------------------------
// Basic rate limit: at most 5 messages per IP address every 10 minutes.
// This lives in memory, so it resets when the server restarts. That is fine
// for a simple personal site and needs no database.
// ---------------------------------------------------------------------------
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (recentRequests.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );

  if (timestamps.length >= RATE_LIMIT) {
    recentRequests.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  recentRequests.set(ip, timestamps);

  // Keep memory use small by forgetting old visitors
  if (recentRequests.size > 1000) {
    for (const [key, times] of recentRequests) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) {
        recentRequests.delete(key);
      }
    }
  }
  return false;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ---------------------------------------------------------------------------
// Sanitising helpers
// ---------------------------------------------------------------------------

/** Trim and remove invisible control characters. Keeps line breaks if allowed. */
function clean(value: unknown, keepNewlines = false): string {
  if (typeof value !== "string") return "";
  const pattern = keepNewlines
    ? /[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g
    : /[\u0000-\u001F\u007F]/g;
  return value.replace(/\r\n/g, "\n").replace(pattern, "").trim();
}

/** Make text safe to place inside HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body: ContactResponse, status = 200) {
  return Response.json(body, { status });
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: real people never see this field, so if it is filled in it is
  // almost certainly a bot. Pretend it worked, but send nothing.
  if (clean(body.website)) {
    return json({ ok: true });
  }

  if (isRateLimited(getClientIp(request))) {
    return json(
      {
        ok: false,
        error:
          "You have sent several messages in a short time. Please wait a few minutes and try again.",
      },
      429,
    );
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const message = clean(body.message, true);
  const subject = isSubject(body.subject) ? body.subject : "Other";

  if (!name || !email || !message) {
    return json(
      { ok: false, error: "Please fill in your name, email and message." },
      400,
    );
  }
  if (!isValidEmail(email)) {
    return json(
      { ok: false, error: "Please enter a valid email address." },
      400,
    );
  }
  if (name.length > LIMITS.name || message.length > LIMITS.message) {
    return json(
      {
        ok: false,
        error: `Please keep your name under ${LIMITS.name} characters and your message under ${LIMITS.message} characters.`,
      },
      400,
    );
  }

  // Secrets come from environment variables, never from the code
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  const toEmail = process.env.CONTACT_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailPass || !toEmail) {
    console.error(
      "Contact form: GMAIL_USER, GMAIL_APP_PASSWORD or CONTACT_TO_EMAIL is not set.",
    );
    return json(
      {
        ok: false,
        error:
          "Sorry, the message service is not available right now. Please try again later.",
      },
      500,
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const sentAt = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "full",
    timeStyle: "short",
  });

  const text = [
    `New message from your website`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    `Sent: ${sentAt}`,
    ``,
    `Message:`,
    message,
    ``,
    `---`,
    `Reply to this email to respond to ${name} directly.`,
  ].join("\n");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f5f5f5;font-family:Georgia,'Times New Roman',serif;color:#171717;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;">
      <tr>
        <td style="padding:32px 32px 8px;text-align:center;">
          <div style="font-size:28px;line-height:1;color:#a3a3a3;">&#10013;</div>
          <h1 style="margin:16px 0 0;font-size:24px;font-weight:normal;">New message from your website</h1>
          <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#737373;">${escapeHtml(subject)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;">
            <tr><td style="padding:6px 0;color:#737373;width:90px;">Name</td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:6px 0;color:#737373;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#171717;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#737373;">Sent</td><td style="padding:6px 0;">${escapeHtml(sentAt)}</td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:#fafafa;border-left:2px solid #171717;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:0 32px 32px;text-align:center;font-family:Arial,sans-serif;font-size:12px;color:#737373;">
          Just press Reply to respond to ${escapeHtml(name)} directly.
        </td>
      </tr>
    </table>
  </body>
</html>`;

  try {
    await transporter.sendMail({
      from: { name: "Website Contact Form", address: gmailUser },
      to: toEmail,
      replyTo: { name, address: email },
      subject: `[Website] ${subject} - from ${name}`,
      text,
      html,
    });
  } catch (error) {
    console.error("Contact form: failed to send email.", error);
    return json(
      {
        ok: false,
        error:
          "Sorry, your message could not be sent right now. Please try again in a little while.",
      },
      500,
    );
  }

  return json({ ok: true });
}
