'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        // Background gradient colors for checked and unchecked states
        'bg-gradient-to-b data-[state=checked]:from-ga-purple-500 data-[state=unchecked]:from-gray-300 data-[state=checked]:to-ga-purple-400 data-[state=unchecked]:to-gray-200 dark:data-[state=unchecked]:from-gray-700 dark:data-[state=unchecked]:to-gray-600',

        // Border styles for checked and unchecked states
        'border border-gray-400 data-[state=checked]:border-ga-purple-800 dark:border-black',

        // Shadow styles for checked and unchecked states
        'data-[state=checked]:shadow-[inset_0_0_0_1px_var(--color-ga-purple-400),_0_1px_0_var(--color-gray-900)] data-[state=unchecked]:shadow-[inset_0_0_0_1px_var(--color-gray-200),_0_1px_0_var(--color-gray-400)] dark:data-[state=checked]:shadow-[inset_0_0_0_1px_var(--color-ga-purple-400),_0_1px_0_var(--color-black)] dark:data-[state=unchecked]:shadow-[inset_0_0_0_1px_var(--color-gray-600),_0_1px_0_var(--color-black)]',

        // Focus states
        'focus-visible:ring-[3px] data-[state=checked]:focus-visible:border-ga-purple-200 data-[state=unchecked]:focus-visible:border-ga-purple-600 data-[state=checked]:focus-visible:ring-ga-purple-400 data-[state=unchecked]:focus-visible:ring-ga-purple-300 dark:data-[state=checked]:focus-visible:border-ga-purple-900 dark:data-[state=unchecked]:focus-visible:border-ga-purple-500 dark:data-[state=checked]:focus-visible:ring-ga-purple-700 dark:data-[state=unchecked]:focus-visible:ring-ga-purple-800',

        'peer inline-flex w-10 shrink-0 cursor-pointer items-center rounded-full outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50',
        'p-0.5',
        className
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block size-4 rounded-full bg-white shadow-sm ring-0 transition-all data-[state=checked]:translate-x-4.5 data-[state=unchecked]:translate-x-0'
        )}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
