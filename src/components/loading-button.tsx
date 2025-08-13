'use client';

import type { VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { forwardRef } from 'react';
import { Button, type buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type LoadingButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  };

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      isLoading = false,
      children,
      className,
      variant = 'default',
      size = 'default',
      type = 'button',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        className={cn('relative', className)}
        disabled={disabled || isLoading}
        {...{ ref, type, variant, size }}
        {...props}
      >
        <AnimatePresence initial={false}>
          {isLoading && (
            <motion.div
              animate={{ opacity: 1, width: '1rem', marginRight: 0 }}
              className="flex items-center justify-center"
              exit={{ opacity: 0, width: 0, marginRight: '-0.5rem' }}
              initial={{ opacity: 0, width: 0, marginRight: '-0.5rem' }}
              key="loader"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <Loader2 className="size-4 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
        {children}
      </Button>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';

export default LoadingButton;
