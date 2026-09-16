"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  Mail,
  PackageCheck,
  Search,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { activity } from "@/data/activity";

type ActivityFilter = "All" | "Email" | "App";

export default function ActivityPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<ActivityFilter>("All");

  const filteredActivity = useMemo(() => {
    return activity.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.client.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.orderId.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" || item.source === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const emailEvents = activity.filter(
    (item) => item.source === "Email"
  ).length;

  const appEvents = activity.filter(
    (item) => item.source === "App"
  ).length;

  const filters: ActivityFilter[] = [
    "All",
    "Email",
    "App",
  ];

  return (
    <AppShell>
      <div className="px-5 py-6 sm:px-8 lg:px-14 lg:py-8">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 lg:gap-6">
          <p className="text-sm text-[#777770]">
            Control Tower / Activity
          </p>

          <div className="relative w-full lg:max-w-[340px]">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777770]"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search activity..."
              className="h-11 w-full rounded-full border border-[#deded7] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#171717]"
            />
          </div>
        </header>

        {/* Hero */}
        <section className="mt-12 lg:mt-20">
          <p className="text-sm text-[#777770]">
            Unified event stream
          </p>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h1 className="text-[52px] font-medium leading-[0.88] tracking-[-0.075em] sm:text-[68px] lg:text-[76px] xl:text-[96px]">
              Everything
              <br />
              that happened.
            </h1>

            <div className="pb-2 text-right">
              <p className="text-[42px] font-medium tracking-[-0.055em]">
                {activity.length}
              </p>

              <p className="text-sm text-[#777770]">
                recent events
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mt-16 grid grid-cols-12 gap-5">
          <article className="col-span-12 min-h-[240px] rounded-[34px] bg-[#171717] p-8 text-white md:col-span-5">
            <p className="text-sm text-white/50">
              Unified feed
            </p>

            <h2 className="mt-6 text-[42px] font-medium leading-[0.95] tracking-[-0.055em]">
              Email
              <br />
              meets App.
            </h2>

            <p className="mt-8 max-w-[300px] text-sm leading-6 text-white/50">
              One timeline for communication, CRM and
              operational updates.
            </p>
          </article>

          <article className="col-span-12 min-h-[240px] rounded-[34px] bg-[#dcd5f7] p-8 sm:col-span-6 lg:col-span-3">
            <Mail size={20} />

            <p className="mt-12 text-[48px] font-medium tracking-[-0.06em]">
              {emailEvents}
            </p>

            <p className="mt-7 text-sm text-black/60">
              Email events
            </p>
          </article>

          <article className="col-span-12 min-h-[240px] rounded-[34px] bg-[#d8f2a6] p-8 sm:col-span-6 lg:col-span-4">
            <PackageCheck size={20} />

            <p className="mt-12 text-[48px] font-medium tracking-[-0.06em]">
              {appEvents}
            </p>

            <p className="mt-7 text-sm text-black/60">
              App events
            </p>
          </article>
        </section>

        {/* Activity timeline */}
        <section className="mt-20 pb-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm text-[#777770]">
                Timeline
              </p>

              <h2 className="mt-2 text-[32px] font-medium tracking-[-0.055em] lg:text-[42px]">
                Recent activity
              </h2>

              <p className="mt-2 text-sm text-[#777770]">
                {filteredActivity.length} events
              </p>
            </div>

            <div className="flex gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={[
                    "min-h-11 rounded-full px-4 py-2 text-sm transition lg:min-h-0",
                    filter === item
                      ? "bg-[#171717] text-white"
                      : "border border-[#deded7] text-[#777770] hover:bg-white",
                  ].join(" ")}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 rounded-[34px] border border-[#deded7] bg-white p-5 lg:p-8">
            {filteredActivity.length > 0 ? (
              filteredActivity.map((item, index) => {
                const isEmail =
                  item.source === "Email";

                return (
                  <div
                    key={item.id}
                    className="relative flex gap-4 pb-9 last:pb-0 lg:gap-6"
                  >
                    {index !==
                      filteredActivity.length - 1 && (
                      <div className="absolute left-[21px] top-11 h-[calc(100%-18px)] w-px bg-[#e4e4de]" />
                    )}

                    <div
                      className={[
                        "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                        isEmail
                          ? "bg-[#dcd5f7]"
                          : "bg-[#d8f2a6]",
                      ].join(" ")}
                    >
                      {isEmail ? (
                        <Mail size={17} />
                      ) : (
                        <PackageCheck size={17} />
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-wrap items-start justify-between gap-3 pt-1 lg:gap-8">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium">
                            {item.type}
                          </p>

                          <span className="rounded-full bg-[#f3f3ef] px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-[#777770]">
                            {item.source}
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-[#777770]">
                          {item.description}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <Link
                            href={`/clients/${item.clientId}`}
                            className="text-sm font-medium transition hover:opacity-55"
                          >
                            {item.client}
                          </Link>

                          <span className="text-[#c1c1bb]">
                            /
                          </span>

                          <Link
                            href={`/orders/${item.orderId}`}
                            className="flex items-center gap-1 text-sm text-[#777770] transition hover:text-black"
                          >
                            {item.orderId}
                            <ArrowUpRight size={13} />
                          </Link>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-medium">
                          {item.time}
                        </p>

                        <p className="mt-1 text-xs text-[#999992]">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center">
                <p className="text-lg font-medium">
                  No activity found
                </p>

                <p className="mt-2 text-sm text-[#777770]">
                  Try another search or filter.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setFilter("All");
                  }}
                  className="mt-5 rounded-full bg-[#171717] px-5 py-2.5 text-sm text-white"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
