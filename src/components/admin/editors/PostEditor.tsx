import Link from "next/link";
import { savePost } from "@/app/admin/actions";
import { AdminForm, ImageUpload, SubmitButton } from "@/components/admin/client";
import { Card, Field, inputClass } from "@/components/admin/ui";
import type { Post } from "@/lib/content/types";

const SUGGESTED_CATEGORIES = ["Overcoming Anxiety", "Faith in Waiting", "Quiet Hours", "Healing & Hope", "Encouragement"];

export function PostEditor({ post, categories }: { post?: Post; categories: string[] }) {
  const allCategories = Array.from(new Set([...categories, ...SUGGESTED_CATEGORIES]));

  return (
    <AdminForm action={savePost}>
      <input type="hidden" name="id" value={post?.id ?? ""} />

      <Card className="space-y-5">
        <Field label="Title" htmlFor="title">
          <input id="title" name="title" required maxLength={200} defaultValue={post?.title} className={inputClass} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Category" htmlFor="category" hint="Pick one from the list or type a new one.">
            <input id="category" name="category" list="post-categories" defaultValue={post?.category ?? "Encouragement"} className={inputClass} />
            <datalist id="post-categories">
              {allCategories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
          <Field label="Scripture (optional)" htmlFor="scripture" hint="Shown in a highlighted box at the top of the post.">
            <input id="scripture" name="scripture" maxLength={300} defaultValue={post?.scripture} placeholder="Psalm 23:1 — The Lord is my shepherd..." className={inputClass} />
          </Field>
        </div>

        <Field label="Short summary" htmlFor="excerpt" hint="One or two sentences shown on the Devotionals page and in Google results.">
          <textarea id="excerpt" name="excerpt" rows={2} maxLength={400} defaultValue={post?.excerpt} className={inputClass} />
        </Field>

        <Field
          label="Post"
          htmlFor="content"
          hint={
            <>
              Leave an empty line between paragraphs. Start a line with <code className="px-1 bg-[#193323]/5 rounded">## </code> for a
              subheading, or <code className="px-1 bg-[#193323]/5 rounded">&gt; </code> for a highlighted quote.
            </>
          }
        >
          <textarea id="content" name="content" rows={18} defaultValue={post?.content} className={`${inputClass} font-serif-luxury text-base leading-relaxed`} />
        </Field>

        <Field label="Cover image (optional)">
          <ImageUpload name="cover_image" defaultValue={post?.cover_image} folder="posts" />
        </Field>
      </Card>

      <Card className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Date shown on the post" htmlFor="published_at" hint="Leave empty to use the day you publish.">
            <input id="published_at" name="published_at" type="date" defaultValue={post?.published_at?.slice(0, 10) ?? ""} className={inputClass} />
          </Field>
          <Field label="Web address (optional)" htmlFor="slug" hint="Made from the title if left empty. Changing it breaks links people already shared.">
            <div className="flex items-center gap-1 text-sm text-[#536458]">
              <span className="shrink-0">/blog/</span>
              <input id="slug" name="slug" maxLength={100} defaultValue={post?.slug} placeholder="my-new-post" className={inputClass} />
            </div>
          </Field>
        </div>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#5F8067]/15 cursor-pointer">
          <input type="checkbox" name="published" defaultChecked={post?.published ?? false} className="mt-1 w-4 h-4 accent-[#193323]" />
          <span>
            <span className="block text-sm font-semibold text-[#193323]">Published</span>
            <span className="block text-xs text-[#536458]">Untick to keep this as a private draft that visitors can&apos;t see.</span>
          </span>
        </label>
      </Card>

      <div className="flex items-center gap-3">
        <SubmitButton>{post ? "Save changes" : "Save post"}</SubmitButton>
        <Link href="/admin/posts" className="px-4 py-2.5 text-sm font-semibold text-[#536458] hover:text-[#193323]">
          Cancel
        </Link>
      </div>
    </AdminForm>
  );
}
