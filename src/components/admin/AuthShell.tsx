import React from "react";
import Image from "next/image";
import Link from "next/link";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="flex flex-col items-center gap-3">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C9A44C] shadow-md">
            <Image src="/images/logo.webp" alt="Encouraging Poetics" fill sizes="64px" className="object-cover" priority />
          </div>
          <span className="font-script-poetry text-lg text-[#C9A44C]">Encouraging Poetics</span>
        </Link>
        <div className="p-8 rounded-3xl bg-white border border-[#5F8067]/15 shadow-lg space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="font-serif-luxury text-2xl font-bold text-[#193323]">{title}</h1>
            {subtitle && <p className="text-sm text-[#536458]">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

export function NotConfiguredNotice() {
  return (
    <div className="px-4 py-3 rounded-xl bg-[#C9A44C]/15 border border-[#C9A44C]/40 text-sm text-[#5C4610]">
      The dashboard isn&apos;t connected to Supabase yet. Follow <strong>SETUP.md</strong> to add the project keys, then restart the site.
    </div>
  );
}
