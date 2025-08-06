'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const themes = [
  {
    key: 'system',
    icon: Monitor,
    label: 'System theme',
  },
  {
    key: 'light',
    icon: Sun,
    label: 'Light theme',
  },
  {
    key: 'dark',
    icon: Moon,
    label: 'Dark theme',
  },
];

export const ThemeSwitcher = ({ small }: { small?: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative isolate flex gap-1 rounded-full border bg-background p-1">
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className={cn(
              'relative size-6 rounded-full',
              small ? 'size-4' : '',
              key === 'system' && isActive ? 'mr-1' : '',
              key === 'light' && isActive ? 'mx-0.5' : '',
              key === 'dark' && isActive ? 'ml-1' : ''
            )}
            key={key}
            onClick={() => setTheme(key)}
            type="button"
          >
            {isActive && (
              <div className="-inset-1.25 absolute rounded-full border bg-secondary" />
            )}
            <Icon
              className={cn(
                'relative z-10 m-auto size-4',
                small ? 'size-3.5' : '',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
