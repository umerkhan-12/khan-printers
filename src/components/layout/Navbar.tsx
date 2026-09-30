"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { buttonClasses } from "@/components/ui/Button";
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
  CloseIcon,
  InstagramIcon,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { serviceHref, services } from "@/content/services";
import { navLinks, site } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";

import { Wordmark } from "./Wordmark";

const idOf = (href: string) => href.split("#")[1] ?? "";

// Non-nav sections are observed too, so the highlight clears when they are in view.
const sectionIds = ["top", "products", ...navLinks.map((l) => idOf(l.href)), "process", "location"];
/** Sections that light up a nav link other than their own id. */
const activeAlias: Record<string, string> = { location: "contact" };

/** Highlights the nav link for the section currently in view. */
function useActiveSection(ids: string[], pathname: string) {
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
  }, [ids, pathname]);

  return active;
}

export function Navbar() {
  const pathname = usePathname();
  const rawActive = useActiveSection(sectionIds, pathname);
  const active = rawActive ? (activeAlias[rawActive] ?? rawActive) : null;
  const menuRef = useRef<HTMLDialogElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  // Home and product pages open on a dark hero; start dark there to avoid a flash.
  const [overHero, setOverHero] = useState(pathname === "/" || pathname.startsWith("/services/"));
  const [productsOpen, setProductsOpen] = useState(false);

  // Ink-toned while over a dark hero (home), paper-toned elsewhere.
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      setScrolled(window.scrollY > 8);
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > 72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Close the products panel on route change, Escape, or outside click.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setProductsOpen(false);
  }
  useEffect(() => {
    if (!productsOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProductsOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setProductsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [productsOpen]);

  const openMenu = () => menuRef.current?.showModal();
  const closeMenu = () => menuRef.current?.close();
  const dark = overHero && !productsOpen;

  const linkClass = (isActive: boolean) =>
    `relative py-2 text-[0.9375rem] transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:transition-transform after:duration-300 ${
      dark ? "after:bg-accent hover:text-text-inverse" : "after:bg-accent-text hover:text-text-strong"
    } ${
      isActive
        ? `${dark ? "text-text-inverse" : "text-text-strong"} after:scale-x-100`
        : `${dark ? "text-text-inverse-muted" : "text-text-muted"} after:scale-x-0 hover:after:scale-x-100`
    }`;

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,color] duration-500 ${
        dark ? "on-ink bg-surface-inverse text-text-inverse" : "bg-background text-text-strong"
      } ${scrolled || productsOpen ? (dark ? "border-border-inverse" : "border-border") : "border-transparent"}`}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Wordmark tone={dark ? "paper" : "ink"} />

        <ul className="hidden items-center gap-9 lg:flex">
          <li>
            <button
              type="button"
              aria-expanded={productsOpen}
              aria-controls="products-panel"
              onClick={() => setProductsOpen((o) => !o)}
              className={`${linkClass(productsOpen || active === "products")} inline-flex items-center gap-1.5`}
            >
              Products
              <ChevronRightIcon
                className={`size-3.5 transition-transform duration-300 ${productsOpen ? "-rotate-90" : "rotate-90"}`}
              />
            </button>
          </li>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === idOf(link.href) ? "true" : undefined}
                className={linkClass(active === idOf(link.href))}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses(dark ? "ghost-on-ink" : "secondary", "md")}
          >
            <WhatsAppIcon className={`size-[1.125rem] ${dark ? "" : "text-success"}`} />
            WhatsApp
          </a>
          <a href="#quote" className={buttonClasses(dark ? "gold" : "primary", "md")}>
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          onClick={openMenu}
          className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
          aria-label="Open menu"
          aria-haspopup="dialog"
        >
          <MenuIcon className="size-6" />
        </button>
      </nav>

      <ProductsPanel open={productsOpen} onNavigate={() => setProductsOpen(false)} />
      <MobileMenu dialogRef={menuRef} onClose={closeMenu} />
    </header>
  );
}

/** Desktop mega menu: every product with a thumbnail, plus a help card. */
function ProductsPanel({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <div
      id="products-panel"
      inert={!open}
      className={`absolute inset-x-0 top-full hidden origin-top border-b border-border bg-background text-text-strong shadow-[0_24px_48px_-24px_rgb(17_26_58/0.25)] transition-[opacity,transform] duration-300 ease-(--ease-soft) lg:block ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="container-page grid grid-cols-12 gap-10 py-10">
        <ul className="col-span-9 grid grid-cols-2 gap-x-8 gap-y-3 xl:grid-cols-4 xl:gap-y-7">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Link
                href={serviceHref(s.slug)}
                onClick={onNavigate}
                className="group flex items-center gap-4 xl:flex-col xl:items-start xl:gap-3"
              >
                <span className="relative block h-16 w-20 shrink-0 overflow-hidden rounded-img bg-surface-muted xl:aspect-[4/3] xl:h-auto xl:w-full">
                  {s.image ? (
                    <Image
                      src={s.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 220px, 80px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center font-serif text-3xl text-text-strong/15 italic">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </span>
                <span>
                  <span className="block font-serif text-xl leading-tight transition-colors group-hover:text-accent-text">
                    {s.short}
                  </span>
                  <span className="mt-0.5 line-clamp-1 block text-sm text-text-muted">{s.perfectFor.slice(0, 2).join(" · ")}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="on-ink col-span-3 flex flex-col justify-between rounded-img bg-surface-inverse p-7 text-text-inverse">
          <div>
            <p className="label text-accent">Not sure?</p>
            <p className="mt-4 font-serif text-[1.75rem] leading-tight">
              Tell us what you need — we’ll suggest the best way to print it.
            </p>
          </div>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("gold", "md", "mt-8 w-full")}
          >
            <WhatsAppIcon className="size-[1.125rem]" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
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
      className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-text-strong backdrop:bg-transparent open:flex open:flex-col lg:hidden"
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

      <div className="container-page flex-1 overflow-y-auto pb-6">
        <p className="label mt-4 text-accent-text">Products</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 border-b border-border pb-5">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={serviceHref(s.slug)} className="flex min-h-11 items-center justify-between gap-2 py-1 text-[0.9375rem]">
                {s.short}
                <ArrowUpRightIcon className="size-3.5 shrink-0 text-text-muted" />
              </Link>
            </li>
          ))}
        </ul>

        <ul>
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-border">
              <a href={link.href} className="flex items-center py-4 font-serif text-[2.25rem] leading-none">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page shrink-0 space-y-3 border-t border-border pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-2 gap-3">
          <a href="#quote" className={buttonClasses("primary", "md", "w-full")}>
            Get a Quote
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("whatsapp", "md", "w-full")}
          >
            <WhatsAppIcon className="size-[1.125rem]" />
            WhatsApp
          </a>
        </div>
        <div className="flex items-center justify-center gap-6 text-sm text-text-muted">
          <a href={`tel:${site.phone.tel}`} className="inline-flex min-h-11 items-center gap-2 hover:text-text-strong">
            <PhoneIcon className="size-4" />
            {site.phone.display}
          </a>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 hover:text-text-strong"
          >
            <InstagramIcon className="size-4" />
            Instagram
          </a>
        </div>
      </div>
    </dialog>
  );
}
