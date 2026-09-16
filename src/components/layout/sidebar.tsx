"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Activity,
  Inbox,
  LayoutGrid,
  ShoppingBag,
  Users,
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
    badge: 14,
  },
  {
    label: "Activity",
    href: "/activity",
    icon: Activity,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-[190px] shrink-0 flex-col border-r border-[#deded7] bg-[#f5f5f0] px-6 py-8">
      <Link href="/">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em]">
          Control
        </p>

        <p className="mt-1 text-[22px] font-medium tracking-[-0.05em]">
          Tower
        </p>
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
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#b9e879]" />

          <span className="text-xs text-[#777770]">
            Systems connected
          </span>
        </div>
      </div>
    </aside>
  );
}