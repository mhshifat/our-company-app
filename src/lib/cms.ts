import "server-only";

export type CmsPage = {
  slug: string;
  locale: string;
  title?: string;
  metaTitle?: string;
  metaDesc?: string;
  ogImage?: string;
  /** Flat dict — every field key maps to its value (string | string[] | number | bool | object). */
  fields: Record<string, unknown>;
  /** Same fields nested under their section key. */
  sections?: Record<string, Record<string, unknown>>;
  /** Optional ordered blocks API. */
  blocks?: Array<{ type: string; data: Record<string, unknown> }>;
};

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

type TrpcResponse<T> = { result: { data: { json: T } } };

async function trpcGet<T>(
  procedure: string,
  input: Record<string, unknown>,
  revalidate = 60
): Promise<T> {
  const base = env("MERCHANT_SUITE_URL");
  const apiKey = env("MERCHANT_SUITE_API_KEY");
  const payload = encodeURIComponent(
    JSON.stringify({ json: { apiKey, ...input } })
  );
  const url = `${base}/api/trpc/${procedure}?input=${payload}`;

  const res = await fetch(url, {
    next: { revalidate, tags: ["cms"] },
  });

  if (!res.ok) {
    throw new Error(
      `Merchant Suite ${procedure} failed: ${res.status} ${res.statusText}`
    );
  }

  const body = (await res.json()) as TrpcResponse<T>;
  return body.result.data.json;
}

export async function getPage(
  slug: string,
  locale = "default"
): Promise<CmsPage | null> {
  try {
    const page = await trpcGet<CmsPage>("page.publicGetBySlug", {
      slug,
      locale,
    });
    return page ?? null;
  } catch (err) {
    console.error(`[cms] getPage(${slug}) failed`, err);
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Field accessors — safe reads with fallbacks                        */
/* ------------------------------------------------------------------ */

export function getString(
  fields: Record<string, unknown>,
  key: string,
  fallback = ""
): string {
  const v = fields[key];
  return typeof v === "string" ? v : fallback;
}

export function getList(
  fields: Record<string, unknown>,
  key: string,
  fallback: string[] = []
): string[] {
  const v = fields[key];
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  return fallback;
}

/**
 * Walk indexed fields like `${prefix}_${n}_${suffix}` and assemble objects
 * until a row with no values is encountered.
 */
export function buildIndexedRows<T extends Record<string, string | string[]>>(
  fields: Record<string, unknown>,
  prefix: string,
  shape: { [K in keyof T]: { suffix: string; type: "string" | "list" } },
  max = 20
): T[] {
  const rows: T[] = [];
  for (let i = 1; i <= max; i++) {
    const row = {} as Record<string, string | string[]>;
    let any = false;
    for (const [field, def] of Object.entries(shape)) {
      const key = `${prefix}_${i}_${def.suffix}`;
      if (def.type === "list") {
        const v = getList(fields, key);
        row[field] = v;
        if (v.length > 0) any = true;
      } else {
        const v = getString(fields, key);
        row[field] = v;
        if (v) any = true;
      }
    }
    if (!any) break;
    rows.push(row as T);
  }
  return rows;
}
