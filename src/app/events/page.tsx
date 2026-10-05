import type { Metadata } from "next";
import { EventsView } from "@/components/pages/EventsView";
import { getUpcomingEvents } from "@/lib/content/queries";
import { eventSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Events & Speaking",
  description:
    "Upcoming book signings, open mics and virtual fellowship gatherings with Kalandice Thomas. Invite her to speak at your church, campus or conference.",
  path: "/events",
});

export default async function EventsPage() {
  const events = await getUpcomingEvents();
  // Only dated events can carry Event markup; Google rejects it without a start date.
  const dated = events.filter((e) => e.event_date);

  return (
    <>
      {dated.length > 0 && (
        <JsonLd data={dated.map((e) => eventSchema({ ...e, event_date: e.event_date as string }))} />
      )}
      <EventsView events={events} />
    </>
  );
}
