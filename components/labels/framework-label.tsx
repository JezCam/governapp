import { HugeiconsIcon } from "@hugeicons/react";
import { Hexagon01Icon } from "@hugeicons-pro/core-solid-rounded";

export default function FrameworkLabel({ framework }: { framework: string }) {
  return (
    <div className="flex items-center gap-1">
      {/* Framework Icon */}
      <HugeiconsIcon className="size-3.5 text-primary" icon={Hexagon01Icon} />
      <span className="line-clamp-1 truncate font-medium text-primary">
        {framework}
      </span>
    </div>
  );
}
