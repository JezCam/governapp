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
      {domain.name} <Button onClick={onContinue}>Continue</Button>
    </div>
  );
}
