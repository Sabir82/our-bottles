import nodemailer from "nodemailer";

export interface EnquiryPayload {
  // Source tracking
  pageName: string;
  pageUrl: string;
  formName: string;
  formType: string;

  // Customer details
  name: string;
  businessName?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  location?: string;

  // Specifications
  bottleSize?: string;
  quantity?: string;
  labelStyle?: string;
  occasion?: string;
  selectedRecipient?: string;

  // Dynamic submitted form fields map
  fields?: Record<string, string | number | boolean | null | undefined>;

  // Design info if from customizer
  customDesign?: {
    brandName?: string;
    tagline?: string;
    color?: string;
    finish?: string;
    customHex?: string;
  };

  // Message / Notes
  notes?: string;
  message?: string;

  // Attachment (Base64 data URL)
  logoFile?: string | null;
  logoDataUrl?: string | null;
  logoFileName?: string;

  // Anti-spam honeypot
  honeypot?: string;
}

// SMTP Configuration
const SMTP_HOST = process.env.SMTP_HOST || "smtpout.secureserver.net";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_USER = process.env.SMTP_USER || "contact@aquvana.in";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

const INTERNAL_RECIPIENTS = [
  process.env.INTERNAL_EMAIL_1 || "contact@aquvana.in",
  process.env.INTERNAL_EMAIL_2 || "ahmadsabir796@gmail.com",
];

