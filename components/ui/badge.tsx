import { HugeiconsIcon } from '@hugeicons/react';
import {
  CheckmarkCircle03Icon,
  DashedLineCircleIcon,
  MicrosoftAdminIcon,
  Progress03Icon,
  UserGroupIcon,
  UserIcon,
} from '@hugeicons-pro/core-stroke-rounded';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '@/lib/utils';

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
        blue: 'border-ga-blue-200 bg-ga-blue-100 text-ga-blue-700 dark:border-ga-blue-900 dark:bg-ga-blue-950 dark:text-ga-blue-100 [a&]:hover:bg-primary/90',
        admin:
          'border-ga-purple-200 bg-ga-purple-100 text-ga-purple-700 dark:border-ga-purple-900 dark:bg-ga-purple-950 dark:text-white',
        member:
          'border-border bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        'not-started':
          'border-border bg-secondary pl-1.5 text-secondary-foreground ',
        'in-progress':
          'border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200',
        completed:
          'border-ga-green-200 bg-ga-green-100 text-ga-green-800 dark:border-ga-green-900 dark:bg-ga-green-950 dark:text-ga-green-200',
        closed:
          'border-ga-green-200 bg-ga-green-100 text-ga-green-800 dark:border-ga-green-900 dark:bg-ga-green-950 dark:text-ga-green-200',
        self: 'bg-background text-foreground',
        board: 'bg-background text-foreground',
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
      {variant === 'not-started' && (
        <>
          <HugeiconsIcon icon={DashedLineCircleIcon} strokeWidth={2} />
          Not started
        </>
      )}
      {variant === 'in-progress' && (
        <>
          <HugeiconsIcon icon={Progress03Icon} />
          In progress
        </>
      )}
      {variant === 'closed' && (
        <>
          <HugeiconsIcon icon={CheckmarkCircle03Icon} strokeWidth={2} />
          Closed
        </>
      )}
      {variant === 'completed' && (
        <>
          <HugeiconsIcon icon={CheckmarkCircle03Icon} strokeWidth={2} />
          Completed
        </>
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
      {props.children}
    </Comp>
  );
}

export { Badge, badgeVariants };
