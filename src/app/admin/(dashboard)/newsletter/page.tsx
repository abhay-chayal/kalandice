import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { getNewsletterSettings } from "@/lib/content/queries";
import { saveNewsletterSettings } from "@/app/admin/actions";
import { AdminForm, SubmitButton } from "@/components/admin/client";
import { Card, Field, PageHeader, SavedBanner, inputClass } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Newsletter Text" };

export default async function NewsletterSettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const settings = await getNewsletterSettings();

  return (
    <>
      <PageHeader
        title="Newsletter Signup Text"
        description="The wording of the signup section at the bottom of your home page. Leave a box empty to go back to the original wording."
      />
      <SavedBanner show={saved === "1"}>Saved! Your home page is updated.</SavedBanner>

      <AdminForm action={saveNewsletterSettings}>
        <Card className="space-y-5">
          <Field label="Small label above the heading" htmlFor="eyebrow" hint="A short phrase, e.g. “Monthly Encouragement Sanctuary”.">
            <input id="eyebrow" name="eyebrow" maxLength={80} defaultValue={settings.eyebrow} className={inputClass} />
          </Field>

          <Field label="Heading" htmlFor="heading">
            <input id="heading" name="heading" maxLength={160} defaultValue={settings.heading} className={inputClass} />
          </Field>

          <Field
            label="Description"
            htmlFor="intro"
            hint="Say what people will receive and roughly how often. Only promise what you'd like to keep to — you can change this any time."
          >
            <textarea id="intro" name="intro" rows={4} maxLength={600} defaultValue={settings.intro} className={inputClass} />
          </Field>
        </Card>

        <Card className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Text inside the email box" htmlFor="placeholder">
              <input id="placeholder" name="placeholder" maxLength={80} defaultValue={settings.placeholder} className={inputClass} />
            </Field>
            <Field label="Button text" htmlFor="button_label">
              <input id="button_label" name="button_label" maxLength={40} defaultValue={settings.button_label} className={inputClass} />
            </Field>
          </div>

          <Field label="Thank-you message" htmlFor="success_message" hint="Shown straight after someone signs up.">
            <input id="success_message" name="success_message" maxLength={300} defaultValue={settings.success_message} className={inputClass} />
          </Field>
        </Card>

        <div className="flex items-center gap-3">
          <SubmitButton>Save wording</SubmitButton>
          <a
            href="/#newsletter"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-sm font-semibold text-[#536458] hover:text-[#193323]"
          >
            See it on the website
          </a>
        </div>
      </AdminForm>
    </>
  );
}
