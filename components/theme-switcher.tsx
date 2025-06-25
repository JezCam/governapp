'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useId } from 'react';
import { Switch } from '@/components/ui/switch';

export default function ThemeSwitcher() {
  const id = useId();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div
      className="group inline-flex items-center gap-2"
      data-state={resolvedTheme === 'light' ? 'checked' : 'unchecked'}
    >
      <span className="hidden">current theme: {resolvedTheme}</span>
      <span
        aria-controls={id}
        className="flex-1 cursor-pointer text-right font-medium text-sm group-data-[state=checked]:text-muted-foreground/70"
        id={`${id}-off`}
        onClick={() => setTheme('dark')}
      >
        <MoonIcon aria-hidden="true" size={16} />
      </span>
      <Switch
        aria-label="Toggle between dark and light mode"
        aria-labelledby={`${id}-off ${id}-on`}
        checked={resolvedTheme === 'light'}
        id={id}
        onCheckedChange={(checked) => setTheme(checked ? 'light' : 'dark')}
      />
      <span
        aria-controls={id}
        className="flex-1 cursor-pointer text-left font-medium text-sm group-data-[state=unchecked]:text-muted-foreground/70"
        id={`${id}-on`}
        onClick={() => setTheme('light')}
      >
        <SunIcon aria-hidden="true" size={16} />
      </span>
    </div>
  );
}
