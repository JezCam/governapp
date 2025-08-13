import type { DataModel } from '../../convex/_generated/dataModel';

export type User = DataModel['users']['document'];

export type Membership = DataModel['memberships']['document'];

export type Organisation = DataModel['organisations']['document'];

export type OrganisationType = DataModel['organisations']['document']['type'];
export type OrganisationTurnoverRange =
  DataModel['organisations']['document']['turnoverRange'];

export type Invitation = DataModel['invitations']['document'];
