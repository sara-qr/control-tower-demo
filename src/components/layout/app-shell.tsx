import { ReactNode } from "react";

import { Sidebar } from "./sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#f5f5f0] text-[#171717]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />

        <div className="min-w-0 flex-1">
          {children}
        </div>
      </div>
    </main>
  );
}
