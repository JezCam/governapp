import type * as SheetPrimitive from '@radix-ui/react-dialog';
import { useMutation, useQuery } from 'convex/react';
import { CornerDownLeft } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import UserLabel from '@/components/labels/user-label';
import LoadingButton from '@/components/loading-button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { formatDateTime } from '@/lib/utils';
import { api } from '../../../../convex/_generated/api';
import type { Id } from '../../../../convex/_generated/dataModel';

export default function ProgressUpdatesSheet(
  props: React.ComponentProps<typeof SheetPrimitive.Root> & {
    actionId?: Id<'actions'>;
  }
) {
  const comments = useQuery(
    api.services.actionComments.listByActionIdWithUser,
    props.actionId
      ? {
          actionId: props.actionId,
        }
      : 'skip'
  );
  const addComment = useMutation(api.services.actionComments.create);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPost = () => {
    const content = textAreaRef.current?.value;
    if (props.actionId && content && content.trim().length > 0) {
      setIsLoading(true);
      addComment({
        actionId: props.actionId,
        content: content.trim(),
      })
        .then(() => {
          // Clear the textarea after successful post
          if (textAreaRef.current) {
            textAreaRef.current.value = '';
          }
        })
        .catch((error) => {
          switch (error.data) {
            default:
              toast.error('An error occurred while posting the comment');
              break;
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onPost();
    }
  };

  return (
    <Sheet {...props}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Progress Updates</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col gap-4 overflow-auto px-4 pb-4">
          <div className="flex h-full flex-col gap-8 overflow-auto">
            {comments === undefined ? (
              <div /> // TODO: Loading state
            ) : (
              comments.map((comment) => (
                <div className="flex flex-col gap-1" key={comment._id}>
                  <div className="flex items-center gap-2">
                    <UserLabel user={comment.user} />
                    <span className="font-semibold text-muted-foreground text-xs">
                      {formatDateTime(comment._creationTime)}
                    </span>
                  </div>
                  <span className="ml-8 text-muted-foreground text-sm">
                    {comment.content}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="flex h-fit flex-col items-end gap-2">
            <Textarea
              className="field-sizing-content max-h-40 min-h-20 resize-none py-1.75 pb-6"
              onKeyDown={handleKeyDown}
              placeholder="Add a progress update"
              ref={textAreaRef}
            />
            <LoadingButton
              className="w-fit"
              isLoading={isLoading}
              onClick={onPost}
              size="sm"
            >
              Post <CornerDownLeft />
            </LoadingButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
