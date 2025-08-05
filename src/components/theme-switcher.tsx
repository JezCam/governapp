'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) {
    return <div className="w-full" />; // Avoid rendering if the theme is not resolved
  }

  return (
    <div
      className={cn(
        'group inline-flex items-center justify-end gap-2',
        className
      )}
      data-state={resolvedTheme === 'light' ? 'checked' : 'unchecked'}
    >
      <span className="hidden">current theme: {resolvedTheme}</span>
      <button
        className="cursor-pointer text-right font-medium text-sm group-data-[state=checked]:text-muted-foreground/70"
        onClick={() => setTheme('dark')}
        type="button"
      >
        <MoonIcon aria-hidden="true" size={16} />
      </button>
      <Switch
        aria-label="Toggle between dark and light mode"
        checked={resolvedTheme === 'light'}
        onCheckedChange={(checked) => setTheme(checked ? 'light' : 'dark')}
      />
      <button
        className="cursor-pointer text-left font-medium text-sm group-data-[state=unchecked]:text-muted-foreground/70"
        onClick={() => setTheme('light')}
        type="button"
      >
        <SunIcon aria-hidden="true" size={16} />
      </button>
    </div>
  );
}
