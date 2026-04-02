import Script from "next/script";

type ScriptEntry = {
  src: string;
  [key: string]: string;
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

export function ExternalScripts() {
  const scripts = getScripts();
  if (scripts.length === 0) return null;

  return (
    <>
      {scripts.map(({ src, strategy, ...attrs }, i) => (
        <Script
          key={src}
          src={src}
          strategy={(strategy as "afterInteractive" | "lazyOnload" | "beforeInteractive") ?? "afterInteractive"}
          id={`ext-script-${i}`}
          {...attrs}
        />
      ))}
    </>
  );
}
