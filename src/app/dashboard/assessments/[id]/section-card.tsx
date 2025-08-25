import { Button } from '@/components/ui/button';
import type { Section } from '@/types/convex';

export default function SectionCard({
  section,
  onContinue,
}: {
  section: Section;
  onContinue?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {section.name} <Button onClick={onContinue}>Continue</Button>
    </div>
  );
}
