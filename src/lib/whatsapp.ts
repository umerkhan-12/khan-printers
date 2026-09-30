import { site } from "@/content/site";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Khan Printers, I would like to get a quote for printing. My requirement is: ";

export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function serviceWhatsappUrl(serviceTitle: string) {
  return whatsappUrl(`Hi Khan Printers, I would like a quote for ${serviceTitle}. My requirement is: `);
}

export type QuoteDetails = {
  name: string;
  phone: string;
  service: string;
  quantity?: string;
  message?: string;
  design?: string;
  hasAttachment?: boolean;
};

export function quoteMessage(q: QuoteDetails) {
  const details = [
    `Service: ${q.service}`,
    q.quantity && `Quantity: ${q.quantity}`,
    q.design && `Design: ${q.design}`,
    `Name: ${q.name}`,
    `WhatsApp: ${q.phone}`,
    q.message && `Details: ${q.message}`,
    q.hasAttachment && "(I've also sent my design file through your website.)",
  ].filter(Boolean);

  return ["Hi Khan Printers, I would like a quote.", "", ...details].join("\n");
}
