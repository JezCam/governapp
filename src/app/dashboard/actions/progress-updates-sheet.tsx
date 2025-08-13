import type * as SheetPrimitive from '@radix-ui/react-dialog';
import { CornerDownLeft } from 'lucide-react';
import LoadingButton from '@/components/loading-button';
// import UserLabel from "@/components/labels/user-label"; TODO: Implement
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { teamMembers } from '@/dummy-data/team';

export default function ProgressUpdatesSheet(
  props: React.ComponentProps<typeof SheetPrimitive.Root>
) {
  return (
    <Sheet {...props}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Progress Updates</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col gap-4 overflow-auto px-4 pb-4">
          <div className="flex h-full flex-col gap-8 overflow-auto">
            {teamMembers.map((teamMember) => (
              <div className="flex flex-col gap-1" key={teamMember.userId}>
                <div className="flex items-center gap-2">
                  {/* <UserLabel user={teamMember} /> */}
                  <span className="text-muted-foreground text-sm">
                    • 2d ago
                  </span>
                </div>
                <span className="ml-8 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </span>
              </div>
            ))}
          </div>
          <div className="flex h-fit flex-col items-end gap-2">
            <Textarea
              className="field-sizing-content max-h-40 min-h-20 resize-none py-1.75 pb-6"
              placeholder="Add a progress update"
            />
            <LoadingButton className="w-fit" size="sm">
              Post <CornerDownLeft />
            </LoadingButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
