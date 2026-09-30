import type { Metadata } from "next";
import { ResourcesView } from "@/components/pages/ResourcesView";
import { getResources } from "@/lib/content/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Resources for Spirit & Mind",
  description:
    "Worship playlists on Spotify, trusted mental health support including the 988 Lifeline, and help finding a local church — curated by Kalandice Thomas.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesPage() {
  const resources = await getResources();
  return <ResourcesView resources={resources} />;
}
