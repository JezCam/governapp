'use client';

import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { cn } from '@/lib/utils';
import { DropdownMenuItem } from './ui/dropdown-menu';

export function LoadingDropdownMenuItem({
  isLoading = false,
  children,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  isLoading?: boolean;
}) {
  return (
    <DropdownMenuItem
      className={cn('relative', className)}
      disabled={isLoading}
      {...props}
    >
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            animate={{ opacity: 1, width: '1rem', translateX: 0 }}
            className="ml-auto flex items-center justify-center"
            exit={{ opacity: 0, width: 0, translateX: '0.5rem' }}
            initial={{ opacity: 0, width: 0, translateX: '0.5rem' }}
            key="loader"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Loader2 className="size-4 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </DropdownMenuItem>
  );
}
