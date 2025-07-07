import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons-pro/core-stroke-rounded';
import TeamMemberDropdownContent from '@/components/team-member-dropdown-content';
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
import UserAvatar from '@/components/user-avatar';

type TeamMember = {
  userId: number;
  name: string;
  email: string;
  role: string;
  permission: 'admin' | 'member';
  imageUrl: string;
};

const teamMembers: TeamMember[] = [
  {
    userId: 0,
    name: 'Jeremy Cameron',
    email: 'jeremy@cameron.org.au',
    role: 'Chief Executive Officer',
    permission: 'admin',
    imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
  },
  {
    userId: 1,
    name: 'Alice Johnson',
    email: 'alice.j@acme.inc',
    role: 'Chief Executive Officer',
    permission: 'admin',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    userId: 2,
    name: 'Bob Smith',
    email: 'bobrocks@gmail.com',
    role: 'Chair',
    permission: 'member',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    userId: 3,
    name: 'Charlie Brown',
    email: 'charliethekid@email.com',
    role: 'Treasurer',
    permission: 'member',
    imageUrl: 'https://i.pravatar.cc/150?img=4',
  },
  {
    userId: 4,
    name: 'Diana Prince',
    email: 'dianatheprince@gmail.com',
    role: 'Vice Chair',
    permission: 'member',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
];

export default function TeamMembersTable() {
  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex items-center gap-2 px-3 py-4">
        <h2 className="font-medium text-base">Team Members</h2>
        <Badge className="rounded-sm px-1.5" variant="blue">
          {teamMembers.length}
        </Badge>
      </div>
      <Table className="border-t [&_td]:px-3 [&_th]:px-3 [&_tr]:even:bg-accent/50 [&_tr]:hover:bg-accent">
        <TableHeader>
          <TableRow className="bg-accent">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Permission</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow key={member.userId}>
              <TableCell className="flex items-center gap-2.5">
                <UserAvatar user={member} />
                {member.name}
              </TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <Badge variant="outline">{member.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={member.permission} />
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
                  <TeamMemberDropdownContent user={member} />
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
