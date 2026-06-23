import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const NOTIFY_TO = "amanpreet@portquote.com";
const FROM = "Port Quote Notifications <notifications@portquote.com>";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let payload: { table: string; record: Record<string, unknown> };
  try {
    payload = await req.json();
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const { table, record } = payload;

  let subject = "";
  let html = "";

  if (table === "quote_requests") {
    subject = `New Quote Request from ${record.name}`;
    html = `
      <h2 style="color:#0369A1">New Quote Request — Port Quote</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px;font-family:sans-serif">
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600;width:140px">Name</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${esc(record.name)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600">Email</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">
              <a href="mailto:${esc(record.email)}">${esc(record.email)}</a></td></tr>
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600">Vessel / Port</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${esc(record.vessel_port)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600;vertical-align:top">Message</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;white-space:pre-wrap">${esc(record.message)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600">Submitted</td>
            <td style="padding:8px 12px">${new Date(record.created_at as string).toLocaleString("en-CA", { timeZone: "America/Toronto" })}</td></tr>
      </table>
      <p style="margin-top:20px;font-family:sans-serif;font-size:13px;color:#64748b">
        Reply directly to this email to respond to the client.
      </p>`;
  } else if (table === "job_applications") {
    subject = `New Job Application from ${record.name} — ${record.position}`;
    html = `
      <h2 style="color:#0369A1">New Job Application — Port Quote</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px;font-family:sans-serif">
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600;width:140px">Name</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${esc(record.name)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600">Email</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">
              <a href="mailto:${esc(record.email)}">${esc(record.email)}</a></td></tr>
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600">Phone</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${esc(record.phone ?? "—")}</td></tr>
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600">Position</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${esc(record.position)}</td></tr>
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600;vertical-align:top">Message</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;white-space:pre-wrap">${esc(record.message ?? "—")}</td></tr>
        ${record.resume_url ? `
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600">Resume</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">
              <a href="https://azkefbieolmftakcizsv.supabase.co/storage/v1/object/public/resumes/${esc(record.resume_url)}">
                Download Resume
              </a></td></tr>` : ""}
        <tr><td style="padding:8px 12px;background:#f1f5f9;font-weight:600">Submitted</td>
            <td style="padding:8px 12px">${new Date(record.created_at as string).toLocaleString("en-CA", { timeZone: "America/Toronto" })}</td></tr>
      </table>
      <p style="margin-top:20px;font-family:sans-serif;font-size:13px;color:#64748b">
        Reply directly to this email to contact the applicant.
      </p>`;
  } else {
    return new Response("Unknown table", { status: 200 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [NOTIFY_TO],
      ...(record.email ? { reply_to: record.email as string } : {}),
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return new Response("Email send failed", { status: 500 });
  }

  return new Response("OK", { status: 200 });
});

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
