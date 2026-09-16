import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Mail,
  Package,
  Truck,
  UserRound,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { clients } from "@/data/clients";
import { orders } from "@/data/orders";
import { emails } from "@/data/emails";

type OrderPageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function OrderPage({
  params,
}: OrderPageProps) {
  const { orderId } = await params;

  const order = orders.find(
    (item) => item.id.toLowerCase() === orderId.toLowerCase()
  );

  if (!order) {
    notFound();
  }

  const client = clients.find(
    (item) => item.id === order.clientId
  );

  const margin = order.amount - order.cost;
  const linkedEmails = emails.filter((email) => email.orderId === order.id);

  return (
    <AppShell>
      <div className="px-10 py-8 lg:px-14">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            href="/orders"
            className="flex items-center gap-2 text-sm text-[#777770] transition hover:text-black"
          >
            <ArrowLeft size={16} />
            Orders
          </Link>

          <span className="rounded-full border border-[#deded7] bg-white px-4 py-2 text-sm">
            {order.id}
          </span>
        </header>

        {/* Hero */}
        <section className="mt-16">
          <p className="text-sm text-[#777770]">
            Order details
          </p>

          <div className="mt-3 flex items-end justify-between gap-8">
            <div>
              <h1 className="text-[70px] font-medium leading-[0.9] tracking-[-0.07em] xl:text-[90px]">
                {order.id}
              </h1>

              <Link
                href={`/clients/${order.clientId}`}
                className="mt-5 inline-flex items-center gap-2 text-lg transition hover:opacity-60"
              >
                {order.client}
                <span>↗</span>
              </Link>
            </div>

            <div className="text-right">
              <p className="text-sm text-[#777770]">
                Current status
              </p>

              <span
                className={[
                  "mt-2 inline-flex rounded-full px-4 py-2 text-sm font-medium",
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
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="mt-14 grid grid-cols-12 gap-5">
          <article className="col-span-6 rounded-[30px] bg-[#f3e5bd] p-7 md:col-span-3">
            <p className="text-sm">Sales</p>

            <p className="mt-10 text-[38px] font-medium tracking-[-0.055em]">
              {formatCurrency(order.amount)}
            </p>
          </article>

          <article className="col-span-6 rounded-[30px] bg-[#dcd5f7] p-7 md:col-span-3">
            <p className="text-sm">Cost</p>

            <p className="mt-10 text-[38px] font-medium tracking-[-0.055em]">
              {formatCurrency(order.cost)}
            </p>
          </article>

          <article className="col-span-6 rounded-[30px] bg-[#d8f2a6] p-7 md:col-span-3">
            <p className="text-sm">Gross profit</p>

            <p className="mt-10 text-[38px] font-medium tracking-[-0.055em]">
              {formatCurrency(margin)}
            </p>
          </article>

          <article className="col-span-6 rounded-[30px] bg-[#d7e9ea] p-7 md:col-span-3">
            <p className="text-sm">Channel</p>

            <p className="mt-10 text-[38px] font-medium tracking-[-0.055em]">
              {order.channel}
            </p>
          </article>
        </section>

        {/* Main info */}
        <section className="mt-20 grid grid-cols-12 gap-5">
          <article className="col-span-12 rounded-[34px] bg-[#171717] p-8 text-white lg:col-span-5">
            <p className="text-sm text-white/50">
              Order
            </p>

            <h2 className="mt-2 text-[38px] font-medium tracking-[-0.055em]">
              Operational
              <br />
              details.
            </h2>

            <div className="mt-10 space-y-7">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Package size={17} />
                </div>

                <div>
                  <p className="text-xs text-white/45">
                    Order date
                  </p>

                  <p className="mt-1 text-sm">
                    {order.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Truck size={17} />
                </div>

                <div>
                  <p className="text-xs text-white/45">
                    Delivery
                  </p>

                  <p className="mt-1 text-sm">
                    {order.delivery}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <UserRound size={17} />
                </div>

                <div>
                  <p className="text-xs text-white/45">
                    Client
                  </p>

                  <p className="mt-1 text-sm">
                    {order.client}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Connected client */}
          <article className="col-span-12 rounded-[34px] bg-white p-8 lg:col-span-7">
            <p className="text-sm text-[#777770]">
              Connected CRM record
            </p>

            <h2 className="mt-2 text-[38px] font-medium tracking-[-0.055em]">
              Client context
            </h2>

            {client && (
              <div className="mt-10">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full font-medium"
                    style={{
                      backgroundColor: client.color,
                    }}
                  >
                    {client.initials}
                  </div>

                  <div>
                    <p className="text-lg font-medium">
                      {client.name}
                    </p>

                    <p className="mt-1 text-sm text-[#777770]">
                      {client.crmId}
                    </p>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4">
                  <div className="rounded-[22px] bg-[#f5f5f0] p-5">
                    <p className="text-xs text-[#777770]">
                      Total sales
                    </p>

                    <p className="mt-3 text-xl font-medium">
                      {formatCurrency(client.sales)}
                    </p>
                  </div>

                  <div className="rounded-[22px] bg-[#f5f5f0] p-5">
                    <p className="text-xs text-[#777770]">
                      Margin
                    </p>

                    <p className="mt-3 text-xl font-medium">
                      {client.margin}%
                    </p>
                  </div>
                </div>

                <Link
                  href={`/clients/${client.id}`}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm text-white"
                >
                  View client
                  <span>↗</span>
                </Link>
              </div>
            )}
          </article>
        </section>

        {/* Activity */}
        <section className="mt-5 grid grid-cols-12 gap-5 pb-20">
          <article className="col-span-12 rounded-[34px] bg-[#dcd5f7] p-8 lg:col-span-7">
            <p className="text-sm text-black/50">
              Communication
            </p>

            <h2 className="mt-2 text-[38px] font-medium tracking-[-0.055em]">
              Linked emails
            </h2>

            <div className="mt-8 space-y-3">
              {linkedEmails.length > 0 ? linkedEmails.map((email) => (
                <Link key={email.id} href={`/inbox/${email.id}`} className="block rounded-[22px] bg-white/55 p-5 transition hover:bg-white/75">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex gap-3">
                      <Mail size={17} />
                      <div>
                        <p className="text-sm font-medium">{email.subject}</p>
                        <p className="mt-1 text-sm text-black/50">{email.preview}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-black/45">{email.time}</span>
                  </div>
                </Link>
              )) : (
                <p className="text-sm text-black/50">No linked emails.</p>
              )}
            </div>
          </article>

          <article className="col-span-12 rounded-[34px] bg-[#f3e5bd] p-8 lg:col-span-5">
            <p className="text-sm text-black/50">
              Timeline
            </p>

            <h2 className="mt-2 text-[38px] font-medium tracking-[-0.055em]">
              Order
              <br />
              activity.
            </h2>

            <div className="mt-10 space-y-7">
              <div>
                <p className="text-sm font-medium">
                  Order created
                </p>

                <p className="mt-1 text-sm text-black/50">
                  {order.date}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">
                  CRM linked
                </p>

                <p className="mt-1 text-sm text-black/50">
                  {order.client}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">
                  Current status
                </p>

                <p className="mt-1 text-sm text-black/50">
                  {order.status}
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </AppShell>
  );
}
