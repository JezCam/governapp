'use client';

import { type ReactNode, useState } from 'react';
import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import AppSidebar from '@/components/app-sidebar';
import OnboardingDialog from '@/components/dialogs/onboarding-dialog';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex max-h-screen flex-1 flex-col overflow-auto">
        <AppHeader />
        <div className="flex w-full flex-1 items-center justify-center overflow-auto border-t border-b">
          {children}
        </div>
        <AppFooter />
      </main>
      <OnboardingDialog onOpenChange={setOpen} open={open} />
    </SidebarProvider>
  );
}
