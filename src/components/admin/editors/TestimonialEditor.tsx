import Link from "next/link";
import { saveTestimonial } from "@/app/admin/actions";
import { AdminForm, SubmitButton } from "@/components/admin/client";
import { Card, Field, inputClass } from "@/components/admin/ui";
import type { Testimonial } from "@/lib/content/types";

export function TestimonialEditor({ testimonial }: { testimonial?: Testimonial }) {
  return (
    <AdminForm action={saveTestimonial}>
      <input type="hidden" name="id" value={testimonial?.id ?? ""} />

      <Card className="space-y-5">
        <Field
          label="What the reader said"
          htmlFor="quote"
          hint="Use their own words. Only publish quotes from real readers who are happy for you to share them."
        >
          <textarea id="quote" name="quote" rows={5} required maxLength={1000} defaultValue={testimonial?.quote} className={inputClass} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Their name" htmlFor="author" hint="A first name and last initial is plenty, e.g. “Sarah M.”">
            <input id="author" name="author" maxLength={120} defaultValue={testimonial?.author} className={inputClass} />
          </Field>
          <Field label="Where they're from (optional)" htmlFor="location" hint="e.g. “Dallas, TX”">
            <input id="location" name="location" maxLength={120} defaultValue={testimonial?.location} className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Stars" htmlFor="rating" hint="Set to 0 to show no stars.">
            <select id="rating" name="rating" defaultValue={String(testimonial?.rating ?? 5)} className={inputClass}>
              {[5, 4, 3, 2, 1, 0].map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? "No stars" : `${n} star${n === 1 ? "" : "s"}`}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Display order" htmlFor="sort_order" hint="Lower numbers appear first.">
            <input id="sort_order" name="sort_order" type="number" defaultValue={testimonial?.sort_order ?? 0} className={inputClass} />
          </Field>
        </div>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#5F8067]/15 cursor-pointer">
          <input type="checkbox" name="published" defaultChecked={testimonial?.published ?? true} className="mt-1 w-4 h-4 accent-[#193323]" />
          <span>
            <span className="block text-sm font-semibold text-[#193323]">Show on website</span>
            <span className="block text-xs text-[#536458]">Untick to hide this quote without deleting it.</span>
          </span>
        </label>
      </Card>

      <div className="flex items-center gap-3">
        <SubmitButton>{testimonial ? "Save changes" : "Save quote"}</SubmitButton>
        <Link href="/admin/testimonials" className="px-4 py-2.5 text-sm font-semibold text-[#536458] hover:text-[#193323]">
          Cancel
        </Link>
      </div>
    </AdminForm>
  );
}
