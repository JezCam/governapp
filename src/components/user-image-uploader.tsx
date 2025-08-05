'use client';

import { useAction, useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import AvatarUploader from './avatar-uploader';

export default function UserImageUploader() {
  const userImage = useQuery(api.services.user.getImage);
  const updateUserImage = useAction(api.services.user.updateImage);
  const removeUserImage = useMutation(api.services.user.removeImage);

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
      imageUrl={userImage}
      label="Profile Image"
      onChange={handleImageChange}
      rounded
    />
  );
}
