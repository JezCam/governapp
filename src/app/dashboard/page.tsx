'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import HomeActions from './home-actions';

export default function Dashboard() {
  const currentUser = useQuery(api.services.users.getCurrent);

  if (currentUser === undefined) {
    return null; // TODO: Implement loading state
  }

  return (
    <div className="flex size-full items-center justify-center bg-gray-50 p-12 px-16 dark:bg-gray-950/50">
      <div className="flex size-full max-w-[1440px] flex-col gap-4">
        <h1 className="flex items-center gap-1 font-bold text-2xl">
          Hey {currentUser.firstName}, what would you like to do?
        </h1>
        <HomeActions />
      </div>
    </div>
  );
}
