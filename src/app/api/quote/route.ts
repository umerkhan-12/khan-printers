import { site } from "@/content/site";
import { MAX_UPLOAD_BYTES, validateQuote, type QuoteFields } from "@/lib/quote";

/**
 * Emails a copy of each quote request to the business via Resend
 * (https://resend.com). WhatsApp remains the primary channel — this is
 * the backup record, and the only way a design file reaches the inbox.
 *
 * Env:
 *   RESEND_API_KEY    required — without it the route returns 503
 *   QUOTE_EMAIL_TO    defaults to the business email
 *   QUOTE_EMAIL_FROM  defaults to Resend's test sender (works only when the
 *                     Resend account email is QUOTE_EMAIL_TO; set a verified
 *                     domain sender once the domain is live)
 */

const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map<string, number[]>(); // best-effort, per server instance

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

const text = (form: FormData, key: string) => {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Response.json({ error: "Email is not configured." }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return Response.json({ error: "Too many requests." }, { status: 429 });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots learn nothing.
  if (text(form, "company")) return Response.json({ ok: true });

  const fields: QuoteFields = {
    name: text(form, "name"),
    phone: text(form, "phone"),
    service: text(form, "service"),
    quantity: text(form, "quantity"),
    message: text(form, "message"),
  };
  const upload = form.get("file");
  const file = upload instanceof File && upload.size > 0 ? upload : null;

  const errors = validateQuote(fields, file);
  if (Object.values(errors).some(Boolean)) return Response.json({ errors }, { status: 422 });
  if (file && file.size > MAX_UPLOAD_BYTES) return Response.json({ error: "File too large." }, { status: 413 });

  const whatsappDigits = fields.phone.replace(/\D/g, "").replace(/^0/, "92");
  const body = [
    `New quote request from the website`,
    ``,
    `Name:      ${fields.name}`,
    `WhatsApp:  ${fields.phone}  (https://wa.me/${whatsappDigits})`,
    `Service:   ${fields.service}`,
    `Quantity:  ${fields.quantity || "—"}`,
    ``,
    `Details:`,
    fields.message || "—",
    ``,
    file ? `Design file attached: ${file.name}` : `No design file attached.`,
  ].join("\n");

  const attachments = file
    ? [{ filename: file.name.slice(0, 120), content: Buffer.from(await file.arrayBuffer()).toString("base64") }]
    : undefined;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.QUOTE_EMAIL_FROM || `${site.name} Website <onboarding@resend.dev>`,
      to: [process.env.QUOTE_EMAIL_TO || site.email],
      subject: `Quote request: ${fields.service} — ${fields.name}`,
      text: body,
      attachments,
    }),
  });

  if (!res.ok) {
    console.error("Quote email failed", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "Could not send email." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
