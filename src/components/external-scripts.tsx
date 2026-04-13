"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

type ScriptEntry = {
  src: string;
  pathname?: string;
  [key: string]: string | undefined;
};

function getScripts(): ScriptEntry[] {
  const raw = process.env.NEXT_PUBLIC_EXTERNAL_SCRIPTS;
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ScriptEntry[];
  } catch {
    console.error("[ExternalScripts] Failed to parse NEXT_PUBLIC_EXTERNAL_SCRIPTS");
    return [];
  }
}

function matchesPathname(pattern: string | undefined, pathname: string): boolean {
  if (!pattern) return true;
  if (pattern.endsWith("/*")) return pathname.startsWith(pattern.slice(0, -2));
  return pathname === pattern;
}

export function ExternalScripts() {
  const pathname = usePathname();
  const scripts = getScripts().filter((s) => matchesPathname(s.pathname, pathname));
  if (scripts.length === 0) return null;

  return (
    <>
      {scripts.map(({ src, pathname: _p, strategy, ...attrs }, i) => (
        <Script
          key={src}
          src={src}
          strategy={(strategy as "afterInteractive" | "lazyOnload" | "beforeInteractive") ?? "afterInteractive"}
          id={`ext-script-${i}`}
          {...(attrs as Record<string, string>)}
        />
      ))}
    </>
  );
}
