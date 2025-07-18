'use client';

import { useState } from 'react';
import ConfirmDeleteAccountDialog from '@/components/dialogs/confirm-delete-account-dialog';
import UserDetailsForm from '@/components/forms/user-details-form';
import RadioThemeSwitcher from '@/components/radio-theme-switcher';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  const [confirmDeleteAccountOpen, setConfirmDeleteAccountOpen] =
    useState(false);

  return (
    <div className="flex size-full max-w-3xl flex-col gap-8 p-12">
      <h2 className="font-bold text-lg">Your Details</h2>
      <UserDetailsForm />
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
