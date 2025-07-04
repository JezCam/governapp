import { HugeiconsIcon } from '@hugeicons/react';
import { MicrosoftAdminIcon } from '@hugeicons-pro/core-stroke-rounded';
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
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        blue: 'border-ga-blue-200 bg-ga-blue-100 text-ga-blue-700 dark:border-ga-blue-900 dark:bg-ga-blue-950 dark:text-ga-blue-100 [a&]:hover:bg-primary/90',
        admin:
          'border-ga-purple-200 bg-ga-purple-100 text-ga-purple-700 dark:border-ga-purple-900 dark:bg-ga-purple-950 dark:text-white',
        member:
          'border-border bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
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
      {props.children}
    </Comp>
  );
}

export { Badge, badgeVariants };
