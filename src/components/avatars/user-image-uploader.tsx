/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { api } from '../../../convex/_generated/api';
import AvatarUploader from './avatar-uploader';

export default function UserImageUploader({
  imageUrl,
  className,
}: {
  imageUrl?: string;
  className?: string;
}) {
  const generateUploadUrl = useMutation(api.services.files.generateUploadUrl);
  const updateUserImage = useMutation(api.services.users.updateImageForCurrent);
  const updateCurrentUser = useMutation(api.services.users.updateCurrent);

  const handleImageChange = async (image: File | null) => {
    if (image === null) {
      await updateCurrentUser({
        imageUrl: null,
      });
      return;
    }
    const uploadUrl = await generateUploadUrl();
    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': image.type,
        },
        body: image,
      });

      const { storageId } = await response.json();

      updateUserImage({
        storageId,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image', {
        description: 'There was an error uploading your organisation image.',
      });
    }
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
