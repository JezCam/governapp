'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-3', className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'aspect-square size-4 shrink-0 rounded-full outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
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
      data-slot="radio-group-item"
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className="relative flex items-center justify-center"
        data-slot="radio-group-indicator"
      >
        <CircleIcon className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-2 fill-white stroke-white" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
