import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Kalandice Thomas | Encouraging Poetics - Digital Sanctuary",
  description:
    "A place of peace, hope, healing, and encouragement. Finding Hope. Healing Through Faith. One Poem At A Time.",
  openGraph: {
    title: "Kalandice Thomas | Encouraging Poetics",
    description: "Finding Hope. Healing Through Faith. One Poem At A Time.",
    images: ["/images/book-cover.png"],
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
