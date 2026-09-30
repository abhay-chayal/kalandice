import type { Metadata } from "next";
import { EventsView } from "@/components/pages/EventsView";
import { getUpcomingEvents } from "@/lib/content/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Events & Speaking",
  description:
    "Upcoming book signings, open mics, and virtual fellowship gatherings with Kalandice Thomas. Invite her to speak at your church, campus, or conference.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const events = await getUpcomingEvents();
  return <EventsView events={events} />;
}
