import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Package,
  Phone,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { clients } from "@/data/clients";

type ClientPageProps = {
  params: Promise<{
    clientId: string;
  }>;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function ClientPage({
  params,
}: ClientPageProps) {
  const { clientId } = await params;

  const client = clients.find(
    (item) => item.id === clientId
  );

  if (!client) {
    notFound();
  }

  const profit = client.sales - client.cost;

  return (
    <AppShell>
      <div className="px-10 py-8 lg:px-14">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            href="/clients"
            className="flex items-center gap-2 text-sm text-[#777770] transition hover:text-black"
          >
            <ArrowLeft size={16} />
            Clients
          </Link>

          <span className="rounded-full border border-[#deded7] bg-white px-4 py-2 text-sm">
            {client.crmId}
          </span>
        </header>

        {/* Client hero */}
        <section className="mt-16">
          <div className="flex items-start justify-between gap-8">
            <div>
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-medium"
                style={{
                  backgroundColor: client.color,
                }}
              >
                {client.initials}
              </div>

              <p className="mt-8 text-sm text-[#777770]">
                Client profile
              </p>

              <h1 className="mt-3 max-w-[850px] text-[64px] font-medium leading-[0.9] tracking-[-0.07em] xl:text-[82px]">
                {client.name}
              </h1>
            </div>

            <div className="mt-auto pb-2 text-right">
              <p className="text-sm text-[#777770]">
                Current status
              </p>

              <div className="mt-2 flex items-center justify-end gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#b8e978]" />

                <span className="text-lg font-medium">
                  {client.status}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="mt-14 grid grid-cols-12 gap-5">
          <article className="col-span-6 rounded-[30px] bg-[#f3e5bd] p-7 md:col-span-3">
            <p className="text-sm">
              Sales
            </p>

            <p className="mt-10 text-[38px] font-medium tracking-[-0.055em]">
              {formatCurrency(client.sales)}
            </p>

            <p className="mt-5 text-sm text-black/55">
              Total revenue
            </p>
          </article>

          <article className="col-span-6 rounded-[30px] bg-[#dcd5f7] p-7 md:col-span-3">
            <p className="text-sm">
              Cost
            </p>

            <p className="mt-10 text-[38px] font-medium tracking-[-0.055em]">
              {formatCurrency(client.cost)}
            </p>

            <p className="mt-5 text-sm text-black/55">
              Associated cost
            </p>
          </article>

          <article className="col-span-6 rounded-[30px] bg-[#d8f2a6] p-7 md:col-span-3">
            <p className="text-sm">
              Margin
            </p>

            <p className="mt-10 text-[38px] font-medium tracking-[-0.055em]">
              {client.margin}%
            </p>

            <p className="mt-5 text-sm text-black/55">
              {formatCurrency(profit)} gross profit
            </p>
          </article>

          <article className="col-span-6 rounded-[30px] bg-[#d7e9ea] p-7 md:col-span-3">
            <p className="text-sm">
              Orders
            </p>

            <p className="mt-10 text-[38px] font-medium tracking-[-0.055em]">
              {client.orders}
            </p>

            <p className="mt-5 text-sm text-black/55">
              Last: {client.lastPurchase}
            </p>
          </article>
        </section>

        {/* Main detail */}
        <section className="mt-20 grid grid-cols-12 gap-5">
          {/* Contact */}
          <article className="col-span-12 rounded-[34px] bg-[#171717] p-8 text-white lg:col-span-4">
            <p className="text-sm text-white/50">
              Account
            </p>

            <h2 className="mt-2 text-[38px] font-medium tracking-[-0.055em]">
              Client details
            </h2>

            <div className="mt-10 space-y-7">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <UserRound size={17} />
                </div>

                <div>
                  <p className="text-xs text-white/45">
                    Responsible
                  </p>

                  <p className="mt-1 text-sm">
                    {client.responsible}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Mail size={17} />
                </div>

                <div>
                  <p className="text-xs text-white/45">
                    Email
                  </p>

                  <p className="mt-1 text-sm">
                    {client.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Phone size={17} />
                </div>

                <div>
                  <p className="text-xs text-white/45">
                    Phone
                  </p>

                  <p className="mt-1 text-sm">
                    {client.phone}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Orders */}
          <article className="col-span-12 rounded-[34px] bg-white p-8 lg:col-span-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-[#777770]">
                  Commerce
                </p>

                <h2 className="mt-2 text-[38px] font-medium tracking-[-0.055em]">
                  Recent orders
                </h2>
              </div>

              <Link
                href="/orders"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#deded7] transition hover:bg-[#171717] hover:text-white"
              >
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-8">
              {client.recentOrders.length > 0 ? (
                client.recentOrders.map(
                  (order, index) => (
                    <Link
                      key={order.id}
                      href={`/orders/${order.id}`}
                      className={[
                        "group grid grid-cols-[1.2fr_1fr_1fr_1fr_40px] items-center gap-5 py-5 transition hover:opacity-60",
                        index !==
                        client.recentOrders.length - 1
                          ? "border-b border-[#e8e8e2]"
                          : "",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e5bd]">
                          <Package size={16} />
                        </div>

                        <span className="text-sm font-medium">
                          {order.id}
                        </span>
                      </div>

                      <span className="text-sm font-medium">
                        {formatCurrency(order.amount)}
                      </span>

                      <span className="text-sm text-[#777770]">
                        {order.date}
                      </span>

                      <span className="justify-self-start rounded-full bg-[#f5f5f0] px-3 py-1.5 text-xs">
                        {order.status}
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#deded7] transition group-hover:bg-[#171717] group-hover:text-white">
                        <ArrowUpRight size={15} />
                      </span>
                    </Link>
                  )
                )
              ) : (
                <p className="py-10 text-sm text-[#777770]">
                  No recent orders.
                </p>
              )}
            </div>
          </article>
        </section>

        {/* Emails */}
        <section className="mt-5 grid grid-cols-12 gap-5 pb-20">
          <article className="col-span-12 rounded-[34px] bg-[#dcd5f7] p-8 lg:col-span-7">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-black/50">
                  Inbox
                </p>

                <h2 className="mt-2 text-[38px] font-medium tracking-[-0.055em]">
                  Recent emails
                </h2>
              </div>

              <Mail size={20} />
            </div>

            <div className="mt-8">
              {client.emails.length > 0 ? (
                client.emails.map(
                  (email, index) => (
                    <div
                      key={email.subject}
                      className={[
                        "flex items-center justify-between gap-8 py-5",
                        index !==
                        client.emails.length - 1
                          ? "border-b border-black/10"
                          : "",
                      ].join(" ")}
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {email.subject}
                        </p>

                        <p className="mt-1 text-sm text-black/50">
                          {email.date}
                        </p>
                      </div>

                      <span
                        className={[
                          "rounded-full px-3 py-1.5 text-xs",
                          email.status ===
                          "Unanswered"
                            ? "bg-[#f3cfe0]"
                            : "bg-white/60",
                        ].join(" ")}
                      >
                        {email.status}
                      </span>
                    </div>
                  )
                )
              ) : (
                <p className="py-10 text-sm text-black/50">
                  No recent emails.
                </p>
              )}
            </div>
          </article>

          {/* Timeline summary */}
          <article className="col-span-12 rounded-[34px] bg-[#f3e5bd] p-8 lg:col-span-5">
            <p className="text-sm text-black/50">
              Relationship
            </p>

            <h2 className="mt-2 text-[38px] font-medium tracking-[-0.055em]">
              Activity
              <br />
              overview.
            </h2>

            <div className="mt-12 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/55">
                  <Mail size={16} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Email received
                  </p>

                  <p className="mt-1 text-sm text-black/50">
                    Today · 09:14
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/55">
                  <ShoppingBag size={16} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Order status updated
                  </p>

                  <p className="mt-1 text-sm text-black/50">
                    Today · 09:16
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/55">
                  <UserRound size={16} />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    CRM record updated
                  </p>

                  <p className="mt-1 text-sm text-black/50">
                    Today · 09:23
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </AppShell>
  );
}