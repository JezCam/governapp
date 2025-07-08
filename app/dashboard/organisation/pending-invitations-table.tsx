import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import InvitationDropdownContent from '@/components/invitation-dropdown-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

type Invitation = {
  email: string;
  role: string;
  permission: 'admin' | 'member';
};

const pendingInvitations: Invitation[] = [
  {
    email: 'john@example.com',
    role: 'Board Member',
    permission: 'member',
  },
  {
    email: 'jill@example.com',
    role: 'Board Member',
    permission: 'member',
  },
];

export default function PendingInvitationsTable() {
  return (
    <div className="overflow-hidden rounded-xl border bg-accent">
      <div className="flex items-center gap-2 border-b bg-background px-3 py-4">
        <h2 className="font-medium text-base">Pending invites</h2>
        <Badge className="rounded-sm px-1.5" variant="blue">
          {pendingInvitations.length}
        </Badge>
      </div>
      <div className="px-2 pb-2">
        <Table className="border-separate border-spacing-0">
          <TableHeader>
            <TableRow className="border-none [&>th]:border-l [&>th]:px-3 [&>th]:first:border-l-0 [&>th]:last:border-l-0">
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Permission</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingInvitations.map((invitation) => (
              <TableRow
                className={cn(
                  'group border-none [&>td]:bg-background [&>td]:px-3 [&>td]:last:border-l-0 [&>td]:group-hover:bg-blue-50 dark:[&>td]:group-hover:bg-blue-950/50',
                  // Table Cell Borders
                  '[&>td]:[border-width:_0_0_1px_1px] [&>td]:not-first:[border-left-style:_dashed] [&>td]:last:border-r',
                  // First Row
                  'first:[&>td]:border-t',
                  // Top Left
                  'first:[&>td]:first:rounded-tl-md first:[&>td]:first:border-solid first:[&>td]:first:[border-width:_1px_0_1px_1px]',
                  // Top Right
                  'first:[&>td]:last:rounded-tr-md first:[&>td]:last:border-solid first:[&>td]:last:[border-width:_1px_1px_1px_0]',
                  // Bottom Left
                  'last:[&>td]:first:rounded-bl-md last:[&>td]:first:border-solid last:[&>td]:first:[border-width:_0_0_1px_1px]',
                  // Bottom Right
                  'last:[&>td]:last:rounded-br-md last:[&>td]:last:border-solid last:[&>td]:last:[border-width:_0_1px_1px_0]'
                )}
                key={invitation.email}
              >
                <TableCell>{invitation.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{invitation.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={invitation.permission} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="float-right size-7"
                        size="icon"
                        variant="outline"
                      >
                        <HugeiconsIcon icon={MoreHorizontalIcon} />
                      </Button>
                    </DropdownMenuTrigger>
                    <InvitationDropdownContent invitation={invitation} />
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
