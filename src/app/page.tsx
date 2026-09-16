"use client";

import { useState } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  PackageCheck,
  RefreshCw,
  Search,
  ShoppingBag,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";

import {
  attentionItems,
  recentActivity,
  syncBatches,
} from "@/data/mock-data";

export default function Home() {
  const [activities, setActivities] = useState(recentActivity);
  const [updates, setUpdates] = useState(23);
  const [inboxCount, setInboxCount] = useState(14);

  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [syncIndex, setSyncIndex] = useState(0);
  const [lastSync, setLastSync] = useState("2 minutes ago");

  function handleSync() {
    if (syncing) return;

    setSyncing(true);
    setSynced(false);

    setTimeout(() => {
      const batch = syncBatches[syncIndex % syncBatches.length];

      setActivities((current) => [
        ...batch.activities,
        ...current,
      ]);

      setUpdates((current) => current + batch.count);
      setInboxCount((current) => current + batch.newEmails);

      setSyncIndex((current) => current + 1);
      setLastSync("just now");

      setSyncing(false);
      setSynced(true);

      setTimeout(() => {
        setSynced(false);
      }, 2500);
    }, 1100);
  }

  return (
    <AppShell>
      <div className="px-10 py-8 lg:px-14">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="text-sm text-[#777770]">
            Wednesday, 16 September
          </div>

          <div className="flex items-center gap-3">
            {synced && (
              <div className="flex items-center gap-2 rounded-full bg-[#d8f2a6] px-4 py-2.5 text-sm">
                <Check size={15} />
                Sync completed
              </div>
            )}

            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[#deded7] bg-white transition hover:scale-[1.04]">
              <Search size={17} />
            </button>

            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex min-w-[104px] items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-medium text-white transition hover:scale-[1.02] disabled:cursor-wait disabled:opacity-70"
            >
              <RefreshCw
                size={16}
                className={syncing ? "animate-spin" : ""}
              />

              {syncing ? "Syncing..." : "Sync"}
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-20">
          <p className="text-sm text-[#777770]">
            Good afternoon.
          </p>

          <h1 className="mt-3 max-w-[850px] text-[76px] font-medium leading-[0.88] tracking-[-0.075em] xl:text-[96px]">
            Everything
            <br />
            under control.
          </h1>
        </section>

        {/* KPI Cards */}
        <section className="mt-16 grid grid-cols-12 gap-5">
          <article className="col-span-12 min-h-[290px] rounded-[34px] bg-[#f3e5bd] p-8 md:col-span-6">
            <div className="flex items-start justify-between">
              <p className="text-sm">
                Sales
              </p>

              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 transition hover:bg-black hover:text-white">
                <ArrowUpRight size={18} />
              </button>
            </div>

            <p className="mt-16 text-[64px] font-medium tracking-[-0.07em]">
              €80.3K
            </p>

            <div className="mt-8 flex items-end justify-between">
              <p className="text-sm text-black/60">
                This month
              </p>

              <span className="rounded-full border border-black/15 px-3 py-1 text-xs">
                +12.4%
              </span>
            </div>
          </article>

          <article className="col-span-6 min-h-[290px] rounded-[34px] bg-[#dcd5f7] p-8 md:col-span-3">
            <p className="text-sm">
              Inbox
            </p>

            <p className="mt-16 text-[58px] font-medium tracking-[-0.07em]">
              {inboxCount}
            </p>

            <p className="mt-8 text-sm text-black/60">
              6 need attention
            </p>
          </article>

          <article className="col-span-6 min-h-[290px] rounded-[34px] bg-[#d8f2a6] p-8 md:col-span-3">
            <p className="text-sm">
              Orders
            </p>

            <p className="mt-16 text-[58px] font-medium tracking-[-0.07em]">
              53
            </p>

            <p className="mt-8 text-sm text-black/60">
              4 delayed
            </p>
          </article>
        </section>

        {/* Attention */}
        <section className="mt-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-[#777770]">
                Priority
              </p>

              <h2 className="mt-2 text-[42px] font-medium tracking-[-0.055em]">
                Needs your attention
              </h2>
            </div>

            <button className="flex items-center gap-2 text-sm transition hover:opacity-60">
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-7 overflow-hidden rounded-[30px] border border-[#deded7] bg-white">
            {attentionItems.map((item, index) => (
              <button
                key={item.id}
                className={[
                  "group flex w-full items-center gap-6 px-7 py-6 text-left transition hover:bg-[#fafaf7]",
                  index !== attentionItems.length - 1
                    ? "border-b border-[#e8e8e2]"
                    : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-3 w-3 shrink-0 rounded-full",
                    item.tone === "pink" && "bg-[#ef91aa]",
                    item.tone === "lavender" && "bg-[#a99ce8]",
                    item.tone === "cream" && "bg-[#e2c46f]",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />

                <div className="grid flex-1 grid-cols-[120px_1fr_1fr] items-center gap-5">
                  <div>
                    <p className="text-xs text-[#888882]">
                      {item.type}
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {item.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {item.client}
                    </p>

                    <p className="mt-1 text-sm text-[#777770]">
                      {item.message}
                    </p>
                  </div>

                  <p className="text-right text-sm text-[#999992]">
                    {item.time}
                  </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#deded7] transition group-hover:bg-[#171717] group-hover:text-white">
                  <ArrowUpRight size={16} />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Activity */}
        <section className="mt-20 pb-20">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 rounded-[34px] bg-white p-8 lg:col-span-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-[#777770]">
                    Live feed
                  </p>

                  <h2 className="mt-2 text-[42px] font-medium tracking-[-0.055em]">
                    Recent activity
                  </h2>
                </div>

                <button className="flex items-center gap-2 text-sm transition hover:opacity-60">
                  View all
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="mt-10">
                {activities.slice(0, 7).map(
                  (activity, index) => {
                    const isEmail =
                      activity.source === "Email";

                    return (
                      <div
                        key={activity.id}
                        className="relative flex gap-5 pb-8 last:pb-0"
                      >
                        {index !==
                          Math.min(activities.length, 7) - 1 && (
                          <div className="absolute left-[19px] top-10 h-[calc(100%-16px)] w-px bg-[#e1e1db]" />
                        )}

                        <div
                          className={[
                            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                            isEmail
                              ? "bg-[#dcd5f7]"
                              : "bg-[#d8f2a6]",
                          ].join(" ")}
                        >
                          {isEmail ? (
                            <Mail size={16} />
                          ) : (
                            <PackageCheck size={16} />
                          )}
                        </div>

                        <div className="flex flex-1 items-start justify-between gap-6 pt-1">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {activity.title}
                              </span>

                              <span className="rounded-full bg-[#f3f3ef] px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-[#777770]">
                                {activity.source}
                              </span>
                            </div>

                            <p className="mt-1 text-sm text-[#777770]">
                              {activity.description}
                            </p>
                          </div>

                          <span className="text-sm text-[#999992]">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Email ↔ App */}
            <div className="col-span-12 flex min-h-[480px] flex-col rounded-[34px] bg-[#171717] p-8 text-white lg:col-span-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/50">
                    Connection
                  </p>

                  <h2 className="mt-2 text-[38px] font-medium leading-[0.95] tracking-[-0.055em]">
                    Email
                    <br />
                    meets App.
                  </h2>
                </div>

                <button
                  onClick={handleSync}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
                >
                  <RefreshCw
                    size={17}
                    className={syncing ? "animate-spin" : ""}
                  />
                </button>
              </div>

              <div className="my-auto py-12">
                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dcd5f7] text-black">
                    <Mail size={24} />
                  </div>

                  <div className="flex flex-1 items-center px-5">
                    <div className="h-px flex-1 bg-white/25" />

                    <div className="mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/25">
                      ↔
                    </div>

                    <div className="h-px flex-1 bg-white/25" />
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d8f2a6] text-black">
                    <ShoppingBag size={24} />
                  </div>
                </div>

                <div className="mt-4 flex justify-between text-xs text-white/50">
                  <span>Email</span>
                  <span>App</span>
                </div>
              </div>

              <div className="rounded-[24px] bg-white/10 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">
                    Last sync
                  </span>

                  <span className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-[#d8f2a6]" />
                    Connected
                  </span>
                </div>

                <p className="mt-6 text-[30px] font-medium tracking-[-0.05em]">
                  {updates} updates
                </p>

                <p className="mt-1 text-sm text-white/50">
                  {lastSync}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}