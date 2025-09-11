import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import ActivateButton from './activate-button';

export default function ActivateCard() {
  const isActive = useQuery(api.services.organisations.isActiveActive);

  if (isActive === undefined) {
    return null; // TODO: Add a skeleton loader
  }

  if (isActive) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border border-sidebar-border bg-background p-3 shadow-sm">
      <div className="flex flex-col ">
        <div className="font-semibold">Activate your organisation</div>
        <p className="text-muted-foreground text-sm">
          Go active and unlock access to all of our frameworks.
        </p>
      </div>
      <ActivateButton />
    </div>
  );
}
