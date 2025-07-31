'use client';

import { type ReactNode, useState } from 'react';
import AppFooter from '@/app/dashboard/app-footer';
import AppHeader from '@/app/dashboard/app-header';
import AppSidebar from '@/app/dashboard/app-sidebar';
import OnboardingDialog from '@/components/dialogs/onboarding-dialog';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider>
      <AppSidebar />
      <Toaster position="top-center" richColors />
      <main className="flex h-screen w-screen flex-1 flex-col overflow-hidden">
        <AppHeader />
        <div className="flex flex-1 justify-center overflow-auto border-t border-b">
          {children}
        </div>
        <AppFooter />
      </main>
      <OnboardingDialog onOpenChange={setOpen} open={open} />
    </SidebarProvider>
  );
}
