'use client';

import { useQuery } from 'convex/react';
import { useState } from 'react';
import ConfirmDeleteAccountDialog from '@/components/dialogs/confirm-delete-account-dialog';
import UserDetailsForm from '@/components/forms/edit-profile-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { api } from '../../../../convex/_generated/api';
import RadioThemeSwitcher from './radio-theme-switcher';

export default function Settings() {
  const user = useQuery(api.services.users.getCurrent);
  const [confirmDeleteAccountOpen, setConfirmDeleteAccountOpen] =
    useState(false);

  return (
    <div className="flex h-fit w-full max-w-lg flex-col gap-8 p-12">
      <h2 className="font-bold text-lg">Your Details</h2>
      {
        user ? (
          <UserDetailsForm
            formButtonProps={{ submitText: 'Save' }}
            user={user}
          />
        ) : (
          <div />
        ) /* TODO : Add skeletons for current user */
      }
      <h2 className="mt-4 font-bold text-lg">Theme</h2>
      <RadioThemeSwitcher />
      <Separator />
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-destructive text-lg">Danger Zone</h2>
        <p className="text-muted-foreground text-sm">
          Delete your account and all your data
        </p>
      </div>
      <ConfirmDeleteAccountDialog
        onOpenChange={setConfirmDeleteAccountOpen}
        open={confirmDeleteAccountOpen}
      />
      <Button
        className="w-fit"
        onClick={() => setConfirmDeleteAccountOpen(true)}
        variant="destructive"
      >
        Delete account
      </Button>
    </div>
  );
}
