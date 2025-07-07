import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import PendingInvitesTable from './pending-invites-table';
import TeamMembersTable from './team-members-table';

export default function Organisation() {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      {/* Organisation Header */}
      <Card className="relative flex h-fit w-full items-end justify-end overflow-hidden rounded-md p-2 pb-4 shadow-none">
        <div
          className="absolute inset-0 bg-[url('/pattern-light.svg')] bg-primary stroke-current text-foreground dark:bg-[url('/pattern-dark.svg')]"
          style={{
            backgroundColor: 'var(--color-accent)',
            backgroundRepeat: 'repeat',
            backgroundSize: '100px',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
            maskRepeat: 'no-repeat',
            maskSize: '100% 100%',
          }}
        />
        <Table className="float-right w-fit border bg-background/60 dark:bg-background/40">
          <TableCaption className="whitespace-nowrap">
            Please contact us if you need to update any of the above
            information.
          </TableCaption>
          <TableBody className="[&_td]:pr-8 [&_th]:pr-8">
            <TableRow>
              <TableHead>Entity Name</TableHead>
              <TableCell>Acme Incorporated</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Entity Type </TableHead>
              <TableCell>Australian Private Company</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Organisation Identifier (ABN or ACN) </TableHead>
              <TableCell>32 617 116 677</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Turnover Range </TableHead>
              <TableCell>$0 - $50,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <h1 className="absolute bottom-4 left-6 font-extrabold text-4xl">
          Acme Incorporated
        </h1>
      </Card>
      <TeamMembersTable />
      <PendingInvitesTable />
    </div>
  );
}
