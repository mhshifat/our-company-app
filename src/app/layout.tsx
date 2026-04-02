import type { Metadata, Viewport } from "next";
import { Geist_Mono, Nunito_Sans } from "next/font/google";
import { SITE } from "@/lib/site";
import { ExternalScripts } from "@/components/external-scripts";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function siteOrigin() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
    "http://localhost:3000"
  );
}

const title = `${SITE.name} — Web, mobile & commerce engineering`;
const description = SITE.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.ico",
  },
  title: {
    default: title,
    template: `%s · ${SITE.name}`,
  },
  description,
  keywords: [
    "WordPress agency",
    "Shopify development",
    "e-commerce development",
    "Next.js",
    "React Native",
    "AI consulting",
    "custom software",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteOrigin()}/#website`,
      url: siteOrigin(),
      name: SITE.name,
      description,
      inLanguage: "en-US",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteOrigin()}/#business`,
      name: SITE.name,
      url: siteOrigin(),
      description,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        {children}
        <ExternalScripts />
      </body>
    </html>
  );
}
