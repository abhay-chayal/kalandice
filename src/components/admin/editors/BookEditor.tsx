import Link from "next/link";
import { saveBook } from "@/app/admin/actions";
import { AdminForm, ImageUpload, SubmitButton } from "@/components/admin/client";
import { Card, Field, inputClass } from "@/components/admin/ui";
import type { Book } from "@/lib/content/types";

export function BookEditor({ book }: { book?: Book }) {
  return (
    <AdminForm action={saveBook}>
      <input type="hidden" name="id" value={book?.id ?? ""} />

      <Card className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Book title" htmlFor="title">
            <input id="title" name="title" required maxLength={200} defaultValue={book?.title} className={inputClass} />
          </Field>
          <Field label="Subtitle / byline" htmlFor="subtitle">
            <input id="subtitle" name="subtitle" maxLength={200} defaultValue={book?.subtitle ?? "By Kalandice Thomas"} className={inputClass} />
          </Field>
        </div>

        <Field label="Description" htmlFor="description">
          <textarea id="description" name="description" rows={6} maxLength={5000} defaultValue={book?.description} className={inputClass} />
        </Field>

        <Field label="Scripture or quote (optional)" htmlFor="scripture">
          <input id="scripture" name="scripture" maxLength={300} defaultValue={book?.scripture} className={inputClass} />
        </Field>

        <Field label="Themes" htmlFor="themes" hint="One per line. Shown as little tags under the description.">
          <textarea id="themes" name="themes" rows={5} defaultValue={book?.themes.join("\n")} className={inputClass} />
        </Field>

        <Field label="Cover image">
          <ImageUpload name="cover_image" defaultValue={book?.cover_image} folder="books" />
        </Field>
      </Card>

      <Card className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Purchase link" htmlFor="buy_url" hint="Amazon or any store page. Leave empty for books that aren't out yet.">
            <input id="buy_url" name="buy_url" type="url" placeholder="https://" defaultValue={book?.buy_url ?? ""} className={inputClass} />
          </Field>
          <Field label="Button text" htmlFor="buy_label">
            <input id="buy_label" name="buy_label" maxLength={80} defaultValue={book?.buy_label ?? "Buy on Amazon"} className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Status" htmlFor="status">
            <select id="status" name="status" defaultValue={book?.status ?? "available"} className={inputClass}>
              <option value="available">Available now</option>
              <option value="coming_soon">Coming soon</option>
            </select>
          </Field>
          <Field label="Display order" htmlFor="sort_order" hint="Lower numbers appear first on the bookshelf.">
            <input id="sort_order" name="sort_order" type="number" defaultValue={book?.sort_order ?? 0} className={inputClass} />
          </Field>
        </div>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#5F8067]/15 cursor-pointer">
          <input type="checkbox" name="featured" defaultChecked={book?.featured ?? false} className="mt-1 w-4 h-4 accent-[#193323]" />
          <span>
            <span className="block text-sm font-semibold text-[#193323]">Featured book</span>
            <span className="block text-xs text-[#536458]">
              Shown on the home page and at the top of the Book page. Only one book can be featured at a time.
            </span>
          </span>
        </label>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#5F8067]/15 cursor-pointer">
          <input type="checkbox" name="published" defaultChecked={book?.published ?? true} className="mt-1 w-4 h-4 accent-[#193323]" />
          <span>
            <span className="block text-sm font-semibold text-[#193323]">Show on website</span>
            <span className="block text-xs text-[#536458]">Untick to hide this book without deleting it.</span>
          </span>
        </label>
      </Card>

      <div className="flex items-center gap-3">
        <SubmitButton>{book ? "Save changes" : "Save book"}</SubmitButton>
        <Link href="/admin/books" className="px-4 py-2.5 text-sm font-semibold text-[#536458] hover:text-[#193323]">
          Cancel
        </Link>
      </div>
    </AdminForm>
  );
}
