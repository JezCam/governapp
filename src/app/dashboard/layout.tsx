'use client';

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';
import AppSidebar from '@/app/dashboard/(sidebar)/app-sidebar';
import AppFooter from '@/app/dashboard/app-footer';
import AppHeader from '@/app/dashboard/app-header';
import { SidebarProvider } from '@/components/ui/sidebar';

export const SearchMenuContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {
    throw new Error('SearchMenuContext not initialized');
  },
});

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
  );
}
