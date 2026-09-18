"use client";

import { useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { clients } from "@/data/clients";
import { emails } from "@/data/emails";
import { orders } from "@/data/orders";

type Period = "30 days" | "90 days" | "Year";

const periods: Period[] = ["30 days", "90 days", "Year"];
const monthlySales = [
  { month: "Apr", sales: 42500 },
  { month: "May", sales: 48200 },
  { month: "Jun", sales: 51900 },
  { month: "Jul", sales: 59400 },
  { month: "Aug", sales: 68100 },
  { month: "Sep", sales: 80310 },
];

const currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const percent = new Intl.NumberFormat("en", {
  maximumFractionDigits: 1,
});

const totalSales = clients.reduce((sum, client) => sum + client.sales, 0);
const totalCost = clients.reduce((sum, client) => sum + client.cost, 0);
const grossProfit = totalSales - totalCost;
const averageMargin = clients.length
  ? clients.reduce((sum, client) => sum + client.margin, 0) / clients.length
  : 0;
const rankedClients = [...clients].sort((a, b) => b.sales - a.sales);
const largestClientSales = rankedClients[0]?.sales ?? 1;
const delayedOrders = orders.filter((order) => order.status === "Delayed").length;
const pendingOrders = orders.filter((order) => order.status === "Pending").length;
const unansweredEmails = emails.filter((email) => email.status === "Unanswered").length;
const emailOrders = orders.filter((order) => order.channel === "Email").length;
const appOrders = orders.filter((order) => order.channel === "App").length;
const channelTotal = emailOrders + appOrders;

const chartPoints = monthlySales.map(({ sales }, index) => ({
  x: 30 + index * 132,
  y: 190 - ((sales - 40000) / 45000) * 150,
}));
const linePath = chartPoints.map(({ x, y }, index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
const areaPath = `${linePath} L ${chartPoints.at(-1)?.x ?? 690} 190 L 30 190 Z`;

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("Year");

  return (
    <AppShell>
      <div className="px-5 py-6 sm:px-8 lg:px-14 lg:py-8">
        <header className="text-sm text-[#777770]">CRM / Analytics</header>

        <section className="mt-12 flex flex-wrap items-end justify-between gap-8 lg:mt-20">
          <div>
            <h1 className="text-[52px] font-medium leading-[0.88] tracking-[-0.075em] sm:text-[68px] lg:text-[76px] xl:text-[96px]">
              Business
              <br />
              insights.
            </h1>
            <p className="mt-6 text-sm text-[#777770]">
              Performance across clients, orders and communication.
            </p>
          </div>

          <div className="pb-1">
            <p className="mb-3 text-xs text-[#777770] lg:text-right">Viewing: {period}</p>
            <div className="flex flex-wrap gap-2" aria-label="Analytics period">
              {periods.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={period === item}
                  onClick={() => setPeriod(item)}
                  className={[
                    "min-h-11 rounded-full px-4 py-2 text-sm transition lg:min-h-0",
                    period === item
                      ? "bg-[#171717] text-white"
                      : "border border-[#deded7] text-[#777770] hover:bg-white",
                  ].join(" ")}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-12 gap-5" aria-label="CRM summary">
          {[
            { label: "Total sales", value: currency.format(totalSales), color: "bg-[#f3e5bd]" },
            { label: "Total cost", value: currency.format(totalCost), color: "bg-[#dcd5f7]" },
            { label: "Gross profit", value: currency.format(grossProfit), color: "bg-[#d8f2a6]" },
            { label: "Average margin", value: `${percent.format(averageMargin)}%`, color: "bg-[#f3cfe0]" },
          ].map((metric) => (
            <article key={metric.label} className={`col-span-12 min-h-[220px] rounded-[34px] p-8 sm:col-span-6 lg:col-span-3 ${metric.color}`}>
              <p className="text-sm">{metric.label}</p>
              <p className="mt-16 text-[38px] font-medium tracking-[-0.06em] xl:text-[42px]">
                {metric.value}
              </p>
              <p className="mt-4 text-xs text-black/60">Across demo CRM clients</p>
            </article>
          ))}
        </section>

        <section className="mt-5 grid grid-cols-12 gap-5">
          <article className="col-span-12 min-w-0 rounded-[34px] bg-white p-8 lg:col-span-8">
            <p className="text-sm text-[#777770]">Revenue trend</p>
            <h2 className="mt-2 text-[32px] font-medium tracking-[-0.055em] lg:text-[42px]">Sales over time</h2>
            <p className="mt-2 text-sm text-[#777770]">Illustrative monthly sales · Apr–Sep</p>

            <div className="mt-10 w-full overflow-x-auto" role="img" aria-label="Illustrative sales rise from 42,500 euros in April to 80,310 euros in September">
              <svg viewBox="0 0 720 235" className="h-auto w-full min-w-[600px] lg:min-w-0" aria-hidden="true">
                {[40, 115, 190].map((y) => (
                  <line key={y} x1="30" x2="690" y1={y} y2={y} stroke="#e8e8e2" strokeWidth="1" />
                ))}
                <path d={areaPath} fill="#d8f2a6" fillOpacity="0.55" />
                <path d={linePath} fill="none" stroke="#171717" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {chartPoints.map(({ x, y }, index) => (
                  <g key={monthlySales[index].month}>
                    <circle cx={x} cy={y} r="5" fill="#171717" />
                    <text x={x} y="222" textAnchor="middle" fontSize="13" fill="#777770">
                      {monthlySales[index].month}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </article>

          <article className="col-span-12 rounded-[34px] bg-[#171717] p-8 text-white lg:col-span-4">
            <p className="text-sm text-white/50">Order origin</p>
            <h2 className="mt-2 text-[38px] font-medium leading-[0.95] tracking-[-0.055em]">
              Channel
              <br />
              split.
            </h2>
            <p className="mt-3 text-sm text-white/50">Across {channelTotal} demo orders</p>
            <div className="mt-16 flex h-5 overflow-hidden rounded-full bg-white/15" aria-label={`${emailOrders} Email orders and ${appOrders} App orders`}>
              {channelTotal > 0 && (
                <>
                  <div className="bg-[#dcd5f7]" style={{ width: `${(emailOrders / channelTotal) * 100}%` }} />
                  <div className="bg-[#d8f2a6]" style={{ width: `${(appOrders / channelTotal) * 100}%` }} />
                </>
              )}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <span className="inline-block h-3 w-3 rounded-full bg-[#dcd5f7]" />
                <p className="mt-3 text-sm text-white/50">Email</p>
                <p className="mt-1 text-[30px] font-medium tracking-[-0.05em]">{emailOrders}</p>
              </div>
              <div>
                <span className="inline-block h-3 w-3 rounded-full bg-[#d8f2a6]" />
                <p className="mt-3 text-sm text-white/50">App</p>
                <p className="mt-1 text-[30px] font-medium tracking-[-0.05em]">{appOrders}</p>
              </div>
            </div>
          </article>
        </section>

        <section className="mt-5 grid grid-cols-12 gap-5">
          <article className="col-span-12 rounded-[34px] bg-[#dcd5f7] p-8 lg:col-span-6">
            <p className="text-sm text-black/50">CRM ranking</p>
            <h2 className="mt-2 text-[32px] font-medium tracking-[-0.055em] lg:text-[42px]">Top clients</h2>
            <div className="mt-10 space-y-7">
              {rankedClients.map((client, index) => (
                <div key={client.id}>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="font-medium">{String(index + 1).padStart(2, "0")} · {client.name}</span>
                    <span className="shrink-0 font-medium">{currency.format(client.sales)}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/60">
                    <div className="h-full rounded-full bg-[#171717]" style={{ width: `${(client.sales / largestClientSales) * 100}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-black/50">{client.margin}% margin</p>
                </div>
              ))}
            </div>
          </article>

          <article className="col-span-12 rounded-[34px] bg-white p-8 lg:col-span-6">
            <p className="text-sm text-[#777770]">Client economics</p>
            <h2 className="mt-2 text-[32px] font-medium tracking-[-0.055em] lg:text-[42px]">Sales vs cost</h2>
            <div className="mt-4 flex gap-5 text-xs text-[#777770]">
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#d8f2a6]" />Sales</span>
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#dcd5f7]" />Cost</span>
            </div>
            <div className="mt-10 space-y-7">
              {rankedClients.map((client) => (
                <div key={client.id}>
                  <div className="mb-3 flex flex-wrap justify-between gap-2 text-sm">
                    <span className="font-medium">{client.name}</span>
                    <span className="shrink-0 text-[#777770]">{currency.format(client.sales)} / {currency.format(client.cost)}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 rounded-full bg-[#d8f2a6]" style={{ width: `${(client.sales / largestClientSales) * 100}%` }} />
                    <div className="h-2 rounded-full bg-[#dcd5f7]" style={{ width: `${(client.cost / largestClientSales) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-5 pb-20">
          <article className="rounded-[34px] bg-[#f3e5bd] p-8">
            <p className="text-sm text-black/50">Operations snapshot</p>
            <h2 className="mt-2 text-[32px] font-medium tracking-[-0.055em] lg:text-[42px]">Operational health</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Delayed orders", value: delayedOrders },
                { label: "Pending orders", value: pendingOrders },
                { label: "Unanswered emails", value: unansweredEmails },
                { label: "Active clients", value: clients.length },
              ].map((item) => (
                <div key={item.label} className="rounded-[22px] bg-white/55 p-5">
                  <p className="text-xs text-black/50">{item.label}</p>
                  <p className="mt-5 text-[38px] font-medium tracking-[-0.055em]">{item.value}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </AppShell>
  );
}
