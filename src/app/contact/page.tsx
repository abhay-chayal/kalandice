import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";

export const metadata: Metadata = {
  title: "Contact & Prayer Requests",
  description:
    "Send Kalandice Thomas a note, book club or event inquiry, or a confidential prayer request.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactView />;
}
