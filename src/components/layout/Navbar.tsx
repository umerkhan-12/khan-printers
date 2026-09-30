"use client";

import { useEffect, useRef, useState } from "react";

import { buttonClasses } from "@/components/ui/Button";
import { CloseIcon, InstagramIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { navLinks, site } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

import { Wordmark } from "./Wordmark";

/** Highlights the nav link for the section currently in view. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// Non-nav sections are observed too, so the highlight clears when they are in view.
const sectionIds = ["top", ...navLinks.map((l) => l.href.slice(1)), "process"];

export function Navbar() {
  const active = useActiveSection(sectionIds);
  const menuRef = useRef<HTMLDialogElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => menuRef.current?.showModal();
  const closeMenu = () => menuRef.current?.close();

  return (
    <header
      className={`sticky top-0 z-40 bg-paper transition-[border-color] duration-300 border-b ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Wordmark />

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative py-2 text-[0.9375rem] transition-colors duration-200 hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold-deep after:transition-transform after:duration-300 ${
                    isActive ? "text-ink after:scale-x-100" : "text-muted after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("secondary", "md")}
          >
            <WhatsAppIcon className="size-[1.125rem] text-whatsapp" />
            WhatsApp
          </a>
          <a href="#quote" className={buttonClasses("primary", "md")}>
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          onClick={openMenu}
          className="-mr-2 inline-flex size-11 items-center justify-center text-ink lg:hidden"
          aria-label="Open menu"
          aria-haspopup="dialog"
        >
          <MenuIcon className="size-6" />
        </button>
      </nav>

      <MobileMenu dialogRef={menuRef} onClose={closeMenu} />
    </header>
  );
}

function MobileMenu({
  dialogRef,
  onClose,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}) {
  return (
    <dialog
      ref={dialogRef}
      aria-label="Menu"
      className="m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 text-ink backdrop:bg-transparent open:flex open:flex-col lg:hidden"
      onClick={(e) => {
        // Close when any link inside is tapped.
        if ((e.target as HTMLElement).closest("a")) onClose();
      }}
    >
      <div className="container-page flex h-16 shrink-0 items-center justify-between">
        <Wordmark />
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 inline-flex size-11 items-center justify-center"
          aria-label="Close menu"
          autoFocus
        >
          <CloseIcon className="size-6" />
        </button>
      </div>

      <ul className="container-page mt-6 flex-1">
        {navLinks.map((link, i) => (
          <li key={link.href} className="border-b border-line">
            <a href={link.href} className="flex items-baseline justify-between py-5 font-serif text-[2.5rem] leading-none">
              {link.label}
              <span className="label text-gold-deep">0{i + 1}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="container-page shrink-0 space-y-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <a href="#quote" className={buttonClasses("primary", "lg", "w-full")}>
          Get a Quote
        </a>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("whatsapp", "lg", "w-full")}
        >
          <WhatsAppIcon />
          Chat on WhatsApp
        </a>
        <div className="flex items-center justify-center gap-6 pt-3 text-sm text-muted">
          <a href={`tel:${site.phone.tel}`} className="inline-flex min-h-11 items-center gap-2 hover:text-ink">
            <PhoneIcon className="size-4" />
            {site.phone.display}
          </a>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 hover:text-ink"
          >
            <InstagramIcon className="size-4" />
            Instagram
          </a>
        </div>
      </div>
    </dialog>
  );
}
