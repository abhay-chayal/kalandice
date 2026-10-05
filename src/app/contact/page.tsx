import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Prayer Requests",
  description: "Send Kalandice Thomas a note, a book club or speaking invitation, or a confidential prayer request.",
  path: "/contact",
  image: null,
});

export default function ContactPage() {
  return <ContactView />;
}
