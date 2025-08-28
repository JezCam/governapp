'use client';

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from 'react';
import type { User } from '@/types/convex';

export const SearchMenuContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {
    throw new Error('SearchMenuContext not initialized');
  },
});

export const UserContext = createContext<
  | {
      currentUser: User;
      isAdminOfActiveOrganisation: boolean;
    }
  | undefined
>(undefined);

// Custom hook for type safety in consumers
export function useUserContext() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
}
