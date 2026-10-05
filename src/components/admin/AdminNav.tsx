"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  ExternalLink,
  HeartHandshake,
  MessageSquareQuote,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  NotebookPen,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { signOut } from "@/app/admin/auth-actions";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Blog Posts", icon: NotebookPen },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/books", label: "Books", icon: BookOpen },
  { href: "/admin/resources", label: "Resources", icon: HeartHandshake },
  { href: "/admin/testimonials", label: "Reader Quotes", icon: MessageSquareQuote },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/newsletter", label: "Newsletter Text", icon: Megaphone },
  { href: "/admin/account", label: "Account", icon: UserRound },
];

export function AdminNav({ email, unread }: { email: string; unread: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              active ? "bg-[#193323] text-[#D4AF37]" : "text-[#254631] hover:bg-[#193323]/5"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1">{label}</span>
            {href === "/admin/messages" && unread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#C9A44C] text-[#193323] text-[11px] font-bold">{unread}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="space-y-3 pt-4 border-t border-[#5F8067]/15">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-[#254631] hover:bg-[#193323]/5"
      >
        <ExternalLink className="w-4 h-4" />
        View website
      </a>
      <p className="px-3.5 text-xs text-[#536458] truncate" title={email}>
        {email}
      </p>
      <form action={signOut}>
        <button
          type="submit"
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-[#A33A26] hover:bg-[#A33A26]/10"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </form>
    </div>
  );

  const brand = (
    <Link href="/admin" className="flex items-center gap-3" onClick={() => setOpen(false)}>
      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#C9A44C] shrink-0">
        <Image src="/images/logo.webp" alt="" fill sizes="40px" className="object-cover" />
      </div>
      <div className="leading-tight">
        <p className="font-serif-luxury font-bold text-[#193323]">Encouraging Poetics</p>
        <p className="text-xs text-[#536458]">Website dashboard</p>
      </div>
    </Link>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#FAF7F2]/95 backdrop-blur border-b border-[#5F8067]/15">
        {brand}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="p-2 rounded-xl text-[#193323] hover:bg-[#193323]/5"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 z-20 bg-[#FAF7F2] p-4 overflow-y-auto space-y-4">
          {nav}
          {footer}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col justify-between p-5 bg-[#FAF7F2] border-r border-[#5F8067]/15">
        <div className="space-y-8">
          {brand}
          {nav}
        </div>
        {footer}
      </aside>
    </>
  );
}
