import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
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

type Invite = {
  email: string;
  role: string;
  permission: 'admin' | 'member';
};

const pendingInvites: Invite[] = [
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

export default function PendingInvitesTable() {
  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex items-center gap-2 px-3 py-2">
        <h2 className="font-medium text-base">Pending invites</h2>
        <Badge className="rounded-sm px-1.5" variant="blue">
          {pendingInvites.length}
        </Badge>
      </div>
      <Table className="border-t [&_td]:px-3 [&_th]:px-3 [&_tr]:even:bg-accent/50 [&_tr]:hover:bg-accent">
        <TableHeader>
          <TableRow className="bg-accent">
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Permission</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingInvites.map((invite) => (
            <TableRow key={invite.email}>
              <TableCell>{invite.email}</TableCell>
              <TableCell>
                <Badge variant="outline">{invite.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={invite.permission} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="float-right mr-4 size-7"
                      size="icon"
                      variant="outline"
                    >
                      <HugeiconsIcon icon={MoreHorizontalIcon} />
                    </Button>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
