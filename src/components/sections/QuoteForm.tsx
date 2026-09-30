"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";

import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { getService, services } from "@/content/services";
import { ACCEPTED_UPLOADS, LIMITS, validateQuote, type QuoteErrors, type QuoteFields } from "@/lib/quote";
import { quoteMessage, whatsappUrl } from "@/lib/whatsapp";

const SELECT_SERVICE_EVENT = "kp:select-service";

/** Syncs `?service=slug` (from ads or service links) into the form. */
export function ServiceFromUrl() {
  const slug = useSearchParams().get("service");
  useEffect(() => {
    if (getService(slug)) window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: slug }));
  }, [slug]);
  return null;
}

const emptyFields: QuoteFields = { name: "", phone: "", service: "", quantity: "", message: "" };

type Status = { state: "idle" } | { state: "sent"; waUrl: string; hasFile: boolean; emailed: boolean | null };

export function QuoteForm({ emailEnabled }: { emailEnabled: boolean }) {
  const [fields, setFields] = useState<QuoteFields>(emptyFields);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      setFields((f) => ({ ...f, service: slug }));
      setStatus({ state: "idle" });
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const set = (key: keyof QuoteFields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = emailEnabled ? (fileRef.current?.files?.[0] ?? null) : null;
    const found = validateQuote(fields, file);

    if (Object.values(found).some(Boolean)) {
      setErrors(found);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }

    const serviceTitle = getService(fields.service)?.title ?? fields.service;
    const waUrl = whatsappUrl(
      quoteMessage({
        name: fields.name.trim(),
        phone: fields.phone.trim(),
        service: serviceTitle,
        quantity: fields.quantity.trim(),
        message: fields.message.trim(),
        hasAttachment: !!file,
      }),
    );

    // Email copy runs in the background; WhatsApp is the primary channel.
    let emailRequest: Promise<boolean> | null = null;
    if (emailEnabled) {
      const body = new FormData(e.currentTarget);
      body.set("service", serviceTitle);
      emailRequest = fetch("/api/quote", { method: "POST", body })
        .then((res) => res.ok)
        .catch(() => false);
    }

    // Must open synchronously inside the submit handler to avoid popup blockers.
    // ("noopener" in window.open makes it return null, so detach the opener manually.)
    const opened = window.open(waUrl, "_blank");
    if (opened) opened.opener = null;
    else window.location.href = waUrl;

    setStatus({ state: "sent", waUrl, hasFile: !!file, emailed: emailRequest ? null : false });
    emailRequest?.then((ok) => setStatus((s) => (s.state === "sent" ? { ...s, emailed: ok } : s)));
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="py-6 text-center sm:py-10">
        <p className="label text-gold-deep">Request ready</p>
        <h3 className="mt-4 font-serif text-h3 text-ink">Thank you, {fields.name.trim().split(" ")[0]}.</h3>
        <p className="mx-auto mt-4 max-w-sm text-muted">
          WhatsApp should have opened with your details filled in — just press send. We’ll reply with your quote.
        </p>
        {emailEnabled && status.emailed === true && (
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">We’ve also received your request by email.</p>
        )}
        {emailEnabled && status.emailed === false && status.hasFile && (
          <p className="mx-auto mt-2 max-w-sm text-sm text-error">
            Your file couldn’t be uploaded. Please attach it in WhatsApp instead.
          </p>
        )}
        <a href={status.waUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "lg", "mt-8")}>
          <WhatsAppIcon />
          Open WhatsApp again
        </a>
        <button
          type="button"
          onClick={() => {
            setFields(emptyFields);
            setStatus({ state: "idle" });
          }}
          className="mx-auto mt-4 block min-h-11 text-sm text-muted underline underline-offset-4 hover:text-ink"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <Field label="Your name" error={errors.name} className="sm:col-span-1">
        {(props) => (
          <input
            {...props}
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={fields.name}
            onChange={(e) => set("name")(e.target.value)}
            className={inputClasses}
          />
        )}
      </Field>

      <Field label="WhatsApp number" error={errors.phone} className="sm:col-span-1">
        {(props) => (
          <input
            {...props}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0300 1234567"
            maxLength={LIMITS.phone}
            value={fields.phone}
            onChange={(e) => set("phone")(e.target.value)}
            className={inputClasses}
          />
        )}
      </Field>

      <Field label="What do you need printed?" error={errors.service} className="sm:col-span-2">
        {(props) => (
          <select
            {...props}
            name="service"
            value={fields.service}
            onChange={(e) => set("service")(e.target.value)}
            className={`${inputClasses} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23111' stroke-width='1.5'%3E%3Cpath d='m1 1.5 5 5 5-5'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10 ${fields.service ? "" : "text-muted"}`}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug} className="text-ink">
                {s.title}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field label="Quantity" optional error={errors.quantity} className="sm:col-span-2">
        {(props) => (
          <input
            {...props}
            name="quantity"
            placeholder="e.g. 500 cards, 2 banners"
            maxLength={LIMITS.quantity}
            value={fields.quantity}
            onChange={(e) => set("quantity")(e.target.value)}
            className={inputClasses}
          />
        )}
      </Field>

      <Field label="Details" optional error={errors.message} className="sm:col-span-2">
        {(props) => (
          <textarea
            {...props}
            name="message"
            rows={4}
            placeholder="Size, paper, finish, deadline — anything that helps us quote."
            maxLength={LIMITS.message}
            value={fields.message}
            onChange={(e) => set("message")(e.target.value)}
            className={`${inputClasses} h-auto resize-y py-3`}
          />
        )}
      </Field>

      {emailEnabled && (
        <Field label="Design file" optional hint="PDF, image or design file, up to 4 MB." error={errors.file} className="sm:col-span-2">
          {(props) => (
            <input
              {...props}
              ref={fileRef}
              name="file"
              type="file"
              accept={ACCEPTED_UPLOADS}
              onChange={() => errors.file && setErrors((e) => ({ ...e, file: undefined }))}
              className="block w-full text-sm text-muted file:mr-4 file:h-11 file:cursor-pointer file:rounded-full file:border file:border-ink/25 file:bg-transparent file:px-5 file:text-sm file:font-medium file:text-ink hover:file:border-ink"
            />
          )}
        </Field>
      )}

      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <button type="submit" className={buttonClasses("whatsapp", "lg", "w-full")}>
          <WhatsAppIcon />
          Send on WhatsApp
        </button>
        <p className="mt-3 text-center text-sm text-muted">Opens WhatsApp with your details filled in.</p>
      </div>
    </form>
  );
}

const inputClasses =
  "block h-12 w-full rounded-input border border-ink/20 bg-paper/60 px-4 text-base text-ink placeholder:text-muted/80 " +
  "transition-[border-color,background-color] duration-200 hover:border-ink/40 focus:border-ink focus:bg-white focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep " +
  "aria-invalid:border-error";

type FieldProps = {
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; required?: boolean }) => ReactNode;
};

function Field({ label, optional, hint, error, className = "", children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": describedBy, required: !optional })}
      {hint && (
        <p id={hintId} className="mt-2 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
