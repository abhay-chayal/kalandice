import type { Metadata } from "next";
import { PoeticsView } from "@/components/pages/PoeticsView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Poetry Sanctuary",
  description: "Read poems from Encouraging Poetics by Kalandice Thomas - words of hope and healing for anxious hearts, seasons of waiting and quiet mornings.",
  path: "/poetics",
  image: null,
});

export default function PoeticsPage() {
  return <PoeticsView />;
}