function escapeHtml(text?: string | number | boolean | null): string {
  if (text === null || text === undefined) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getISTTimestamp(): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long",
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Creates and returns the reusable Nodemailer transporter
 */
function getTransporter() {
  if (!SMTP_PASSWORD) {
    console.warn(
      "[Aquvana Email] Warning: SMTP_PASSWORD is not set in environment variables."
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
    // Useful timeout settings for serverless environments (Vercel)
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Sends both internal notification and customer confirmation
 */
export async function sendEnquiryEmail(data: EnquiryPayload): Promise<{
  success: boolean;
  messageId?: string;
  customerEmailed?: boolean;
}> {
  // If honeypot is triggered, pretend success to drop spam
  if (data.honeypot && data.honeypot.trim().length > 0) {
    console.log("[Aquvana Email] Honeypot triggered, discarding spam submission.");
    return { success: true };
  }

  if (!SMTP_PASSWORD) {
    throw new Error(
      "SMTP_PASSWORD environment variable is not configured. Please add it to your environment."
    );
  }

  const transporter = getTransporter();
  const submittedAt = getISTTimestamp();
  const cleanCustomerEmail = data.email && data.email.trim().length > 0 ? data.email.trim() : null;
  const customerNotes = (data.message || data.notes || "").trim();

  // Parse Logo Attachment if provided as Data URL (checks both logoFile and logoDataUrl)
  const attachments = [];
  const rawLogo = data.logoFile || data.logoDataUrl;
  if (rawLogo && typeof rawLogo === "string" && rawLogo.startsWith("data:")) {
    const matches = rawLogo.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      const mimeType = matches[1];
      const base64Data = matches[2];
      const ext = mimeType.split("/")[1] || "png";
      attachments.push({
        filename: data.logoFileName || `customer-logo.${ext}`,
        content: Buffer.from(base64Data, "base64"),
        contentType: mimeType,
      });
    }
  }

  // Build key-value table rows for any dynamic fields
  let allFieldsRowsHtml = "";
  if (data.fields && typeof data.fields === "object") {
    allFieldsRowsHtml = Object.entries(data.fields)
      .filter(([_, val]) => val !== null && val !== undefined && val !== "")
      .map(
        ([key, val]) =>
          `<div class="field-row"><span class="field-label">${escapeHtml(key)}:</span><span class="field-value">${escapeHtml(String(val))}</span></div>`
      )
      .join("\n");
  }

  // 1. Build Internal Notification Email
  const internalSubject = `New ${data.formType || "Enquiry"} — ${data.pageName || "Website"} — ${data.name || "Customer"}`;

  const internalHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0B1220; color: #ffffff; padding: 28px 32px; text-align: left; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; color: #ffffff; }
    .header .badge { display: inline-block; background: #22D3EE; color: #0B1220; font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; margin-bottom: 8px; letter-spacing: 0.5px; }
    .content { padding: 32px; }
    .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; margin: 24px 0 12px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
    .field-row { margin-bottom: 10px; font-size: 14px; display: flex; }
    .field-label { width: 180px; font-weight: 700; color: #475569; flex-shrink: 0; }
    .field-value { font-weight: 500; color: #0f172a; word-break: break-word; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 8px; font-size: 14px; color: #0f172a; white-space: pre-wrap; }
    .footer { background: #f1f5f9; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">AQUVANA • NEW WEBSITE ENQUIRY</div>
      <h1>${escapeHtml(data.formType || "Website Inquiry")}</h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">Received via ${escapeHtml(data.formName || "Website Form")}</p>
    </div>

    <div class="content">
      <div class="section-title">Customer Details</div>
      <div class="field-row"><span class="field-label">Full Name:</span><span class="field-value"><strong>${escapeHtml(data.name)}</strong></span></div>
      <div class="field-row"><span class="field-label">Business / Event:</span><span class="field-value">${escapeHtml(data.businessName || "Not specified")}</span></div>
      <div class="field-row"><span class="field-label">Phone:</span><span class="field-value"><a href="tel:${escapeHtml(data.phone)}" style="color: #0284c7; text-decoration: none; font-weight: 700;">${escapeHtml(data.phone)}</a></span></div>
      <div class="field-row"><span class="field-label">WhatsApp Number:</span><span class="field-value">${escapeHtml(data.whatsapp || data.phone)}</span></div>
      <div class="field-row"><span class="field-label">Email Address:</span><span class="field-value">${cleanCustomerEmail ? `<a href="mailto:${cleanCustomerEmail}" style="color: #0284c7; text-decoration: none;">${escapeHtml(cleanCustomerEmail)}</a>` : "Not provided"}</span></div>
      <div class="field-row"><span class="field-label">Delivery Location:</span><span class="field-value">${escapeHtml(data.location || "Not specified")}</span></div>

      <div class="section-title">Order & Packaging Specifications</div>
      <div class="field-row"><span class="field-label">Bottle Silhouette:</span><span class="field-value">${escapeHtml(data.bottleSize || "500ml")}</span></div>
      <div class="field-row"><span class="field-label">Estimated Quantity:</span><span class="field-value"><strong>${escapeHtml(data.quantity || "1000")} Bottles</strong></span></div>
      <div class="field-row"><span class="field-label">Label Finish:</span><span class="field-value">${escapeHtml(data.labelStyle || "Standard BOPP")}</span></div>
      ${data.occasion ? `<div class="field-row"><span class="field-label">Occasion / Category:</span><span class="field-value" style="text-transform: capitalize;">${escapeHtml(data.occasion)}</span></div>` : ""}
      ${data.selectedRecipient ? `<div class="field-row"><span class="field-label">Assigned Desk:</span><span class="field-value">${escapeHtml(data.selectedRecipient)}</span></div>` : ""}

      ${
        data.customDesign
          ? `
      <div class="section-title">Live Customizer Specifications</div>
      <div class="field-row"><span class="field-label">Custom Brand Name:</span><span class="field-value">${escapeHtml(data.customDesign.brandName || "N/A")}</span></div>
      <div class="field-row"><span class="field-label">Custom Tagline:</span><span class="field-value">${escapeHtml(data.customDesign.tagline || "N/A")}</span></div>
      <div class="field-row"><span class="field-label">Label Color:</span><span class="field-value">${escapeHtml(data.customDesign.color || data.customDesign.customHex || "N/A")}</span></div>
      <div class="field-row"><span class="field-label">Surface Finish:</span><span class="field-value">${escapeHtml(data.customDesign.finish || "N/A")}</span></div>
      `
          : ""
      }

      ${
        allFieldsRowsHtml
          ? `
      <div class="section-title">All Submitted Form Fields</div>
      ${allFieldsRowsHtml}
      `
          : ""
      }

      <div class="section-title">Message / Project Notes</div>
      <div class="message-box">${escapeHtml(customerNotes) || "No additional notes submitted by customer."}</div>

      ${
        attachments.length > 0
          ? `
      <div class="section-title">Attached Logo</div>
      <p style="font-size: 13px; color: #16a34a; font-weight: 600; margin: 4px 0;">✓ 1 logo file attached to this email for digital proofing (${escapeHtml(attachments[0].filename)}).</p>
      `
          : ""
      }

      <div class="section-title">Source Information</div>
      <div class="field-row"><span class="field-label">Page Name:</span><span class="field-value">${escapeHtml(data.pageName)}</span></div>
      <div class="field-row"><span class="field-label">Page URL:</span><span class="field-value"><a href="${escapeHtml(data.pageUrl)}" style="color: #0284c7; text-decoration: none;">${escapeHtml(data.pageUrl)}</a></span></div>
      <div class="field-row"><span class="field-label">Form Name:</span><span class="field-value">${escapeHtml(data.formName)}</span></div>
      <div class="field-row"><span class="field-label">Form Type:</span><span class="field-value">${escapeHtml(data.formType)}</span></div>
      <div class="field-row"><span class="field-label">Submitted At:</span><span class="field-value">${submittedAt}</span></div>
    </div>

    <div class="footer">
      Aquvana Water Enquiry Management System • Tapovan, Rishikesh, Uttarakhand
    </div>
  </div>
</body>
</html>
  `;

  // Send internal notification email
  const info = await transporter.sendMail({
    from: `"Aquvana Enquiries" <${SMTP_USER}>`,
    to: INTERNAL_RECIPIENTS,
    replyTo: cleanCustomerEmail || SMTP_USER,
    subject: internalSubject,
    html: internalHtml,
    attachments,
  });

  console.log(`[Aquvana Email] Internal enquiry email sent successfully (ID: ${info.messageId})`);

  // 2. Send Customer Confirmation Email (only if customer provided valid email)
  let customerEmailed = false;
  if (cleanCustomerEmail) {
    try {
      const customerSubject = "We've received your enquiry — Aquvana";

      const customerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #334155; background-color: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
    .logo { font-size: 20px; font-weight: 800; color: #0B1220; margin-bottom: 24px; letter-spacing: 0.5px; }
    h2 { font-size: 18px; color: #0B1220; margin-top: 0; font-weight: 700; }
    p { margin: 0 0 16px 0; font-size: 14px; }
    .summary-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin: 20px 0; font-size: 13.5px; }
    .summary-box strong { color: #0B1220; }
    .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12.5px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">AQUVANA WATER</div>

    <h2>Hi ${data.name},</h2>

    <p>Thank you for contacting Aquvana.</p>

    <p>We've received your enquiry and our packaging studio desk will review your requirements and prepare your tailored volume quotation and complimentary 3D digital proof.</p>

    <div class="summary-box">
      <div style="font-weight: 700; color: #0284c7; text-transform: uppercase; font-size: 11px; margin-bottom: 8px; letter-spacing: 0.5px;">Enquiry Summary</div>
      <div><strong>Type:</strong> ${data.formType || "Quotation Inquiry"}</div>
      ${data.businessName ? `<div><strong>Business / Event:</strong> ${data.businessName}</div>` : ""}
      ${data.bottleSize ? `<div><strong>Bottle Silhouette:</strong> ${data.bottleSize}</div>` : ""}
      ${data.quantity ? `<div><strong>Quantity Tier:</strong> ${data.quantity} Bottles</div>` : ""}
      ${data.location ? `<div><strong>Delivery Destination:</strong> ${data.location}</div>` : ""}
      <div><strong>Submitted from:</strong> ${data.pageName || "https://www.aquvana.in/"}</div>
    </div>

    <p>We have received your details successfully. If you would like to share additional brand assets, design vector files, or delivery schedule preferences, simply reply directly to this email.</p>

    <div class="footer">
      <strong>Aquvana Water LLP</strong><br />
      Simple. Pure. Yours.<br />
      Tapovan, Rishikesh, Uttarakhand — 249192<br />
      Direct Concierge: +91 90842 77705 | +91 82180 86865<br />
      <a href="https://www.aquvana.in/" style="color: #0284c7; text-decoration: none;">https://www.aquvana.in/</a>
    </div>
  </div>
</body>
</html>
      `;

      await transporter.sendMail({
        from: `"Aquvana Water" <${SMTP_USER}>`,
        to: cleanCustomerEmail,
        replyTo: SMTP_USER,
        subject: customerSubject,
        html: customerHtml,
      });

      customerEmailed = true;
      console.log(`[Aquvana Email] Confirmation sent to customer: ${cleanCustomerEmail}`);
    } catch (customerErr) {
      // Per Section 26: If internal email succeeds but customer confirmation fails,
      // log server-side and do not break the submission.
      console.error(
        `[Aquvana Email] Error sending customer confirmation to ${cleanCustomerEmail}:`,
        customerErr
      );
    }
  }

  return {
    success: true,
    messageId: info.messageId,
    customerEmailed,
  };
}
