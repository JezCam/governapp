import { createDataTableContext } from '@/components/data-table';
import type { Invitation } from '@/dummy-data/invitations';
import type { TeamMember } from '@/dummy-data/team';

export const invitationDataTableContext = createDataTableContext<Invitation>();
export const teamMemberDataTableContext = createDataTableContext<TeamMember>();
