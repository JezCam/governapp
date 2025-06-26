import type { ReactNode } from 'react';
import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full flex-col">
        <AppHeader />
        <div className="h-full w-full border-y">{children}</div>
        <AppFooter />
      </main>
    </SidebarProvider>
  );
}
