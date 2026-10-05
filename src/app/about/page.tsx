import type { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";
import { pageMetadata, personSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "About the Author",
  description: "Meet Kalandice Thomas - Texas Woman's University graduate, Christian poet and author of Encouraging Poetics, sharing her testimony of faith through anxiety, waiting and hope.",
  path: "/about",
  image: "/images/author-reading-field.webp",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <AboutView />
    </>
  );
}
