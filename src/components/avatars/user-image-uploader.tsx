/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { api } from '../../../convex/_generated/api';
import type { ErrorCode } from '../../../convex/errors';
import AvatarUploader from './avatar-uploader';

export default function UserImageUploader({
  imageUrl,
  className,
}: {
  imageUrl?: string;
  className?: string;
}) {
  const generateUploadUrl = useMutation(api.services.storage.generateUploadUrl);
  const updateUserImage = useMutation(api.services.users.updateImageForCurrent);
  const updateCurrentUser = useMutation(api.services.users.updateCurrent);

  const handleImageChange = async (image: File | null) => {
    if (image === null) {
      await updateCurrentUser({
        data: { imageUrl: undefined },
      });
      return;
    }

    const uploadUrl = await generateUploadUrl();

    // This error is repeated in multiple places, so we define it once
    const defaultError = () =>
      toast.error('Failed to upload image', {
        description: 'There was an error uploading your profile image.',
      });

    fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': image.type,
      },
      body: image,
    })
      .then(async (response) => {
        if (!response.ok) {
          defaultError();
        }

        const { storageId } = await response.json();

        updateUserImage({
          storageId,
        })
          .then(() => {
            toast.success('Profile image updated successfully');
          })
          .catch((error) => {
            switch (error.data as ErrorCode) {
              case 'UNAUTHENTICATED':
                toast.error('You must be logged in to upload an image');
                break;
              case 'USER_NOT_FOUND':
                toast.error('User not found');
                break;
              default:
                defaultError();
                break;
            }
          });
      })
      .catch(() => {
        defaultError();
      });
  };

  return (
    <AvatarUploader
      className={className}
      imageUrl={imageUrl}
      label="Profile Image"
      onChange={handleImageChange}
      rounded
    />
  );
}
