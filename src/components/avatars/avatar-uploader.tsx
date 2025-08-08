/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { UserCircle02Icon } from '@hugeicons-pro/core-stroke-rounded';
import { ArrowLeftIcon, Loader2, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from '@/components/ui/cropper';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { useFileUpload } from '@/hooks/use-file-upload';
import { cn } from '@/lib/utils';
import { LoadingButton } from '../loading-button';
import { Label } from '../ui/label';

// Define type for pixel crop area
type Area = { x: number; y: number; width: number; height: number };

// Helper function to create a cropped image blob
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // Needed for canvas Tainted check
    image.src = url;
  });

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  outputWidth: number = pixelCrop.width, // Optional: specify output size
  outputHeight: number = pixelCrop.height
): Promise<Blob | null> {
  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    // Set canvas size to desired output size
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      outputWidth, // Draw onto the output size
      outputHeight
    );

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg'); // Specify format and quality if needed
    });
  } catch (error) {
    console.error('Error in getCroppedImg:', error);
    return null;
  }
}

export default function AvatarUploader({
  imageUrl = null,
  onChange,
  label = 'Avatar',
  rounded,
  className,
}: {
  imageUrl?: string | null;
  onChange: (
    data: { bytes: ArrayBuffer; type: string } | null
  ) => Promise<void>;
  label?: string;
  rounded?: boolean;
  className?: string;
}) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: 'image/*',
    });

  const previewUrl = files[0]?.preview || null;
  const fileId = files[0]?.id;

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Ref to track the previous file ID to detect new uploads
  const previousFileIdRef = useRef<string | undefined | null>(null);

  // State to store the desired crop area in pixels
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // State for zoom level
  const [zoom, setZoom] = useState(1);

  // Callback for Cropper to provide crop data - Wrap with useCallback
  const handleCropChange = useCallback((pixels: Area | null) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleApply = async () => {
    // Check if we have the necessary data
    if (!(previewUrl && fileId && croppedAreaPixels)) {
      console.error('Missing data for apply:', {
        previewUrl,
        fileId,
        croppedAreaPixels,
      });
      // Remove file if apply is clicked without crop data?
      if (fileId) {
        removeFile(fileId);
        setCroppedAreaPixels(null);
      }
      return;
    }

    try {
      setIsUpdateLoading(true);

      // 1. Get the cropped image blob using the helper
      const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels);

      if (!croppedBlob) {
        // Show toast
        toast.error('Failed to upload image');
        return;
      }

      const data = {
        bytes: await croppedBlob.arrayBuffer(),
        type: croppedBlob.type,
      };

      // 4. Set the final avatar state to the NEW URL
      onChange(data).then(() => {
        setIsUpdateLoading(false);
      });

      URL.revokeObjectURL(previewUrl); // Clean up the preview URL

      // 5. Close the dialog (don't remove the file yet)
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error during apply:', error);
      toast.error('Failed to upload image, please try again.');
      setIsUpdateLoading(false);
      // Close the dialog even if cropping fails
      setIsDialogOpen(false);
    }
  };

  const handleRemoveFinalImage = () => {
    setIsRemoveLoading(true);
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    onChange(null)
      .then(() => {
        setIsRemoveLoading(false);
      })
      .catch(() => {
        toast.error('Failed to remove image, please try again.');
        setIsRemoveLoading(false);
      });
  };

  // Effect to open dialog when a *new* file is ready
  useEffect(() => {
    // Check if fileId exists and is different from the previous one
    if (fileId && fileId !== previousFileIdRef.current) {
      setIsDialogOpen(true); // Open dialog for the new file
      setCroppedAreaPixels(null); // Reset crop area for the new file
      setZoom(1); // Reset zoom for the new file
    }
    // Update the ref to the current fileId for the next render
    previousFileIdRef.current = fileId;
  }, [fileId]); // Depend only on fileId

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <div className={cn('flex h-20 w-fit items-center gap-4', className)}>
        <div className="flex aspect-square h-full shrink-0 items-center justify-center overflow-hidden rounded-full border bg-accent text-muted-foreground">
          {imageUrl === undefined && (
            <Loader2 className="size-5 animate-spin" />
          )}
          {imageUrl === null && (
            <div aria-hidden="true">
              <HugeiconsIcon
                className="size-5"
                icon={UserCircle02Icon}
                strokeWidth={2}
              />
            </div>
          )}
          {imageUrl && (
            <Image
              alt="User avatar"
              className="size-full object-cover"
              height={64}
              src={imageUrl}
              style={{ objectFit: 'cover' }}
              width={64}
            />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Label>{label}</Label>
          <div className="flex gap-2">
            <div className="relative inline-block">
              <LoadingButton
                aria-haspopup="dialog"
                isLoading={isUpdateLoading}
                onClick={openFileDialog}
                size="sm"
                variant="outline"
              >
                {imageUrl ? 'Change image' : 'Upload image'}
              </LoadingButton>
              <input
                {...getInputProps()}
                aria-label="Upload image file"
                className="sr-only"
                tabIndex={-1}
              />
            </div>
            {imageUrl && (
              <LoadingButton
                isLoading={isRemoveLoading}
                onClick={handleRemoveFinalImage}
                size="sm"
                variant="destructive"
              >
                Remove
              </LoadingButton>
            )}
          </div>
        </div>
      </div>

      <DialogContent className="gap-0 p-0 sm:max-w-140 *:[button]:hidden">
        <DialogDescription className="sr-only">
          Crop image dialog
        </DialogDescription>
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="flex h-16 items-center justify-between border-b p-4 text-base">
            <div className="flex items-center gap-2">
              <Button
                aria-label="Cancel"
                className="-my-1"
                onClick={() => setIsDialogOpen(false)}
                size="icon"
                type="button"
                variant="ghost"
              >
                <ArrowLeftIcon
                  aria-hidden="true"
                  className="text-muted-foreground"
                />
              </Button>
              <span>Crop image</span>
            </div>
            <Button
              autoFocus
              className="-my-1"
              disabled={!previewUrl}
              onClick={handleApply}
              size="sm"
            >
              Apply
            </Button>
          </DialogTitle>
        </DialogHeader>
        {previewUrl && (
          <Cropper
            className="h-96 sm:h-120"
            image={previewUrl}
            onCropChange={handleCropChange}
            onZoomChange={setZoom}
            zoom={zoom}
          >
            <CropperDescription />
            <CropperImage />
            <CropperCropArea
              className={rounded ? 'rounded-full' : 'rounded-lg'}
            />
          </Cropper>
        )}
        <DialogFooter className="border-t px-4 py-6">
          <div className="mx-auto flex w-full max-w-80 items-center gap-4">
            <ZoomOutIcon
              aria-hidden="true"
              className="shrink-0 opacity-60"
              size={16}
            />
            <Slider
              aria-label="Zoom slider"
              defaultValue={[1]}
              max={3}
              min={1}
              onValueChange={(value) => setZoom(value[0])}
              step={0.1}
              value={[zoom]}
            />
            <ZoomInIcon
              aria-hidden="true"
              className="shrink-0 opacity-60"
              size={16}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
