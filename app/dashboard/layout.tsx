"use client";

import { type ReactNode, useState } from "react";
import AppFooter from "@/app/dashboard/app-footer";
import AppHeader from "@/app/dashboard/app-header";
import AppSidebar from "@/app/dashboard/app-sidebar";
import OnboardingDialog from "@/components/dialogs/onboarding-dialog";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex max-h-screen flex-1 flex-col overflow-auto">
        <AppHeader />
        <div className="flex w-full flex-1 justify-center overflow-auto border-t border-b">
          {children}
        </div>
        <AppFooter />
      </main>
      <OnboardingDialog onOpenChange={setOpen} open={open} />
    </SidebarProvider>
  );
}
