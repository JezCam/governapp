'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useId, useState } from 'react';
import { Switch } from '@/components/ui/switch';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const id = useId();
  const { resolvedTheme, setTheme } = useTheme();

  // Only render after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder with same structure during SSR
  if (!mounted) {
    return (
      <div className="group inline-flex items-center gap-2">
        <span className="hidden">Loading theme...</span>
        <button
          className="flex-1 cursor-pointer text-right font-medium text-sm"
          disabled
          type="button"
        >
          <MoonIcon aria-hidden="true" size={16} />
        </button>
        <Switch
          aria-label="Toggle between dark and light mode"
          checked={false}
          disabled
        />
        <button
          className="flex-1 cursor-pointer text-left font-medium text-sm"
          disabled
          type="button"
        >
          <SunIcon aria-hidden="true" size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      className="group inline-flex items-center gap-2"
      data-state={resolvedTheme === 'light' ? 'checked' : 'unchecked'}
    >
      <span className="hidden">current theme: {resolvedTheme}</span>
      <button
        aria-controls={id}
        className="flex-1 cursor-pointer text-right font-medium text-sm group-data-[state=checked]:text-muted-foreground/70"
        id={`${id}-off`}
        onClick={() => setTheme('dark')}
        type="button"
      >
        <MoonIcon aria-hidden="true" size={16} />
      </button>
      <Switch
        aria-label="Toggle between dark and light mode"
        aria-labelledby={`${id}-off ${id}-on`}
        checked={resolvedTheme === 'light'}
        id={id}
        onCheckedChange={(checked) => setTheme(checked ? 'light' : 'dark')}
      />
      <button
        aria-controls={id}
        className="flex-1 cursor-pointer text-left font-medium text-sm group-data-[state=unchecked]:text-muted-foreground/70"
        id={`${id}-on`}
        onClick={() => setTheme('light')}
        type="button"
      >
        <SunIcon aria-hidden="true" size={16} />
      </button>
    </div>
  );
}
