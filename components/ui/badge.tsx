import { HugeiconsIcon } from '@hugeicons/react';
import {
  Alert02Icon,
  CheckmarkBadge03Icon,
  MicrosoftAdminIcon,
  UserGroupIcon,
  UserIcon,
  ZapIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { type Status, statuses } from '@/dummy-data/status';
import { cn } from '@/lib/utils';
import StatusLabel from '../labels/status-label';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary/80 text-primary-foreground shadow-highlight [a&]:hover:bg-primary/90',
        secondary:
          'border-border bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
        outline:
          'bg-background text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        blue: `bg-gradient-to-b from-ga-blue-100 dark:from-ga-blue-950 to-white dark:to-ga-blue-900
              border-1 border-ga-blue-300 dark:border-black
              text-ga-blue-700 dark:text-ga-blue-100
              shadow-[inset_0_0_0_1px_var(--color-white),_0_1px_0_var(--color-ga-blue-300)] dark:shadow-[inset_0_0_0_1px_var(--color-ga-blue-900),_0_1px_0_var(--color-black)]`,
        admin: `bg-gradient-to-b from-ga-purple-100 dark:from-ga-purple-950 to-white dark:to-ga-purple-900
                  border-1 border-ga-purple-300 dark:border-black
                  text-ga-purple-700 dark:text-ga-purple-100
                  shadow-[inset_0_0_0_1px_var(--color-white),_0_1px_0_var(--color-ga-purple-300)] dark:shadow-[inset_0_0_0_1px_var(--color-ga-purple-900),_0_1px_0_var(--color-black)]
                  
                  pl-1.5`,
        member: `bg-gradient-to-b from-gray-200 dark:from-gray-800 to-gray-100 dark:to-gray-700
                  border-1 border-gray-300 dark:border-black
                  text-gray-800 dark:text-white
                  shadow-[inset_0_0_0_1px_var(--color-gray-100),_0_1px_0_var(--color-gray-300)] dark:shadow-[inset_0_0_0_1px_var(--color-gray-700),_0_1px_0_var(--color-black)]`,
        'not-started': `bg-gradient-to-b from-gray-100 dark:from-gray-900 to-white dark:to-gray-700
                  border-1 border-gray-300 dark:border-black
                  text-gray-800 dark:text-gray-100
                  shadow-[inset_0_0_0_1px_var(--color-white),_0_1px_0_var(--color-gray-300)] dark:shadow-[inset_0_0_0_1px_var(--color-gray-700),_0_1px_0_var(--color-black)]
                  
                  pl-1.5 rounded-full`,
        'in-progress': `bg-gradient-to-b from-amber-100 dark:from-amber-950 to-white dark:to-amber-900
                  border-1 border-amber-300 dark:border-black
                  text-amber-800 dark:text-amber-100
                  shadow-[inset_0_0_0_1px_var(--color-white),_0_1px_0_var(--color-amber-300)] dark:shadow-[inset_0_0_0_1px_var(--color-amber-900),_0_1px_0_var(--color-black)]
                  
                  pl-1.5 rounded-full`,
        completed: `bg-gradient-to-b from-ga-green-100 dark:from-ga-green-950 to-white dark:to-ga-green-900
                  border-1 border-ga-green-300 dark:border-black
                  text-ga-green-800 dark:text-ga-green-100
                  shadow-[inset_0_0_0_1px_var(--color-white),_0_1px_0_var(--color-ga-green-300)] dark:shadow-[inset_0_0_0_1px_var(--color-ga-green-900),_0_1px_0_var(--color-black)]
                  
                  pl-1.5 rounded-full`,
        closed: `bg-gradient-to-b from-red-100 dark:from-red-950 to-white dark:to-red-900
                  border-1 border-red-300 dark:border-black
                  text-red-800 dark:text-red-100
                  shadow-[inset_0_0_0_1px_var(--color-white),_0_1px_0_var(--color-red-300)] dark:shadow-[inset_0_0_0_1px_var(--color-red-900),_0_1px_0_var(--color-black)]
                  
                  pl-1.5 rounded-full`,
        blocked: `bg-gradient-to-b from-red-100 dark:from-red-950 to-white dark:to-red-900
                  border-1 border-red-300 dark:border-black
                  text-red-800 dark:text-red-100
                  shadow-[inset_0_0_0_1px_var(--color-white),_0_1px_0_var(--color-red-300)] dark:shadow-[inset_0_0_0_1px_var(--color-red-900),_0_1px_0_var(--color-black)]
                  
                  pl-1.5 rounded-full`,
        self: 'bg-background pl-1.5 text-foreground',
        board: 'bg-background pl-1.5 text-foreground',
        green: `bg-gradient-to-b from-ga-green-600 to-ga-green-500
                border-1 border-ga-green-800 dark:border-black
                text-white text-shadow-md
                shadow-[inset_0_0_0_1px_var(--color-ga-green-500),_0_1px_0_var(--color-ga-green-800)] dark:shadow-[inset_0_0_0_1px_var(--color-ga-green-500),_0_1px_0_var(--color-black)]
                  
                rounded-sm pl-2`,
        amber: `bg-gradient-to-b from-amber-600 to-amber-500
                border-1 border-amber-800 dark:border-black
                text-white text-shadow-md
                shadow-[inset_0_0_0_1px_var(--color-amber-500),_0_1px_0_var(--color-amber-800)] dark:shadow-[inset_0_0_0_1px_var(--color-amber-500),_0_1px_0_var(--color-black)]
                  
                rounded-sm pl-2`,
        red: `bg-gradient-to-b from-red-600 to-red-500
              border-1 border-red-800 dark:border-black
              text-white text-shadow-md
              shadow-[inset_0_0_0_1px_var(--color-red-500),_0_1px_0_var(--color-red-800)] dark:shadow-[inset_0_0_0_1px_var(--color-red-500),_0_1px_0_var(--color-black)]
                  
              rounded-sm pl-2`,
        black: `bg-gradient-to-b from-gray-600 to-gray-500
                border-1 border-black
                text-white text-shadow-md
                shadow-[inset_0_0_0_1px_var(--color-gray-500),_0_1px_0_var(--color-black)]
                
                rounded-sm pl-2`,
        actions: `bg-gradient-to-b from-ga-purple-100 dark:from-ga-purple-950 to-white dark:to-ga-purple-900
                  border-1 border-ga-purple-300 dark:border-black
                  text-ga-purple-700 dark:text-ga-purple-100
                  shadow-[inset_0_0_0_1px_var(--color-white),_0_1px_0_var(--color-ga-purple-300)] dark:shadow-[inset_0_0_0_1px_var(--color-ga-purple-900),_0_1px_0_var(--color-black)]
                  
                  pl-1 pr-1.5 gap-0.75 rounded-sm`,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      className={cn(badgeVariants({ variant }), className)}
      data-slot="badge"
      {...props}
    >
      {variant === 'admin' && (
        <>
          <HugeiconsIcon icon={MicrosoftAdminIcon} strokeWidth={2} />
          Admin
        </>
      )}
      {variant === 'member' && 'Member'}
      {variant && (statuses as readonly string[]).includes(variant) && (
        <StatusLabel status={variant as Status} />
      )}
      {variant === 'self' && (
        <>
          <HugeiconsIcon icon={UserIcon} strokeWidth={2} />
          Self
        </>
      )}
      {variant === 'board' && (
        <>
          <HugeiconsIcon
            className="!size-3.5"
            icon={UserGroupIcon}
            strokeWidth={1.8}
          />
          Board
        </>
      )}
      {variant === 'green' && (
        <>
          <HugeiconsIcon icon={CheckmarkBadge03Icon} strokeWidth={2} />
          Green
        </>
      )}
      {variant === 'amber' && (
        <>
          <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
          Amber
        </>
      )}
      {variant === 'red' && (
        <>
          <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
          Red
        </>
      )}
      {variant === 'black' && (
        <>
          <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
          Black
        </>
      )}
      {variant === 'actions' && (
        <HugeiconsIcon icon={ZapIcon} strokeWidth={2} />
      )}
      {props.children}
    </Comp>
  );
}

export { Badge, badgeVariants };
