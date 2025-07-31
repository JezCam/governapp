'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import FrameworkLabel from '@/components/labels/framework-label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function FrameworkInfoCard({
  variant,
  title,
  description,
}: {
  variant: 'domain' | 'section';
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState(true);

  if (!open) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative flex w-full flex-col gap-2 rounded-md border p-4',
        variant === 'domain'
          ? 'border-ga-blue-200 bg-ga-blue-50 dark:border-ga-blue-800 dark:bg-ga-blue-950'
          : '',
        variant === 'section'
          ? 'border-ga-green-200 bg-ga-green-50 dark:border-ga-green-800 dark:bg-ga-green-950'
          : ''
      )}
    >
      <Button
        className={cn(
          'absolute top-2 right-2 cursor-pointer text-muted-foreground',
          variant === 'domain' ? 'hover:bg-ga-blue-100' : '',
          variant === 'section' ? 'hover:bg-ga-green-100' : ''
        )}
        onClick={() => setOpen(false)}
        size="icon"
        variant="ghost"
      >
        <X size={16} />
      </Button>
      <FrameworkLabel name={title} variant={variant} />
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
