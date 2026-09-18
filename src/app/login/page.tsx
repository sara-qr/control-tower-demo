"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

import { Brand } from "@/components/brand";
import { demoSessionCookie, demoSessionValue } from "@/lib/demo-session";

const demoEmail = "demo@controltower.app";
const demoPassword = "demo123";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    window.setTimeout(() => {
      if (email.trim().toLowerCase() !== demoEmail || password !== demoPassword) {
        setError("Those demo credentials don't match. Try the demo account below.");
        setSubmitting(false);
        return;
      }

      const secure = window.location.protocol === "https:" ? "; secure" : "";
      document.cookie = `${demoSessionCookie}=${demoSessionValue}; path=/; max-age=604800; samesite=lax${secure}`;
      window.location.replace("/");
    }, 500);
  }

  function useDemoAccount() {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
  }

  return (
    <main className="min-h-screen bg-[#f5f5f0] p-5 text-[#171717] sm:p-8 lg:p-10">
      <div className="mx-auto grid min-h-[calc(100vh-40px)] max-w-[1400px] items-center gap-12 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,.9fr)] lg:gap-20">
        <section className="flex min-w-0 flex-col px-1 pt-5 sm:px-4 lg:min-h-[600px] lg:justify-between lg:px-8 lg:py-8">
          <Brand descriptor />

          <div className="mt-16 lg:mt-0 lg:pb-12">
            <h1 className="max-w-[720px] text-[46px] font-medium leading-[0.94] tracking-[-0.07em] sm:text-[64px] lg:text-[68px] xl:text-[84px]">
              Customer relationships,
              <br />
              in one place.
            </h1>
            <p className="mt-8 max-w-[500px] text-sm leading-6 text-[#777770] sm:text-base">
              Manage clients, orders, conversations and commercial activity from one connected workspace.
            </p>
          </div>
        </section>

        <section className="flex min-w-0 items-center justify-center pb-5 lg:py-0">
          <div className="w-full max-w-[480px] rounded-[34px] bg-white p-7 sm:p-10 lg:p-12">
            <span className="inline-flex rounded-full bg-[#d8f2a6] px-4 py-2 text-xs font-medium">Demo access</span>
            <h2 className="mt-8 text-[42px] font-medium leading-none tracking-[-0.06em] sm:text-[50px]">Welcome in.</h2>
            <p className="mt-4 text-sm leading-6 text-[#777770]">Sign in to explore CRM.</p>

            <form onSubmit={signIn} className="mt-10 space-y-6">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                <input id="email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-12 w-full rounded-[16px] border border-[#deded7] bg-[#f5f5f0] px-4 text-sm outline-none transition focus:border-[#171717]" />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
                <div className="relative">
                  <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 w-full rounded-[16px] border border-[#deded7] bg-[#f5f5f0] pl-4 pr-14 text-sm outline-none transition focus:border-[#171717]" />
                  <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)} className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full text-[#777770] hover:text-[#171717]">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && <p role="alert" className="rounded-[16px] bg-[#f3cfe0] px-4 py-3 text-sm">{error}</p>}

              <button type="submit" disabled={submitting} className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 text-sm font-medium text-white transition hover:opacity-85 disabled:cursor-wait disabled:opacity-65">
                {submitting ? "Signing in..." : "Sign in"}
                {!submitting && <ArrowRight size={16} />}
              </button>
            </form>

            <div className="mt-8 border-t border-[#e8e8e2] pt-6">
              <button type="button" onClick={useDemoAccount} className="text-sm font-medium underline underline-offset-4 transition hover:opacity-60">Use demo account</button>
              <p className="mt-3 break-all text-xs leading-5 text-[#777770]">{demoEmail} · {demoPassword}</p>
              <p className="mt-3 text-xs leading-5 text-[#999992]">Fictional demo access. No real account is required.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
