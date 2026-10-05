import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kalandice Thomas | Encouraging Poetics - Digital Sanctuary",
    template: "%s | Kalandice Thomas",
  },
  description:
    "A place of peace, hope, healing, and encouragement. Finding Hope. Healing Through Faith. One Poem At A Time.",
  applicationName: "Encouraging Poetics",
  authors: [{ name: "Kalandice Thomas" }],
  keywords: ["Kalandice Thomas", "Encouraging Poetics", "Christian poetry", "faith", "hope", "healing", "devotionals"],
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel to verify Google Search Console.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    type: "website",
    siteName: "Encouraging Poetics",
    locale: "en_US",
    title: "Kalandice Thomas | Encouraging Poetics",
    description: "Finding Hope. Healing Through Faith. One Poem At A Time.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Encouraging Poetics by Kalandice Thomas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalandice Thomas | Encouraging Poetics",
    description: "Finding Hope. Healing Through Faith. One Poem At A Time.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dancingScript.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#1C2620] selection:bg-[#E5ECE6]">
        {children}
      </body>
    </html>
  );
}
