import { SITE_CONFIG } from "@/config/site";

export interface WhatsAppQuoteParams {
  name?: string;
  businessName?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  eventType?: string;
  bottleSize?: string;
  quantity?: string | number;
  location?: string;
  labelStyle?: string;
  notes?: string;
}

/**
 * Generates an encoded WhatsApp deep-link URL with contextual inquiry details.
 * Supports routing to either Line 1 (First Owner: 9084277705) or Line 2 (Second Owner: 8218086865).
 */
export function buildWhatsAppLink(
  params?: WhatsAppQuoteParams,
  targetLine: "primary" | "secondary" = "primary"
): string {
  const targetPhone =
    targetLine === "secondary"
      ? SITE_CONFIG.contact.whatsappSecondaryNumber
      : SITE_CONFIG.contact.whatsappNumber;

  if (!params || Object.keys(params).length === 0) {
    const defaultMsg =
      `Hi ${SITE_CONFIG.shortName},\n\nI would like to inquire about custom-branded packaged drinking water bottles for my business/event.`;
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(defaultMsg)}`;
  }

  const lines: string[] = [
    `*New Inquiry — ${SITE_CONFIG.shortName} Website*`,
    "",
    "Hello, I have submitted an inquiry for custom-branded water bottles:",
    "",
  ];

  if (params.name) lines.push(`👤 *Name:* ${params.name}`);
  if (params.businessName) lines.push(`🏢 *Business / Event:* ${params.businessName}`);
  if (params.phone) lines.push(`📞 *Phone:* ${params.phone}`);
  if (params.whatsapp) lines.push(`💬 *WhatsApp:* ${params.whatsapp}`);
  if (params.email) lines.push(`✉️ *Email:* ${params.email}`);
  if (params.bottleSize) lines.push(`🍾 *Bottle Size:* ${params.bottleSize}`);
  if (params.quantity) lines.push(`📦 *Quantity:* ${params.quantity} Bottles`);
  if (params.labelStyle) lines.push(`✨ *Label Finish:* ${params.labelStyle}`);
  if (params.location) lines.push(`📍 *Delivery Location:* ${params.location}`);
  if (params.notes) lines.push(`📝 *Message / Requirements:* ${params.notes}`);

  lines.push("");
  lines.push("Please share digital proofing guidance and estimated pricing.");

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
}
