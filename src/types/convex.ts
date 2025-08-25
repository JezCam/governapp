import type { api } from '../../convex/_generated/api';
import type { DataModel } from '../../convex/_generated/dataModel';

// Users domain

export type User = DataModel['users']['document'];

// Organisations domain

export type Organisation = DataModel['organisations']['document'];
export type OrganisationType = DataModel['organisations']['document']['type'];
export type OrganisationTurnoverRange =
  DataModel['organisations']['document']['turnoverRange'];
export type Membership = DataModel['memberships']['document'];
export type Invitation = DataModel['invitations']['document'];
export type Subscription = DataModel['subscriptions']['document'];

// Frameworks domain

export type Framework = DataModel['frameworks']['document'];
export type Domain = DataModel['domains']['document'];
export type Section = DataModel['sections']['document'];
export type Question = DataModel['questions']['document'];
export type ResponseOption = DataModel['responseOptions']['document'];

export type QuestionFormQuestion = Awaited<
  typeof api.services.assessments.getByUserAssessmentId._returnType
>['framework']['domains'][number]['sections'][number]['questions'][number];

// Assessments domain

export type Assessment = DataModel['assessments']['document'];
export type UserAssessment = DataModel['userAssessments']['document'];
export type UserAssessmentWithUser = UserAssessment & {
  user: User;
};
export type AssessmentTableRow = Awaited<
  typeof api.services.assessments.listForActiveOrganisation._returnType
>[number];
