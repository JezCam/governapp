import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: `bg-gradient-to-b from-ga-purple-600 via-ga-purple-500 to-ga-purple-400 bg-size-[200%_200%] bg-position-[0%_0%]
                  border-1 border-ga-purple-800 dark:border-black
                  text-ga-purple-100 text-shadow-sm
                  shadow-[inset_0_0_0_1px_var(--color-ga-purple-500),_0_1px_0_var(--color-ga-purple-800)] dark:shadow-[inset_0_0_0_1px_var(--color-ga-purple-500),_0_1px_0_var(--color-black)]
                  
                  hover:bg-position-[100%_100%]
                  hover:text-white
                  hover:shadow-[inset_0_0_0_1px_var(--color-ga-purple-400),_0_3px_0_var(--color-ga-purple-800)] dark:hover:shadow-[inset_0_0_0_1px_var(--color-ga-purple-400),_0_3px_0_var(--color-black)]
                  hover:-translate-y-0.5 transition-all
                  
                  focus-visible:ring-ga-purple-400 focus-visible:border-ga-purple-200 dark:focus-visible:ring-ga-purple-700 dark:focus-visible:border-ga-purple-900
                  active:!shadow-[inset_0_0_0_1px_var(--color-ga-purple-400),_0_1px_0_var(--color-ga-purple-800)] dark:active:!shadow-[inset_0_0_0_1px_var(--color-ga-purple-400),_0_1px_0_var(--color-black)]
                  active:!translate-y-0
                  
                  data-[state=open]:shadow-[inset_0_0_0_1px_var(--color-ga-purple-400),_0_3px_0_var(--color-ga-purple-800)] dark:data-[state=open]:shadow-[inset_0_0_0_1px_var(--color-ga-purple-400),_0_3px_0_var(--color-black)]
                  data-[state=open]:-translate-y-0.5`,
        destructive: `bg-gradient-to-b from-red-600 via-red-500 to-red-400 bg-size-[200%_200%] bg-position-[0%_0%]
                      border-1 border-red-800 dark:border-black
                      text-red-100 text-shadow-sm
                      shadow-[inset_0_0_0_1px_var(--color-red-500),_0_1px_0_var(--color-red-800)] dark:shadow-[inset_0_0_0_1px_var(--color-red-500),_0_1px_0_var(--color-black)]
        
                      hover:bg-position-[100%_100%]
                      hover:text-white
                      hover:shadow-[inset_0_0_0_1px_var(--color-red-400),_0_3px_0_var(--color-red-800)] dark:hover:shadow-[inset_0_0_0_1px_var(--color-red-400),_0_3px_0_var(--color-black)]
                      hover:-translate-y-0.5 transition-all
        
                      focus-visible:ring-red-400 focus-visible:border-red-200 dark:focus-visible:ring-red-700 dark:focus-visible:border-red-900
                      active:!shadow-[inset_0_0_0_1px_var(--color-red-400),_0_1px_0_var(--color-red-800)] dark:active:!shadow-[inset_0_0_0_1px_var(--color-red-400),_0_1px_0_var(--color-black)]
                      active:!translate-y-0
        
                      data-[state=open]:shadow-[inset_0_0_0_1px_var(--color-red-400),_0_3px_0_var(--color-red-800)] dark:data-[state=open]:shadow-[inset_0_0_0_1px_var(--color-red-400),_0_3px_0_var(--color-black)]
                      data-[state=open]:-translate-y-0.5`,
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'border bg-secondary text-secondary-foreground shadow-highlight shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="button"
      {...props}
    />
  );
}

export { Button, buttonVariants };
