import AppBreadcrumb from './app-breadcrumb';
import NotificationsDropdown from './notifications-dropdown';
import { Separator } from './ui/separator';
import UserDropdown from './user-dropdown';

export default function AppHeader() {
  return (
    <div className="flex max-h-16 min-h-16 w-full items-center justify-between gap-4 p-2 pl-3.5">
      <div className="w-full">
        <AppBreadcrumb />
      </div>
      <div className="flex h-full w-full items-center justify-end gap-3">
        <NotificationsDropdown />
        <Separator className="!h-6" orientation="vertical" />
        <UserDropdown />
      </div>
    </div>
  );
}
