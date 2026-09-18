"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { emails } from "@/data/emails";
import { Brand } from "@/components/brand";
import { demoSessionCookie } from "@/lib/demo-session";

import {
  Activity,
  ChartNoAxesCombined,
  Inbox,
  LayoutGrid,
  LogOut,
  Menu,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    href: "/",
    icon: LayoutGrid,
  },
  {
    label: "Clients",
    href: "/clients",
    icon: Users,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    label: "Inbox",
    href: "/inbox",
    icon: Inbox,
    badge: emails.length,
  },
  {
    label: "Activity",
    href: "/activity",
    icon: Activity,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: ChartNoAxesCombined,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function logOut() {
    document.cookie = `${demoSessionCookie}=; path=/; max-age=0; samesite=lax`;
    window.location.replace("/login");
  }

  return (
    <>
    <header className="flex h-16 items-center justify-between border-b border-[#deded7] bg-[#f5f5f0] px-5 lg:hidden">
      <Link href="/"><Brand compact /></Link>
      <button type="button" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#deded7]">
        <Menu size={20} />
      </button>
    </header>

    {menuOpen && (
      <div className="fixed inset-0 z-50 lg:hidden">
        <button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} className="absolute inset-0 w-full bg-black/30" />
        <div id="mobile-navigation" className="relative flex h-full w-[min(320px,85vw)] flex-col bg-[#f5f5f0] px-6 py-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setMenuOpen(false)}><Brand compact /></Link>
            <button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#deded7]"><X size={20} /></button>
          </div>
          <nav className="mt-10 space-y-1" aria-label="Mobile navigation">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} aria-current={active ? "page" : undefined} className={["flex min-h-12 w-full items-center rounded-full px-4 py-3 text-sm transition", active ? "bg-[#171717] text-white" : "text-[#686864] hover:bg-white hover:text-[#171717]"].join(" ")}>
                  <span className="flex flex-1 items-center gap-3"><Icon size={16} />{item.label}</span>
                  {item.badge && <span className={["rounded-full px-2 py-0.5 text-xs", active ? "bg-white text-black" : "bg-[#f3cfe0] text-black"].join(" ")}>{item.badge}</span>}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto">
            <button type="button" onClick={logOut} className="flex min-h-12 w-full items-center gap-3 rounded-full px-4 text-sm text-[#686864] transition hover:bg-white hover:text-[#171717]"><LogOut size={16} />Log out</button>
            <div className="mt-6 flex items-center gap-2 text-xs text-[#777770]"><span className="h-2 w-2 rounded-full bg-[#b9e879]" />Systems connected</div>
          </div>
        </div>
      </div>
    )}

    <aside className="sticky top-0 hidden h-screen w-[190px] shrink-0 flex-col border-r border-[#deded7] bg-[#f5f5f0] px-6 py-8 lg:flex">
      <Link href="/">
        <Brand descriptor />
      </Link>

      <nav className="mt-16 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex w-full items-center rounded-full px-4 py-3 text-sm transition",
                active
                  ? "bg-[#171717] text-white"
                  : "text-[#686864] hover:bg-white hover:text-[#171717]",
              ].join(" ")}
            >
              <span className="flex flex-1 items-center gap-3">
                <Icon size={16} />
                {item.label}
              </span>

              {item.badge && (
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-xs",
                    active
                      ? "bg-white text-black"
                      : "bg-[#f3cfe0] text-black",
                  ].join(" ")}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button type="button" onClick={logOut} className="mb-6 flex w-full items-center gap-3 rounded-full px-4 py-3 text-sm text-[#686864] transition hover:bg-white hover:text-[#171717]"><LogOut size={16} />Log out</button>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#b9e879]" />

          <span className="text-xs text-[#777770]">
            Systems connected
          </span>
        </div>
      </div>
    </aside>
    </>
  );
}
