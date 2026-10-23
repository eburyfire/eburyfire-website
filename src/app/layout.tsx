import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Serif_Display, Manrope } from "next/font/google";
import { TopBar } from "@/components/site/TopBar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const defaultTitle = `${site.name} · Keep it boring.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#1E1B2E",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${manrope.variable} ${dmSerif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <TopBar />
        <main id="main" tabIndex={-1} className="flex flex-1 flex-col focus:outline-none">
          {children}
        </main>
        <SiteFooter />

        <Script
          defer
          data-domain="eburyfire.co.uk"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
