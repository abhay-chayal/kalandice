import type { Metadata } from "next";

// Per-user pages: never prerender or cache them.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin · Encouraging Poetics" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#F3EFE7] text-[#1C2620]">{children}</div>;
}
