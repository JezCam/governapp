'use client';

import { useAction, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import AvatarUploader from './avatar-uploader';

export default function UserImageUploader({
  imageUrl,
  className,
}: {
  imageUrl?: string;
  className?: string;
}) {
  const updateUserImage = useAction(api.services.users.updateImage);
  const removeUserImage = useMutation(api.services.users.removeImage);

  const handleImageChange = async (
    data: { bytes: ArrayBuffer; type: string } | null
  ) => {
    if (!data) {
      await removeUserImage();
      return;
    }
    updateUserImage(data);
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
