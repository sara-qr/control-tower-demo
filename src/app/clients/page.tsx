"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  Search,
  X,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { clients } from "@/data/clients";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

type StatusFilter = "All" | "Pending" | "Delivered" | "Shipped";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("All");

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        client.crmId
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        client.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalSales = clients.reduce(
    (total, client) => total + client.sales,
    0
  );

  const averageMargin = Math.round(
    clients.reduce(
      (total, client) => total + client.margin,
      0
    ) / clients.length
  );

  const topClient = [...clients].sort(
    (a, b) => b.sales - a.sales
  )[0];

  const filters: StatusFilter[] = [
    "All",
    "Pending",
    "Shipped",
    "Delivered",
  ];

  return (
    <AppShell>
      <div className="px-5 py-6 sm:px-8 lg:px-14 lg:py-8">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 lg:gap-6">
          <p className="text-sm text-[#777770]">
            CRM / Clients
          </p>

          <div className="relative w-full lg:max-w-[320px]">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777770]"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search client or CRM ID..."
              className="h-11 w-full rounded-full border border-[#deded7] bg-white pl-11 pr-10 text-sm outline-none transition focus:border-[#171717]"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full hover:bg-[#f1f1ed]"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </header>

        {/* Hero */}
        <section className="mt-12 lg:mt-20">
          <p className="text-sm text-[#777770]">
            Customer intelligence
          </p>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <h1 className="text-[52px] font-medium leading-[0.88] tracking-[-0.075em] sm:text-[68px] lg:text-[76px] xl:text-[96px]">
              Your
              <br />
              clients.
            </h1>

            <div className="pb-2 text-right">
              <p className="text-[42px] font-medium tracking-[-0.055em]">
                {clients.length}
              </p>

              <p className="text-sm text-[#777770]">
                active clients
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mt-16 grid grid-cols-12 gap-5">
          <Link
            href={`/clients/${topClient.id}`}
            className="group col-span-12 min-h-[250px] rounded-[34px] bg-[#dcd5f7] p-8 transition hover:-translate-y-1 md:col-span-5"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm">
                Top client
              </p>

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 transition group-hover:bg-black group-hover:text-white">
                <ArrowUpRight size={17} />
              </span>
            </div>

            <h2 className="mt-12 max-w-[300px] text-[38px] font-medium leading-[0.95] tracking-[-0.055em]">
              {topClient.name}
            </h2>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-sm text-black/60">
                Sales
              </span>

              <span className="text-xl font-medium">
                {formatCurrency(topClient.sales)}
              </span>
            </div>
          </Link>

          <article className="col-span-12 min-h-[250px] rounded-[34px] bg-[#f3e5bd] p-8 sm:col-span-6 lg:col-span-3">
            <p className="text-sm">
              Sales
            </p>

            <p className="mt-14 text-[42px] font-medium tracking-[-0.06em]">
              {formatCurrency(totalSales)}
            </p>

            <p className="mt-8 text-sm text-black/60">
              Last 90 days
            </p>
          </article>

          <article className="col-span-12 min-h-[250px] rounded-[34px] bg-[#d8f2a6] p-8 sm:col-span-6 lg:col-span-4">
            <p className="text-sm">
              Average margin
            </p>

            <p className="mt-14 text-[42px] font-medium tracking-[-0.06em]">
              {averageMargin}%
            </p>

            <p className="mt-8 text-sm text-black/60">
              CRM portfolio
            </p>
          </article>
        </section>

        {/* CRM report */}
        <section className="mt-20 pb-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm text-[#777770]">
                CRM report
              </p>

              <h2 className="mt-2 text-[32px] font-medium tracking-[-0.055em] lg:text-[42px]">
                All clients
              </h2>

              <p className="mt-2 text-sm text-[#777770]">
                {filteredClients.length} results
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    setStatusFilter(filter)
                  }
                  className={[
                    "min-h-11 rounded-full px-4 py-2 text-sm transition lg:min-h-0",
                    statusFilter === filter
                      ? "bg-[#171717] text-white"
                      : "border border-[#deded7] text-[#777770] hover:bg-white",
                  ].join(" ")}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 overflow-hidden rounded-[30px] border border-[#deded7] bg-white">
            <div className="hidden grid-cols-[1.7fr_.6fr_.9fr_.9fr_.7fr_1fr_.8fr_40px] gap-4 border-b border-[#e8e8e2] px-7 py-4 text-xs text-[#888882] lg:grid">
              <span>Client</span>
              <span>Orders</span>
              <span>Sales</span>
              <span>Cost</span>
              <span>Margin</span>
              <span>Last purchase</span>
              <span>Status</span>
              <span />
            </div>

            {filteredClients.length > 0 ? (
              filteredClients.map((client, index) => (
                <Link
                  key={client.id}
                  href={`/clients/${client.id}`}
                  className={[
                    "group grid w-full grid-cols-2 items-center gap-4 px-5 py-5 transition hover:bg-[#fafaf7] sm:grid-cols-3 lg:grid-cols-[1.7fr_.6fr_.9fr_.9fr_.7fr_1fr_.8fr_40px] lg:px-7",
                    index !==
                    filteredClients.length - 1
                      ? "border-b border-[#e8e8e2]"
                      : "",
                  ].join(" ")}
                >
                  <div className="col-span-2 flex min-w-0 items-center gap-3 sm:col-span-3 lg:col-span-1">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium"
                      style={{
                        backgroundColor:
                          client.color,
                      }}
                    >
                      {client.initials}
                    </span>

                    <div>
                      <p className="text-sm font-medium">
                        {client.name}
                      </p>

                      <p className="mt-0.5 text-xs text-[#999992]">
                        {client.crmId}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm">
                    <span className="block text-xs text-[#999992] lg:hidden">Orders</span>{client.orders}
                  </span>

                  <span className="text-sm font-medium">
                    <span className="block text-xs font-normal text-[#999992] lg:hidden">Sales</span>
                    {formatCurrency(
                      client.sales
                    )}
                  </span>

                  <span className="text-sm text-[#777770]">
                    <span className="block text-xs text-[#999992] lg:hidden">Cost</span>
                    {formatCurrency(
                      client.cost
                    )}
                  </span>

                  <span className="text-sm">
                    <span className="block text-xs text-[#999992] lg:hidden">Margin</span>{client.margin}%
                  </span>

                  <span className="text-sm text-[#777770]">
                    <span className="block text-xs text-[#999992] lg:hidden">Last purchase</span>{client.lastPurchase}
                  </span>

                  <span>
                    <span
                      className={[
                        "rounded-full px-3 py-1.5 text-xs",
                        client.status ===
                        "Pending"
                          ? "bg-[#f3e5bd]"
                          : client.status ===
                              "Shipped"
                            ? "bg-[#dcd5f7]"
                            : "bg-[#d8f2a6]",
                      ].join(" ")}
                    >
                      {client.status}
                    </span>
                  </span>

                  <span className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#deded7] transition group-hover:bg-[#171717] group-hover:text-white lg:flex">
                    <ArrowUpRight size={15} />
                  </span>
                </Link>
              ))
            ) : (
              <div className="px-7 py-16 text-center">
                <p className="text-lg font-medium">
                  No clients found
                </p>

                <p className="mt-2 text-sm text-[#777770]">
                  Try another search or filter.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
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
