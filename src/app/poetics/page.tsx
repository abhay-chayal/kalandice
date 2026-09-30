import type { Metadata } from "next";
import { PoeticsView } from "@/components/pages/PoeticsView";

export const metadata: Metadata = {
  title: "Poetry Sanctuary",
  description:
    "Explore poems from Encouraging Poetics by Kalandice Thomas — words of hope and healing for anxious hearts and seasons of waiting.",
  alternates: { canonical: "/poetics" },
};

export default function PoeticsPage() {
  return <PoeticsView />;
}
