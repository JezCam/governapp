import ThemeSwitcher from './theme-switcher';
import { SidebarTrigger } from './ui/sidebar';

export default function AppFooter() {
  return (
    <div className="flex max-h-14 min-h-14 w-full items-center justify-between border-t p-2">
      <SidebarTrigger />
      <ThemeSwitcher />
    </div>
  );
}
