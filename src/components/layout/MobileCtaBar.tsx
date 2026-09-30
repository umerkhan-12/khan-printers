"use client";

import { useEffect, useState } from "react";

import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Fixed mobile action bar. Hidden while the hero CTAs or the quote
 * section are on screen, so it never duplicates or covers them.
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = ["hero-actions", "quote", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const onScreen = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-300 ease-(--ease-soft) md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      inert={!visible}
    >
      <div className="grid grid-cols-2 gap-3">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("whatsapp", "md", "w-full")}
        >
          <WhatsAppIcon className="size-[1.125rem]" />
          WhatsApp
        </a>
        <a href="#quote" className={buttonClasses("primary", "md", "w-full")}>
          Get a Quote
        </a>
      </div>
    </div>
  );
}
