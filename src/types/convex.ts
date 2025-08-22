import type { api } from '../../convex/_generated/api';
import type { DataModel } from '../../convex/_generated/dataModel';

export type User = DataModel['users']['document'];

export type Membership = DataModel['memberships']['document'];

export type Organisation = DataModel['organisations']['document'];

export type OrganisationType = DataModel['organisations']['document']['type'];
export type OrganisationTurnoverRange =
  DataModel['organisations']['document']['turnoverRange'];

export type Invitation = DataModel['invitations']['document'];

export type Subscription = DataModel['subscriptions']['document'];

export type Framework = DataModel['frameworks']['document'];

export type Domain = DataModel['domains']['document'];

export type Assessment = DataModel['assessments']['document'];

export type UserAssessment = DataModel['userAssessments']['document'];

export type UserAssessmentWithUser = UserAssessment & {
  user: User;
};

export type AssessmentTableRow = Awaited<
  typeof api.services.assessments.listForActiveOrganisation._returnType
>[number];
