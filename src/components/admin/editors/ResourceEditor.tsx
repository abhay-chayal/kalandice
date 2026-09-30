import Link from "next/link";
import { saveResource } from "@/app/admin/actions";
import { AdminForm, SubmitButton } from "@/components/admin/client";
import { Card, Field, inputClass } from "@/components/admin/ui";
import type { Resource, ResourceKind } from "@/lib/content/types";

export const RESOURCE_KIND_LABELS: Record<ResourceKind, string> = {
  playlist: "Spotify / music playlist",
  mental_health: "Mental health support",
  faith: "Faith & church finder",
};

export function ResourceEditor({ resource, defaultKind }: { resource?: Resource; defaultKind?: ResourceKind }) {
  return (
    <AdminForm action={saveResource}>
      <input type="hidden" name="id" value={resource?.id ?? ""} />

      <Card className="space-y-5">
        <Field label="Section" htmlFor="kind" hint="Which part of the Resources page this appears in.">
          <select id="kind" name="kind" defaultValue={resource?.kind ?? defaultKind ?? "playlist"} className={inputClass}>
            {Object.entries(RESOURCE_KIND_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Title" htmlFor="title">
          <input id="title" name="title" required maxLength={200} defaultValue={resource?.title} className={inputClass} />
        </Field>

        <Field label="Short description" htmlFor="description">
          <textarea id="description" name="description" rows={3} maxLength={1000} defaultValue={resource?.description} className={inputClass} />
        </Field>

        <Field label="Link" htmlFor="url" hint="For Spotify: open the playlist → Share → Copy link, then paste it here.">
          <input id="url" name="url" type="url" required placeholder="https://" defaultValue={resource?.url} className={inputClass} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Small label (optional)" htmlFor="tag" hint="e.g. “24/7 Crisis Support”. For the faith box this is the button text.">
            <input id="tag" name="tag" maxLength={60} defaultValue={resource?.tag} className={inputClass} />
          </Field>
          <Field label="Display order" htmlFor="sort_order" hint="Lower numbers appear first.">
            <input id="sort_order" name="sort_order" type="number" defaultValue={resource?.sort_order ?? 0} className={inputClass} />
          </Field>
        </div>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#5F8067]/15 cursor-pointer">
          <input type="checkbox" name="published" defaultChecked={resource?.published ?? true} className="mt-1 w-4 h-4 accent-[#193323]" />
          <span>
            <span className="block text-sm font-semibold text-[#193323]">Show on website</span>
            <span className="block text-xs text-[#536458]">Untick to hide this resource without deleting it.</span>
          </span>
        </label>
      </Card>

      <div className="flex items-center gap-3">
        <SubmitButton>{resource ? "Save changes" : "Save resource"}</SubmitButton>
        <Link href="/admin/resources" className="px-4 py-2.5 text-sm font-semibold text-[#536458] hover:text-[#193323]">
          Cancel
        </Link>
      </div>
    </AdminForm>
  );
}
