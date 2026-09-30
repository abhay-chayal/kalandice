import React from "react";
import Link from "next/link";

// Small presentational helpers shared by the admin screens.

export const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#5F8067]/25 text-sm text-[#193323] placeholder-[#8CA793] focus:outline-none focus:ring-2 focus:ring-[#C9A44C] focus:border-transparent";

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#193323]">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-[#536458] leading-relaxed">{hint}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 rounded-2xl bg-white border border-[#5F8067]/15 shadow-sm ${className}`}>{children}</div>;
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="font-serif-luxury text-3xl font-bold text-[#193323]">{title}</h1>
        {description && <p className="text-sm text-[#536458] mt-1 max-w-2xl">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#193323] text-[#D4AF37] font-semibold text-sm hover:bg-[#254631] transition-colors shrink-0"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function StatusBadge({ published }: { published: boolean }) {
  return published ? (
    <span className="px-2.5 py-0.5 rounded-full bg-[#5F8067]/15 text-[#254631] text-xs font-semibold">Published</span>
  ) : (
    <span className="px-2.5 py-0.5 rounded-full bg-[#C9A44C]/20 text-[#7A5E16] text-xs font-semibold">Draft</span>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10 rounded-2xl border border-dashed border-[#5F8067]/30 text-center text-sm text-[#536458] bg-white/60">
      {children}
    </div>
  );
}

export function SavedBanner({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show) return null;
  return (
    <div role="status" className="mb-6 px-4 py-3 rounded-xl bg-[#5F8067]/15 border border-[#5F8067]/30 text-sm text-[#193323]">
      {children}
    </div>
  );
}
