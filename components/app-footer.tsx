import AddButton from './add-button';
import ThemeSwitcher from './theme-switcher';
import { SidebarTrigger } from './ui/sidebar';

export default function AppFooter() {
  return (
    <div className="relative flex max-h-16 min-h-16 w-full items-center justify-between bg-background p-2">
      <div className="absolute inset-0 z-40 bg-background" />
      <SidebarTrigger className="z-45" />
      <AddButton />
      <ThemeSwitcher className="z-45" />
    </div>
  );
}
