import Lottie from 'lottie-react';
import { cn } from '@/lib/utils';
import loader from '../../public/loader.json' with { type: 'json' };

export default function LoadingLogo({ className }: { className?: string }) {
  return (
    <div className={cn('h-12 w-12', className)}>
      <Lottie animationData={loader} loop={true} />
    </div>
  );
}
