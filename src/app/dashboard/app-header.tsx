import NotificationsDropdown from "@/components/notifications-dropdown";
import UserDropdown from "@/components/user-dropdown";
import AppBreadcrumb from "./app-breadcrumb";

export default function AppHeader() {
  return (
    <div className="z-40 flex max-h-16 min-h-16 w-full items-center justify-between">
      <div className="flex w-full items-center justify-between p-2 px-3.5">
        <AppBreadcrumb />
        <NotificationsDropdown />
      </div>
      <UserDropdown />
    </div>
  );
}
