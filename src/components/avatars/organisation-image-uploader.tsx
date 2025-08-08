'use client';

import { useAction, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import AvatarUploader from './avatar-uploader';

export default function OrganisationImageUploader({
  imageUrl,
  className,
}: {
  imageUrl?: string;
  className?: string;
}) {
  const updateOrganisationImage = useAction(
    api.services.organisations.updateImageForActive
  );
  const removeOrganisationImage = useMutation(
    api.services.organisations.removeImageForActive
  );

  const handleImageChange = async (
    data: { bytes: ArrayBuffer; type: string } | null
  ) => {
    if (!data) {
      await removeOrganisationImage();
      return;
    }
    updateOrganisationImage(data);
  };

  return (
    <AvatarUploader
      className={className}
      imageUrl={imageUrl}
      label="Organisation Image"
      onChange={handleImageChange}
    />
  );
}
