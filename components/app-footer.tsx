import ThemeSwitcher from './theme-switcher';
import { SidebarTrigger } from './ui/sidebar';

export default function AppFooter() {
  return (
    <div className="flex max-h-16 min-h-16 w-full items-center justify-between p-2">
      <SidebarTrigger />
      <ThemeSwitcher />
    </div>
  );
}
