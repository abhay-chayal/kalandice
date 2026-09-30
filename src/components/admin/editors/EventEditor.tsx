import Link from "next/link";
import { saveEvent } from "@/app/admin/actions";
import { AdminForm, ImageUpload, SubmitButton } from "@/components/admin/client";
import { Card, Field, inputClass } from "@/components/admin/ui";
import type { SiteEvent } from "@/lib/content/types";

const CATEGORIES = ["Book Signing", "Open Mic", "Virtual Fellowship", "Speaking Engagement", "Workshop"];

export function EventEditor({ event }: { event?: SiteEvent }) {
  return (
    <AdminForm action={saveEvent}>
      <input type="hidden" name="id" value={event?.id ?? ""} />

      <Card className="space-y-5">
        <Field label="Event name" htmlFor="title">
          <input id="title" name="title" required maxLength={200} defaultValue={event?.title} className={inputClass} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Type of event" htmlFor="category" hint="Used for the filter buttons on the Events page.">
            <input id="category" name="category" list="event-categories" defaultValue={event?.category ?? "Book Signing"} className={inputClass} />
            <datalist id="event-categories">
              {CATEGORIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
          <Field label="Location" htmlFor="location" hint="A venue and city, or “Online via Zoom”.">
            <input id="location" name="location" maxLength={200} defaultValue={event?.location} className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Date as visitors see it" htmlFor="date_label" hint="Anything you like: “Saturday, Nov 8, 2026” or “Every first Monday”.">
            <input id="date_label" name="date_label" maxLength={100} defaultValue={event?.date_label} className={inputClass} />
          </Field>
          <Field label="Time" htmlFor="time_label" hint="e.g. “6:30 PM – 8:30 PM CST”">
            <input id="time_label" name="time_label" maxLength={100} defaultValue={event?.time_label} className={inputClass} />
          </Field>
        </div>

        <Field label="Description" htmlFor="description">
          <textarea id="description" name="description" rows={4} maxLength={2000} defaultValue={event?.description} className={inputClass} />
        </Field>

        <Field label="RSVP or ticket link (optional)" htmlFor="link_url" hint="Eventbrite, Facebook event, Zoom registration, etc.">
          <input id="link_url" name="link_url" type="url" placeholder="https://" defaultValue={event?.link_url ?? ""} className={inputClass} />
        </Field>

        <Field label="Image (optional)">
          <ImageUpload name="image_url" defaultValue={event?.image_url} folder="events" />
        </Field>
      </Card>

      <Card className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Calendar date (optional)"
            htmlFor="event_date"
            hint="If set, the event is hidden automatically after this day. Leave empty for ongoing events."
          >
            <input id="event_date" name="event_date" type="date" defaultValue={event?.event_date ?? ""} className={inputClass} />
          </Field>
          <Field label="Display order" htmlFor="sort_order" hint="Lower numbers appear first.">
            <input id="sort_order" name="sort_order" type="number" defaultValue={event?.sort_order ?? 0} className={inputClass} />
          </Field>
        </div>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#5F8067]/15 cursor-pointer">
          <input type="checkbox" name="published" defaultChecked={event?.published ?? true} className="mt-1 w-4 h-4 accent-[#193323]" />
          <span>
            <span className="block text-sm font-semibold text-[#193323]">Show on website</span>
            <span className="block text-xs text-[#536458]">Untick to hide this event without deleting it.</span>
          </span>
        </label>
      </Card>

      <div className="flex items-center gap-3">
        <SubmitButton>{event ? "Save changes" : "Save event"}</SubmitButton>
        <Link href="/admin/events" className="px-4 py-2.5 text-sm font-semibold text-[#536458] hover:text-[#193323]">
          Cancel
        </Link>
      </div>
    </AdminForm>
  );
}
