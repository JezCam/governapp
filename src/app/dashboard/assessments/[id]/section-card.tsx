import { HugeiconsIcon } from '@hugeicons/react';
import { SquareIcon } from '@hugeicons-pro/core-solid-standard';
import { Button } from '@/components/ui/button';
import type { Section } from '@/types/convex';

export default function SectionCard({
  section,
  onContinue,
}: {
  section: Section;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-ga-green-100 dark:bg-ga-green-950">
        <HugeiconsIcon
          className="size-8 text-ga-green-600 dark:text-ga-green-400"
          icon={SquareIcon}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="font-semibold text-lg">{section.name} Section</span>
        <p className="max-w-xl text-center text-muted-foreground">
          {section.description}
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
