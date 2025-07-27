import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import PendingInvitationsTable from "./pending-invitations-table";
import TeamMembersTable from "./team-members-table";

export default function Organisation() {
  return (
    <div className="flex h-fit flex-col gap-4 overflow-auto p-4">
      {/* Organisation Header */}
      <Card className="relative flex h-fit w-full shrink-0 items-end justify-end overflow-hidden rounded-xl p-2 pb-4 shadow-none">
        <div
          className="absolute inset-0 bg-[url('/pattern-light.svg')] bg-primary stroke-current text-foreground dark:bg-[url('/pattern-dark.svg')]"
          style={{
            backgroundColor: "var(--color-accent)",
            backgroundRepeat: "repeat",
            backgroundSize: "100px",
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
          }}
        />
        <Table className="float-right w-fit border-separate border-spacing-0 ">
          <TableCaption className="whitespace-nowrap">
            Please contact us if you need to update any of the above
            information.
          </TableCaption>
          <TableBody className="[&_td]:pr-8 [&_th]:pr-8">
            <TableRow className="border-b">
              <TableHead className="rounded-tl-md border border-r-0 bg-accent/70">
                Entity Name
              </TableHead>
              <TableCell className="rounded-tr-md border bg-background/60 dark:bg-background/40">
                Acme Incorporated
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="border-b border-l bg-accent/70">
                Entity Type
              </TableHead>
              <TableCell className="border border-t-0 bg-background/60 dark:bg-background/40">
                Australian Private Company
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="border-b border-l bg-accent/70">
                Organisation Identifier (ABN or ACN)
              </TableHead>
              <TableCell className="border border-t-0 bg-background/60 dark:bg-background/40">
                32 617 116 677
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="rounded-bl-md border-b border-l bg-accent/70">
                Turnover Range
              </TableHead>
              <TableCell className="rounded-br-md border border-t-0 bg-background/60 dark:bg-background/40">
                $0 - $50,000
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <h1 className="absolute bottom-4 left-6 font-extrabold text-4xl">
          Acme Incorporated
        </h1>
      </Card>
      <TeamMembersTable />
      <PendingInvitationsTable />
    </div>
  );
}
