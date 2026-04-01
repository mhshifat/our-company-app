"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import type { MegaMenuCategory } from "@/lib/mega-menu";
import { MegaMenuArt } from "./mega-menu-art";
import { cn } from "@/lib/utils";

type MegaMenuPanelProps = {
  variant: "products" | "services" | "technologies" | "about";
  categories: readonly MegaMenuCategory[];
  onNavigate?: () => void;
};

export function MegaMenuPanel({
  variant,
  categories,
  onNavigate,
}: MegaMenuPanelProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  useEffect(() => {
    setActiveId(categories[0]?.id ?? "");
  }, [categories]);

  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  const title =
    variant === "products"
      ? "Products"
      : variant === "services"
        ? "Services"
        : variant === "technologies"
          ? "Technologies"
          : "About us";
  const subtitle =
    variant === "products"
      ? "Ship-ready builds and platforms you can grow into."
      : variant === "services"
        ? "End-to-end engineering, from discovery to production."
        : variant === "technologies"
          ? "Languages, frameworks, and infra we use to ship—browse by category."
          : "Who we are, how we engage, and how to reach the team.";

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300/80">
          {title}
        </p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
        <ul className="mt-6 flex flex-col gap-0 border-t border-border/50 pt-2">
          {categories.map((cat) => {
            const isActive = cat.id === active?.id;
            return (
              <li key={cat.id} className="border-b border-border/40">
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-2 py-3.5 text-left text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onMouseEnter={() => setActiveId(cat.id)}
                  onFocus={() => setActiveId(cat.id)}
                >
                  <ChevronRight
                    className={cn(
                      "size-4 shrink-0 transition-transform",
                      isActive ? "translate-x-0.5 text-cyan-400" : "opacity-40"
                    )}
                  />
                  {cat.label}
                </button>
              </li>
            );
          })}
        </ul>
        {active?.href ? (
          <a
            href={active.href}
            className="mt-4 inline-flex text-xs font-medium text-violet-300 hover:text-violet-200"
            onClick={onNavigate}
          >
            View section →
          </a>
        ) : null}
      </div>

      <div className="lg:col-span-5">
        {active ? (
          <div>
            <h3 className="font-heading text-lg font-semibold tracking-tight">
              {active.label}
            </h3>
            <ul className="mt-5 flex flex-col gap-1">
              {active.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-start gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors hover:border-border/60 hover:bg-muted/40"
                    onClick={onNavigate}
                  >
                    <ChevronRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-400" />
                    <span>
                      <span className="block font-medium text-foreground">
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="lg:col-span-4">
        <MegaMenuArt variant={variant} className="h-full" />
      </div>
    </div>
  );
}
