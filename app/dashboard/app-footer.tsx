import ThemeSwitcher from "../../components/theme-switcher";
import { SidebarTrigger } from "../../components/ui/sidebar";
import AddButton from "./add-button";

export default function AppFooter() {
  return (
    <div className="relative flex max-h-16 min-h-16 w-full items-center justify-between p-2">
      <div className="absolute inset-0 z-40 bg-background" />
      <SidebarTrigger className="z-45" />
      <AddButton />
      <ThemeSwitcher className="z-45" />
    </div>
  );
}
