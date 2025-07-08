'use client';

import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export default function RadioThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const light = (
    <div className="flex size-full items-center justify-center bg-gray-100">
      <div className="flex h-full w-20 flex-col gap-2 bg-white p-2">
        <div className="h-2 w-8 rounded-xs bg-gray-200" />
        <div className="h-1 w-12 rounded-xs bg-gray-200" />
        <div className="h-4 w-full rounded-xs bg-gray-200" />
        <div className="h-1 w-12 rounded-xs bg-gray-200" />
      </div>
    </div>
  );

  const dark = (
    <div className="flex size-full items-center justify-center bg-gray-900">
      <div className="flex h-full w-20 flex-col gap-2 bg-gray-800 p-2">
        <div className="h-2 w-8 rounded-xs bg-gray-700" />
        <div className="h-1 w-12 rounded-xs bg-gray-700" />
        <div className="h-4 w-full rounded-xs bg-gray-700" />
        <div className="h-1 w-12 rounded-xs bg-gray-700" />
      </div>
    </div>
  );

  if (!theme) {
    return;
  }

  return (
    <div className="flex gap-3" defaultValue="1">
      <div className="flex flex-col items-center gap-2">
        <Button
          className={cn(
            'h-20 w-30 overflow-hidden p-0',
            theme === 'light' && '!border-primary ring-[3px] ring-primary/30'
          )}
          onClick={() => setTheme('light')}
          variant="outline"
        >
          {light}
        </Button>
        <span className="font-medium text-muted-foreground text-sm">Light</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button
          className={cn(
            'h-20 w-30 overflow-hidden p-0',
            theme === 'dark' && '!border-primary ring-[3px] ring-primary/30'
          )}
          onClick={() => setTheme('dark')}
          variant="outline"
        >
          {dark}
        </Button>
        <span className="font-medium text-muted-foreground text-sm">Dark</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button
          className={cn(
            'relative h-20 w-30 overflow-hidden p-0',
            theme === 'system' && '!border-primary ring-[3px] ring-primary/30'
          )}
          onClick={() => setTheme('system')}
          variant="outline"
        >
          {light}
          <div className="mask-[linear-gradient(to_right,transparent_50%,black_50%)] absolute inset-0">
            {dark}
          </div>
        </Button>
        <span className="font-medium text-muted-foreground text-sm">
          System
        </span>
      </div>
    </div>
  );
}
