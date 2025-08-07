'use client';

import { useAction, useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import AvatarUploader from './avatar-uploader';

export default function UserImageUploader() {
  const userImage = useQuery(api.services.users.getImage);
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
      imageUrl={userImage}
      label="Profile Image"
      onChange={handleImageChange}
      rounded
    />
  );
}
