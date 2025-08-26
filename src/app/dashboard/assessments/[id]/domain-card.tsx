import { HugeiconsIcon } from '@hugeicons/react';
import { TriangleIcon } from '@hugeicons-pro/core-solid-standard';
import { Button } from '@/components/ui/button';
import type { Domain } from '@/types/convex';

export default function DomainCard({
  domain,
  onContinue,
}: {
  domain: Domain;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-ga-blue-100 dark:bg-ga-blue-950">
        <HugeiconsIcon
          className="mb-1 size-8 text-ga-blue-600 dark:text-ga-blue-400"
          icon={TriangleIcon}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="font-semibold text-lg">{domain.name} Domain</span>
        <p className="max-w-lg text-center text-muted-foreground">
          {domain.description}
        </p>
      </div>
      <Button
        className="mt-6"
        onClick={onContinue}
        size="lg"
        variant="secondary"
      >
        Continue
      </Button>
    </div>
  );
}
