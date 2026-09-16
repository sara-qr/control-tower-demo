"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  PackageCheck,
  Search,
  Truck,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { orders } from "@/data/orders";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

type OrderFilter =
  | "All"
  | "Pending"
  | "Shipped"
  | "Delivered"
  | "Delayed";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<OrderFilter>("All");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.client
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        order.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const totalSales = orders.reduce(
    (total, order) => total + order.amount,
    0
  );

  const delayed = orders.filter(
    (order) => order.status === "Delayed"
  ).length;

  const pending = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const filters: OrderFilter[] = [
    "All",
    "Pending",
    "Shipped",
    "Delivered",
    "Delayed",
  ];

  return (
    <AppShell>
      <div className="px-10 py-8 lg:px-14">
        {/* Header */}
        <header className="flex items-center justify-between gap-6">
          <p className="text-sm text-[#777770]">
            Operations / Orders
          </p>

          <div className="relative w-full max-w-[320px]">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777770]"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search order or client..."
              className="h-11 w-full rounded-full border border-[#deded7] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#171717]"
            />
          </div>
        </header>

        {/* Hero */}
        <section className="mt-20">
          <p className="text-sm text-[#777770]">
            Order operations
          </p>

          <div className="mt-3 flex items-end justify-between">
            <h1 className="text-[76px] font-medium leading-[0.88] tracking-[-0.075em] xl:text-[96px]">
              Your
              <br />
              orders.
            </h1>

            <div className="pb-2 text-right">
              <p className="text-[42px] font-medium tracking-[-0.055em]">
                {orders.length}
              </p>

              <p className="text-sm text-[#777770]">
                demo orders
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mt-16 grid grid-cols-12 gap-5">
          <article className="col-span-12 min-h-[250px] rounded-[34px] bg-[#f3e5bd] p-8 md:col-span-5">
            <p className="text-sm">
              Sales
            </p>

            <p className="mt-14 text-[46px] font-medium tracking-[-0.06em]">
              {formatCurrency(totalSales)}
            </p>

            <p className="mt-8 text-sm text-black/60">
              Across demo orders
            </p>
          </article>

          <article className="col-span-6 min-h-[250px] rounded-[34px] bg-[#f3cfe0] p-8 md:col-span-3">
            <AlertTriangle size={20} />

            <p className="mt-10 text-[46px] font-medium tracking-[-0.06em]">
              {delayed}
            </p>

            <p className="mt-8 text-sm text-black/60">
              Delayed
            </p>
          </article>

          <article className="col-span-6 min-h-[250px] rounded-[34px] bg-[#dcd5f7] p-8 md:col-span-4">
            <Clock3 size={20} />

            <p className="mt-10 text-[46px] font-medium tracking-[-0.06em]">
              {pending}
            </p>

            <p className="mt-8 text-sm text-black/60">
              Pending confirmation
            </p>
          </article>
        </section>

        {/* Orders table */}
        <section className="mt-20 pb-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm text-[#777770]">
                Order report
              </p>

              <h2 className="mt-2 text-[42px] font-medium tracking-[-0.055em]">
                All orders
              </h2>

              <p className="mt-2 text-sm text-[#777770]">
                {filteredOrders.length} results
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
            <div className="grid grid-cols-[1fr_1.5fr_.9fr_.9fr_1fr_.8fr_40px] gap-4 border-b border-[#e8e8e2] px-7 py-4 text-xs text-[#888882]">
              <span>Order</span>
              <span>Client</span>
              <span>Sales</span>
              <span>Cost</span>
              <span>Status</span>
              <span>Channel</span>
              <span />
            </div>

            {filteredOrders.map((order, index) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className={[
                  "group grid grid-cols-[1fr_1.5fr_.9fr_.9fr_1fr_.8fr_40px] items-center gap-4 px-7 py-5 transition hover:bg-[#fafaf7]",
                  index !== filteredOrders.length - 1
                    ? "border-b border-[#e8e8e2]"
                    : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e5bd]">
                    <PackageCheck size={16} />
                  </div>

                  <span className="text-sm font-medium">
                    {order.id}
                  </span>
                </div>

                <span className="text-sm font-medium">
                  {order.client}
                </span>

                <span className="text-sm font-medium">
                  {formatCurrency(order.amount)}
                </span>

                <span className="text-sm text-[#777770]">
                  {formatCurrency(order.cost)}
                </span>

                <span>
                  <span
                    className={[
                      "rounded-full px-3 py-1.5 text-xs",
                      order.status === "Delayed"
                        ? "bg-[#f3cfe0]"
                        : order.status === "Pending"
                          ? "bg-[#f3e5bd]"
                          : order.status === "Shipped"
                            ? "bg-[#dcd5f7]"
                            : "bg-[#d8f2a6]",
                    ].join(" ")}
                  >
                    {order.status}
                  </span>
                </span>

                <span className="text-sm text-[#777770]">
                  {order.channel}
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#deded7] transition group-hover:bg-[#171717] group-hover:text-white">
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}