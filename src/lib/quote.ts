/** Shared quote-form rules, used by both the client form and the API route. */

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // stays under Vercel's 4.5 MB request limit
export const ACCEPTED_UPLOADS = ".pdf,.jpg,.jpeg,.png,.webp,.ai,.psd,.cdr,.eps,.svg";

export const LIMITS = { name: 80, phone: 20, quantity: 40, message: 1000 } as const;

export type QuoteFields = {
  name: string;
  phone: string;
  service: string;
  quantity: string;
  message: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteFields | "file", string>>;

/** Accepts 03XX XXXXXXX, +92 3XX XXXXXXX and international numbers. */
export function isValidPhone(value: string) {
  const digits = value.replace(/[\s\-()]/g, "");
  return /^(\+?\d{10,15}|0\d{9,11})$/.test(digits);
}

export function validateQuote(fields: QuoteFields, file?: File | null): QuoteErrors {
  const errors: QuoteErrors = {};
  const name = fields.name.trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = "Name is too long.";

  if (!fields.phone.trim()) errors.phone = "Please enter your WhatsApp number.";
  else if (!isValidPhone(fields.phone)) errors.phone = "Enter a valid number, e.g. 0300 1234567.";

  if (!fields.service) errors.service = "Please choose what you need printed.";
  if (fields.quantity.length > LIMITS.quantity) errors.quantity = "Please keep this short.";
  if (fields.message.length > LIMITS.message) errors.message = `Please keep this under ${LIMITS.message} characters.`;

  if (file && file.size > MAX_UPLOAD_BYTES) errors.file = "File is larger than 4 MB. Send it on WhatsApp instead.";

  return errors;
}
