"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  AlertCircle,
  ArrowUpRight,
  Mail,
  Search,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { emails } from "@/data/emails";

type EmailFilter =
  | "All"
  | "Unanswered"
  | "Pending"
  | "Answered";

export default function InboxPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<EmailFilter>("All");

  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      const query = search.toLowerCase();

      const matchesSearch =
        email.client.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query) ||
        email.orderId.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" ||
        email.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const unanswered = emails.filter(
    (email) => email.status === "Unanswered"
  ).length;

  const filters: EmailFilter[] = [
    "All",
    "Unanswered",
    "Pending",
    "Answered",
  ];

  return (
    <AppShell>
      <div className="px-10 py-8 lg:px-14">
        {/* Header */}
        <header className="flex items-center justify-between gap-6">
          <p className="text-sm text-[#777770]">
            Communication / Inbox
          </p>

          <div className="relative w-full max-w-[340px]">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777770]"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search email, client or order..."
              className="h-11 w-full rounded-full border border-[#deded7] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#171717]"
            />
          </div>
        </header>

        {/* Hero */}
        <section className="mt-20">
          <p className="text-sm text-[#777770]">
            Unified communication
          </p>

          <div className="mt-3 flex items-end justify-between">
            <h1 className="text-[76px] font-medium leading-[0.88] tracking-[-0.075em] xl:text-[96px]">
              Your
              <br />
              inbox.
            </h1>

            <div className="pb-2 text-right">
              <p className="text-[42px] font-medium tracking-[-0.055em]">
                {emails.length}
              </p>

              <p className="text-sm text-[#777770]">
                recent emails
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mt-16 grid grid-cols-12 gap-5">
          <article className="col-span-12 min-h-[250px] rounded-[34px] bg-[#dcd5f7] p-8 md:col-span-5">
            <Mail size={21} />

            <p className="mt-12 text-[48px] font-medium tracking-[-0.06em]">
              {emails.length}
            </p>

            <p className="mt-7 text-sm text-black/60">
              Emails connected to CRM
            </p>
          </article>

          <article className="col-span-6 min-h-[250px] rounded-[34px] bg-[#f3cfe0] p-8 md:col-span-3">
            <AlertCircle size={21} />

            <p className="mt-12 text-[48px] font-medium tracking-[-0.06em]">
              {unanswered}
            </p>

            <p className="mt-7 text-sm text-black/60">
              Need a response
            </p>
          </article>

          <article className="col-span-6 min-h-[250px] rounded-[34px] bg-[#d8f2a6] p-8 md:col-span-4">
            <p className="text-sm">
              Connected records
            </p>

            <p className="mt-14 text-[48px] font-medium tracking-[-0.06em]">
              100%
            </p>

            <p className="mt-7 text-sm text-black/60">
              Linked to client or order
            </p>
          </article>
        </section>

        {/* Inbox */}
        <section className="mt-20 pb-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm text-[#777770]">
                Unified inbox
              </p>

              <h2 className="mt-2 text-[42px] font-medium tracking-[-0.055em]">
                Recent emails
              </h2>

              <p className="mt-2 text-sm text-[#777770]">
                {filteredEmails.length} results
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={[
                    "rounded-full px-4 py-2 text-sm transition",
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

          <div className="mt-7 overflow-hidden rounded-[30px] border border-[#deded7] bg-white">
            {filteredEmails.map((email, index) => (
              <div
                key={email.id}
                className={[
                  "grid grid-cols-[48px_1.6fr_.8fr_.8fr_220px] items-center gap-5 px-7 py-6",
                  index !== filteredEmails.length - 1
                    ? "border-b border-[#e8e8e2]"
                    : "",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-11 w-11 items-center justify-center rounded-full",
                    email.status === "Unanswered"
                      ? "bg-[#f3cfe0]"
                      : email.status === "Pending"
                        ? "bg-[#f3e5bd]"
                        : "bg-[#d8f2a6]",
                  ].join(" ")}
                >
                  <Mail size={17} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">
                      {email.subject}
                    </p>

                    {email.priority === "High" && (
                      <span className="rounded-full bg-[#f3cfe0] px-2 py-1 text-[10px] uppercase tracking-[0.08em]">
                        Priority
                      </span>
                    )}
                  </div>

                  <p className="mt-1 line-clamp-1 text-sm text-[#777770]">
                    {email.preview}
                  </p>
                </div>

                <Link
                  href={`/clients/${email.clientId}`}
                  className="text-sm font-medium transition hover:opacity-55"
                >
                  {email.client}
                </Link>

                <Link
                  href={`/orders/${email.orderId}`}
                  className="text-sm text-[#777770] transition hover:text-black"
                >
                  {email.orderId}
                </Link>

                <div className="flex items-center justify-end gap-4">
                  <div className="text-right">
                    <p className="text-xs text-[#999992]">
                      {email.time}
                    </p>

                    <span
                      className={[
                        "mt-1 inline-flex rounded-full px-2.5 py-1 text-xs",
                        email.status === "Unanswered"
                          ? "bg-[#f3cfe0]"
                          : email.status === "Pending"
                            ? "bg-[#f3e5bd]"
                            : "bg-[#d8f2a6]",
                      ].join(" ")}
                    >
                      {email.status}
                    </span>
                  </div>

                  <Link
                    href={`/orders/${email.orderId}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#deded7] transition hover:bg-[#171717] hover:text-white"
                  >
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}