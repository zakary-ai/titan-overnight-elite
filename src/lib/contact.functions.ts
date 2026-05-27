import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  property: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  message: z.string().trim().max(1500).optional().default(""),
});

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );

export const sendPartnerInquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      throw new Error("Email service is not configured.");
    }

    const subject = `Partnership Inquiry — ${data.property}`;
    const html = `
      <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5;">
        <h2 style="margin:0 0 16px;">New Partnership Inquiry</h2>
        <p><strong>Name:</strong> ${escape(data.name)}</p>
        <p><strong>Property / Hotel:</strong> ${escape(data.property)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escape(data.email)}">${escape(data.email)}</a></p>
        <p><strong>Phone:</strong> ${escape(data.phone)}</p>
        ${data.message ? `<p><strong>Message:</strong></p><p>${escape(data.message).replace(/\n/g, "<br/>")}</p>` : ""}
      </div>
    `;

    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Titan Solutions Website <onboarding@resend.dev>",
        to: ["frank@titansolutionsco.com"],
        reply_to: data.email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resend error:", res.status, text);
      throw new Error("Failed to send inquiry.");
    }

    return { ok: true };
  });
