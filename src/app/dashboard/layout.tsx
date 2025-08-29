'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AppHeader from '@/app/dashboard/(header)/app-header';
import AppSidebar from '@/app/dashboard/(sidebar)/app-sidebar';
import ErrorPage from '@/components/error-page';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppFooter from './(footer)/app-footer';
import { SearchMenuContext } from './context';

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);

  // Handle cmd+k
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <SearchMenuContext value={{ open, setOpen }}>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex h-screen w-screen flex-1 flex-col overflow-hidden">
            <AppHeader />
            <div className="flex flex-1 justify-center overflow-auto border-t border-b">
              {children}
            </div>
            <AppFooter />
          </main>
        </SidebarProvider>
      </SearchMenuContext>
    </ErrorBoundary>
  );
}
