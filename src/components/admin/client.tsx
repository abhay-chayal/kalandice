"use client";

import React, { createContext, startTransition, useActionState, useContext, useRef, useState } from "react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { ImagePlus, Loader2, X } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/browser";
import { MEDIA_BUCKET } from "@/lib/supabase/config";

export type ActionState = { error?: string };
type FormAction = (prev: ActionState, formData: FormData) => Promise<ActionState>;

const PendingContext = createContext(false);

// Form wrapper for the create/edit screens. The server action redirects on
// success and returns { error } otherwise, which is shown above the buttons.
// It dispatches from onSubmit rather than <form action>, because React resets
// a form after a form action — a failed save would wipe a half-written post.
export function AdminForm({
  action,
  children,
  className = "space-y-6",
}: {
  action: FormAction;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, dispatch, pending] = useActionState(action, {});
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => dispatch(formData));
      }}
    >
      <PendingContext.Provider value={pending}>{children}</PendingContext.Provider>
      {state.error && (
        <p role="alert" className="px-4 py-3 rounded-xl bg-[#F5C2B8]/40 border border-[#C0533E]/30 text-sm text-[#7A2A1C]">
          {state.error}
        </p>
      )}
    </form>
  );
}

export function SubmitButton({ children, pendingLabel = "Saving..." }: { children: React.ReactNode; pendingLabel?: string }) {
  const pending = useContext(PendingContext);
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#193323] text-[#D4AF37] font-semibold text-sm hover:bg-[#254631] transition-colors disabled:opacity-60"
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? pendingLabel : children}
    </button>
  );
}

// Button for small inline forms (delete, mark read). Optionally asks first.
export function ActionButton({
  children,
  confirmMessage,
  variant = "default",
  title,
}: {
  children: React.ReactNode;
  confirmMessage?: string;
  variant?: "default" | "danger";
  title?: string;
}) {
  const { pending } = useFormStatus();
  const styles =
    variant === "danger"
      ? "text-[#A33A26] border-[#A33A26]/30 hover:bg-[#A33A26] hover:text-white"
      : "text-[#193323] border-[#5F8067]/30 hover:bg-[#193323] hover:text-[#D4AF37]";
  return (
    <button
      type="submit"
      title={title}
      disabled={pending}
      onClick={(e) => {
        if (confirmMessage && !window.confirm(confirmMessage)) e.preventDefault();
      }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors disabled:opacity-60 ${styles}`}
    >
      {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
      {children}
    </button>
  );
}

// Shrinks phone photos before upload: max 2000px on the long edge, WebP.
async function prepareImage(file: File): Promise<{ blob: Blob; ext: string }> {
  if (file.type === "image/gif") return { blob: file, ext: "gif" };
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
    if (blob) return { blob, ext: "webp" };
  } catch {
    // Fall through and upload the original file.
  }
  return { blob: file, ext: file.name.split(".").pop()?.toLowerCase() || "jpg" };
}

// Uploads to the Supabase "media" bucket and keeps the public URL in a hidden
// input named `name`, so it's submitted with the rest of the form.
export function ImageUpload({ name, defaultValue, folder }: { name: string; defaultValue?: string | null; folder: string }) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WebP or GIF).");
      return;
    }
    setBusy(true);
    try {
      const { blob, ext } = await prepareImage(file);
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const supabase = createBrowserSupabase();
      const { error: uploadError } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(path, blob, { contentType: blob.type || file.type, cacheControl: "31536000" });
      if (uploadError) throw uploadError;
      setUrl(supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again, or use a smaller image.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={url} />
      {url ? (
        <div className="relative w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden border border-[#5F8067]/20 bg-[#FAF7F2]">
          <Image src={url} alt="Selected image" fill sizes="384px" className="object-contain" unoptimized />
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute top-2 right-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-xs font-semibold text-[#A33A26] shadow"
          >
            <X className="w-3.5 h-3.5" /> Remove
          </button>
        </div>
      ) : null}
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#5F8067]/30 text-sm font-semibold text-[#193323] hover:bg-[#193323]/5 disabled:opacity-60"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
          {busy ? "Uploading..." : url ? "Replace image" : "Upload image"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      {error && <p className="text-xs text-[#A33A26]">{error}</p>}
    </div>
  );
}

