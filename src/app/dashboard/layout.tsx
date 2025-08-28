'use client';

import { useQuery } from 'convex/react';
import { type ReactNode, useEffect, useState } from 'react';
import AppHeader from '@/app/dashboard/(header)/app-header';
import AppSidebar from '@/app/dashboard/(sidebar)/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { api } from '../../../convex/_generated/api';
import AppFooter from './(footer)/app-footer';
import { SearchMenuContext, UserContext } from './context';

export default function Layout({ children }: { children: ReactNode }) {
  const currentUser = useQuery(api.services.users.getCurrent);
  const isAdminOfActiveOrganisation = useQuery(
    api.services.users.isAdminOfActiveOrganisation
  );
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

  if (currentUser === undefined || isAdminOfActiveOrganisation === undefined) {
    return null; //TODO: Add a loading state
  }

  return (
    <UserContext value={{ currentUser, isAdminOfActiveOrganisation }}>
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
    </UserContext>
  );
}
