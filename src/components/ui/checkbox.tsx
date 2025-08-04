'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Tick01Icon } from '@hugeicons-pro/core-stroke-rounded';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type * as React from 'react';
import { cn } from '@/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'peer size-4.5 shrink-0 rounded-[4px] outline-none transition-shadow disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        // Background gradient colors for checked and unchecked states
        'bg-gradient-to-b data-[state=checked]:from-ga-purple-500 data-[state=unchecked]:from-gray-200 data-[state=checked]:to-ga-purple-400 data-[state=unchecked]:to-gray-100 dark:data-[state=unchecked]:from-gray-800 dark:data-[state=unchecked]:to-gray-700',

        // Border styles for checked and unchecked states
        'border border-gray-400 data-[state=checked]:border-ga-purple-800 dark:border-black',

        // Shadow styles for checked and unchecked states
        'data-[state=checked]:shadow-[inset_0_0_0_1px_var(--color-ga-purple-400),_0_1px_0_var(--color-gray-900)] data-[state=unchecked]:shadow-[inset_0_0_0_1px_var(--color-gray-100),_0_1px_0_var(--color-gray-400)] dark:data-[state=checked]:shadow-[inset_0_0_0_1px_var(--color-ga-purple-400),_0_1px_0_var(--color-black)] dark:data-[state=unchecked]:shadow-[inset_0_0_0_1px_var(--color-gray-700),_0_1px_0_var(--color-black)]',

        // Focus states
        'focus-visible:ring-[3px] data-[state=checked]:focus-visible:border-ga-purple-200 data-[state=unchecked]:focus-visible:border-ga-purple-600 data-[state=checked]:focus-visible:ring-ga-purple-400 data-[state=unchecked]:focus-visible:ring-ga-purple-300 dark:data-[state=checked]:focus-visible:border-ga-purple-900 dark:data-[state=unchecked]:focus-visible:border-ga-purple-500 dark:data-[state=checked]:focus-visible:ring-ga-purple-700 dark:data-[state=unchecked]:focus-visible:ring-ga-purple-800',

        'hover:cursor-pointer',
        className
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center text-shadow-sm text-white transition-none"
        data-slot="checkbox-indicator"
      >
        <HugeiconsIcon icon={Tick01Icon} size={14} strokeWidth={2} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
