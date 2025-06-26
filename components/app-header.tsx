import NotificationsDropdown from './notifications-dropdown';
import { Separator } from './ui/separator';
import UserDropdown from './user-dropdown';

export default function AppHeader() {
  return (
    <div className="flex max-h-16 min-h-16 w-full items-center justify-between gap-4 p-2">
      <div className="w-full" />
      <div className="flex h-full w-full items-center justify-end gap-3">
        <NotificationsDropdown />
        <Separator className="!h-9" orientation="vertical" />
        <UserDropdown />
      </div>
    </div>
  );
}
