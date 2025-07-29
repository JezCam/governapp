import { actionStatuses } from './actions';
import { assessmentStatuses } from './assessments';

export const statuses = [...assessmentStatuses, ...actionStatuses] as const;

export type Status = (typeof statuses)[number];
