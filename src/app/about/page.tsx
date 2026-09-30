import type { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";

export const metadata: Metadata = {
  title: "About the Author",
  description:
    "Meet Kalandice Thomas — Texas Woman's University graduate, poet, and encourager whose writing shares her testimony of faith through anxiety, waiting, and hope.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
