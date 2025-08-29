'use client';

import { createContext, type Dispatch, type SetStateAction } from 'react';

export const SearchMenuContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {
    throw new Error('SearchMenuContext not initialized');
  },
});
