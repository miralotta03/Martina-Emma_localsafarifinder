import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Bakas in vid bygget (NEXT_PUBLIC_), se .env.example.
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const metadata: Metadata = {
  title: "Local Safari Finder – Hitta en lokal safari i Afrika",
  description:
    "Vi kopplar dig direkt till små, oberoende safariföretag i Afrika. Inga mellanhänder, inga bokningsavgifter.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sv"
      className={`${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      {/* Umami-statistik på alla sidor. Laddas bara när website-ID:t finns,
          så lokal utveckling utan ID skickar ingen statistik. */}
      {umamiWebsiteId && (
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={umamiWebsiteId}
          strategy="afterInteractive"
        />
      )}
    </html>
  );
}
