"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { NAV } from "@/lib/site";
import {
  MEGA_MENU_ABOUT,
  MEGA_MENU_PRODUCTS,
  MEGA_MENU_SERVICES,
  MEGA_MENU_TECHNOLOGIES,
  type MegaMenuCategory,
} from "@/lib/mega-menu";
import { MegaMenuPanel } from "./mega-menu-panel";

type MegaKey = "products" | "services" | "technologies" | "about";

const CLOSE_DELAY_MS = 140;

function MobileMegaSection({
  label,
  categories,
  onNavigate,
}: {
  label: string;
  categories: readonly MegaMenuCategory[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border/50 bg-muted/20">
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-medium text-foreground"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open ? (
        <div className="border-t border-border/50 px-2 pb-3 pt-1">
          {categories.map((cat) => (
            <div key={cat.id} className="mt-3 first:mt-2">
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {cat.label}
              </p>
              <ul className="mt-1">
                {cat.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="block rounded-lg px-2 py-2 text-sm text-foreground hover:bg-muted/60"
                      onClick={onNavigate}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<MegaKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMega(null), CLOSE_DELAY_MS);
  }, [cancelClose]);

  const openMega = useCallback(
    (key: MegaKey) => {
      cancelClose();
      setMega(key);
    },
    [cancelClose]
  );

  const closeMega = useCallback(() => {
    cancelClose();
    setMega(null);
  }, [cancelClose]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMega();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega, closeMega]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  const megaCategories =
    mega === "products"
      ? MEGA_MENU_PRODUCTS
      : mega === "services"
        ? MEGA_MENU_SERVICES
        : mega === "technologies"
          ? MEGA_MENU_TECHNOLOGIES
          : mega === "about"
            ? MEGA_MENU_ABOUT
            : null;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 w-full transition-[background,box-shadow] duration-300",
        scrolled || mega
          ? "border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:px-10">
        <Link
          href="/"
          className="rounded-lg outline-none ring-offset-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => {
            setOpen(false);
            closeMega();
          }}
        >
          <Logo variant="full" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <div className="mr-1 flex items-center gap-0.5 pr-2">
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1 rounded-lg px-3 text-muted-foreground hover:text-foreground",
                mega === "products" && "bg-muted/70 text-foreground"
              )}
              aria-expanded={mega === "products"}
              aria-haspopup="true"
              onMouseEnter={() => openMega("products")}
              onFocus={() => openMega("products")}
            >
              Products
              <ChevronDown className="size-3.5 opacity-70" />
            </button>
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1 rounded-lg px-3 text-muted-foreground hover:text-foreground",
                mega === "services" && "bg-muted/70 text-foreground"
              )}
              aria-expanded={mega === "services"}
              aria-haspopup="true"
              onMouseEnter={() => openMega("services")}
              onFocus={() => openMega("services")}
            >
              Services
              <ChevronDown className="size-3.5 opacity-70" />
            </button>
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1 rounded-lg px-3 text-muted-foreground hover:text-foreground",
                mega === "technologies" && "bg-muted/70 text-foreground"
              )}
              aria-expanded={mega === "technologies"}
              aria-haspopup="true"
              onMouseEnter={() => openMega("technologies")}
              onFocus={() => openMega("technologies")}
            >
              Technologies
              <ChevronDown className="size-3.5 opacity-70" />
            </button>
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1 rounded-lg px-3 text-muted-foreground hover:text-foreground",
                mega === "about" && "bg-muted/70 text-foreground"
              )}
              aria-expanded={mega === "about"}
              aria-haspopup="true"
              onMouseEnter={() => openMega("about")}
              onFocus={() => openMega("about")}
            >
              About us
              <ChevronDown className="size-3.5 opacity-70" />
            </button>
          </div>

          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
              onMouseEnter={scheduleClose}
              onFocus={scheduleClose}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "rounded-full px-4"
            )}
            onMouseEnter={scheduleClose}
          >
            Let&apos;s talk
          </a>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {mega && megaCategories ? (
        <div
          className="absolute left-1/2 top-full z-50 hidden w-screen max-w-none -translate-x-1/2 border-b border-border/50 bg-background/95 shadow-lg backdrop-blur-xl lg:block"
          onMouseEnter={cancelClose}
        >
          <div className="mx-auto max-h-[min(70vh,calc(100dvh-5rem))] max-w-7xl overflow-y-auto px-6 py-8 md:px-10">
            <MegaMenuPanel
              variant={mega}
              categories={megaCategories}
              onNavigate={closeMega}
            />
          </div>
        </div>
      ) : null}

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border/60 bg-background/95 px-6 py-4 backdrop-blur-xl lg:hidden"
        >
          <div className="flex flex-col gap-3">
            <MobileMegaSection
              label="Products"
              categories={MEGA_MENU_PRODUCTS}
              onNavigate={() => setOpen(false)}
            />
            <MobileMegaSection
              label="Services"
              categories={MEGA_MENU_SERVICES}
              onNavigate={() => setOpen(false)}
            />
            <MobileMegaSection
              label="Technologies"
              categories={MEGA_MENU_TECHNOLOGIES}
              onNavigate={() => setOpen(false)}
            />
            <MobileMegaSection
              label="About us"
              categories={MEGA_MENU_ABOUT}
              onNavigate={() => setOpen(false)}
            />
            <div className="flex flex-col gap-1 pt-1">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-1 w-full justify-center rounded-full"
              )}
              onClick={() => setOpen(false)}
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
