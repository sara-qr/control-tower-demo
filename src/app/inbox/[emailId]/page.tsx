import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Package,
  UserRound,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { clients } from "@/data/clients";
import { emails } from "@/data/emails";
import { orders } from "@/data/orders";
import {
  EmailActions,
  EmailInteractionProvider,
  EmailStatusBadge,
} from "./email-interactions";

type EmailPageProps = {
  params: Promise<{
    emailId: string;
  }>;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function EmailPage({
  params,
}: EmailPageProps) {
  const { emailId } = await params;

  const email = emails.find(
    (item) =>
      item.id.toLowerCase() === emailId.toLowerCase()
  );

  if (!email) {
    notFound();
  }

  const client = clients.find(
    (item) => item.id === email.clientId
  );

  const order = orders.find(
    (item) => item.id === email.orderId
  );

  return (
    <AppShell>
      <EmailInteractionProvider initialStatus={email.status}>
      <div className="px-5 py-6 sm:px-8 lg:px-14 lg:py-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            href="/inbox"
            className="flex items-center gap-2 text-sm text-[#777770] transition hover:text-black"
          >
            <ArrowLeft size={16} />
            Inbox
          </Link>

          <EmailStatusBadge />
        </header>

        {/* Hero */}
        <section className="mt-16">
          <p className="text-sm text-[#777770]">
            Email / {email.id}
          </p>

          <div className="mt-3 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-9">
              <h1 className="max-w-[950px] break-words text-[40px] font-medium leading-[0.94] tracking-[-0.065em] sm:text-[50px] lg:text-[56px] xl:text-[72px]">
                {email.subject}
              </h1>
            </div>

            <div className="col-span-12 flex items-end lg:col-span-3 lg:justify-end">
              <div className="text-left lg:text-right">
                <p className="text-sm text-[#777770]">
                  Received
                </p>

                <p className="mt-2 text-lg font-medium">
                  {email.time}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main email */}
        <section className="mt-14 grid grid-cols-12 gap-5">
          <article className="col-span-12 rounded-[34px] bg-white p-8 lg:col-span-8">
            <div className="flex items-center gap-4 border-b border-[#e8e8e2] pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dcd5f7]">
                <Mail size={18} />
              </div>

              <div>
                <p className="font-medium">
                  {email.client}
                </p>

                <p className="mt-1 text-sm text-[#777770]">
                  Connected customer email
                </p>
              </div>
            </div>

            <div className="py-10">
              <p className="max-w-[720px] text-[20px] leading-8 tracking-[-0.02em] text-[#33332f]">
                {email.preview}
              </p>

              <p className="mt-8 text-sm leading-6 text-[#777770]">
                Este mensaje está vinculado automáticamente
                al cliente y al pedido correspondiente dentro
                de CRM.
              </p>
            </div>

            <EmailActions />
          </article>

          {/* Context */}
          <article className="col-span-12 rounded-[34px] bg-[#171717] p-8 text-white lg:col-span-4">
            <p className="text-sm text-white/50">
              Context
            </p>

            <h2 className="mt-2 text-[38px] font-medium leading-[0.95] tracking-[-0.055em]">
              Everything
              <br />
              connected.
            </h2>

            <div className="mt-10 space-y-5">
              {client && (
                <Link
                  href={`/clients/${client.id}`}
                  className="group block rounded-[24px] bg-white/10 p-5 transition hover:bg-white/15"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-black"
                        style={{
                          backgroundColor: client.color,
                        }}
                      >
                        <UserRound size={16} />
                      </div>

                      <div>
                        <p className="text-xs text-white/45">
                          Client
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {client.name}
                        </p>

                        <p className="mt-1 text-xs text-white/45">
                          {client.crmId}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="text-white/50"
                    />
                  </div>
                </Link>
              )}

              {order && (
                <Link
                  href={`/orders/${order.id}`}
                  className="group block rounded-[24px] bg-white/10 p-5 transition hover:bg-white/15"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e5bd] text-black">
                        <Package size={16} />
                      </div>

                      <div>
                        <p className="text-xs text-white/45">
                          Order
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {order.id}
                        </p>

                        <p className="mt-1 text-xs text-white/45">
                          {formatCurrency(order.amount)} ·{" "}
                          {order.status}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="text-white/50"
                    />
                  </div>
                </Link>
              )}
            </div>
          </article>
        </section>

        {/* Relationship */}
        <section className="mt-5 grid grid-cols-12 gap-5 pb-20">
          <article className="col-span-12 rounded-[34px] bg-[#dcd5f7] p-8 lg:col-span-7">
            <p className="text-sm text-black/50">
              Relationship
            </p>

            <h2 className="mt-2 text-[38px] font-medium tracking-[-0.055em]">
              CRM context
            </h2>

            {client && (
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] bg-white/55 p-5">
                  <p className="text-xs text-black/50">
                    Client sales
                  </p>

                  <p className="mt-3 text-2xl font-medium">
                    {formatCurrency(client.sales)}
                  </p>
                </div>

                <div className="rounded-[22px] bg-white/55 p-5">
                  <p className="text-xs text-black/50">
                    Margin
                  </p>

                  <p className="mt-3 text-2xl font-medium">
                    {client.margin}%
                  </p>
                </div>

                <div className="rounded-[22px] bg-white/55 p-5">
                  <p className="text-xs text-black/50">
                    Orders
                  </p>

                  <p className="mt-3 text-2xl font-medium">
                    {client.orders}
                  </p>
                </div>

                <div className="rounded-[22px] bg-white/55 p-5">
                  <p className="text-xs text-black/50">
                    Responsible
                  </p>

                  <p className="mt-3 text-lg font-medium">
                    {client.responsible}
                  </p>
                </div>
              </div>
            )}
          </article>

          <article className="col-span-12 rounded-[34px] bg-[#f3e5bd] p-8 lg:col-span-5">
            <p className="text-sm text-black/50">
              Origin
            </p>

            <h2 className="mt-2 text-[38px] font-medium leading-[0.95] tracking-[-0.055em]">
              Email
              <br />
              becomes data.
            </h2>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs text-black/45">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium">
                  {email.id}
                </p>
              </div>

              <div>
                <p className="text-xs text-black/45">
                  Linked client
                </p>

                <p className="mt-1 text-sm font-medium">
                  {email.client}
                </p>
              </div>

              <div>
                <p className="text-xs text-black/45">
                  Linked order
                </p>

                <p className="mt-1 text-sm font-medium">
                  {email.orderId}
                </p>
              </div>

              <div>
                <p className="text-xs text-black/45">
                  Priority
                </p>

                <p className="mt-1 text-sm font-medium">
                  {email.priority}
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
      </EmailInteractionProvider>
    </AppShell>
  );
}
