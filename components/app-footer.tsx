import { HugeiconsIcon } from '@hugeicons/react';
import { PlusSignIcon } from '@hugeicons-pro/core-stroke-rounded';
import ThemeSwitcher from './theme-switcher';
import { Button } from './ui/button';
import { SidebarTrigger } from './ui/sidebar';

export default function AppFooter() {
  return (
    <div className="flex max-h-16 min-h-16 w-full items-center justify-between p-2">
      <SidebarTrigger />
      <Button className="size-12 rounded-full" size="icon">
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
      </Button>
      <ThemeSwitcher />
    </div>
  );
}
