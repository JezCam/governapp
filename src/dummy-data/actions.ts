import { type Assessment, assessments } from './assessments';
import type { Risk } from './risk';
import { type TeamMember, teamMembers } from './team';

export const actionStatuses = [
  'not-started',
  'in-progress',
  'completed',
  'blocked',
] as const;

export type ActionsRowAction = {
  type: 'action';
  assessmentId: string;
  id: string;
  text: string;
  status: (typeof actionStatuses)[number];
  dueDate: Date;
  assignee?: TeamMember;
  resource: string;
};

export type ActionsRowRisk = {
  type: 'risk';
  assessmentId: string;
  id: string;
  risk: Risk;
  subRows: ActionsRowAction[];
};

export type ActionsRowAssessment = {
  type: 'assessment';
  assessment: Assessment;
  subRows: ActionsRowRisk[];
};

export type ActionsRow =
  | ActionsRowAssessment
  | ActionsRowRisk
  | ActionsRowAction;

export const assessmentActionsRows: ActionsRowAssessment[] = [
  {
    type: 'assessment',
    assessment: assessments[2],
    subRows: [
      {
        id: '4',
        type: 'risk',
        assessmentId: assessments[2].id,
        risk: 'black',
        subRows: [
          {
            id: '7',
            type: 'action',
            assessmentId: assessments[2].id,
            text: 'Update board policies',
            status: 'in-progress',
            dueDate: new Date('2024-01-05'),
            assignee: teamMembers[0],
            resource: 'https://example.com/resource7',
          },
          {
            id: '8',
            type: 'action',
            assessmentId: assessments[2].id,
            text: 'Conduct board training',
            status: 'not-started',
            dueDate: new Date('2024-01-25'),
            assignee: teamMembers[0],
            resource: 'https://example.com/resource8',
          },
        ],
      },
      {
        id: '3',
        type: 'risk',
        assessmentId: assessments[2].id,
        risk: 'red',
        subRows: [
          {
            id: '5',
            type: 'action',
            assessmentId: assessments[2].id,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada lectus enim. Maecenas elit tellus, interdum nec magna in, mattis pretium tortor. Proin auctor accumsan leo at vulputate. Vivamus ultrices pharetra libero in dapibus. Duis maximus enim quis nulla auctor venenatis. Ut at risus ullamcorper magna lobortis placerat a ac eros. Duis consequat erat non imperdiet malesuada. Curabitur ornare euismod nibh eu pulvinar. Mauris eleifend, risus ac vulputate ultricies, lorem dui ullamcorper est, eget efficitur velit sem sit amet dolor. Ut malesuada sem nec tellus varius suscipit. Pellentesque et ullamcorper lorem.',
            status: 'not-started',
            dueDate: new Date('2024-01-10'),
            assignee: teamMembers[3],
            resource: 'https://example.com/resource5',
          },
          {
            id: '6',
            type: 'action',
            assessmentId: assessments[2].id,
            text: 'Assess board performance',
            status: 'not-started',
            dueDate: new Date('2024-01-20'),
            assignee: teamMembers[4],
            resource: 'https://example.com/resource6',
          },
        ],
      },
      {
        id: '2',
        type: 'risk',
        assessmentId: assessments[2].id,
        risk: 'amber',
        subRows: [
          {
            id: '3',
            type: 'action',
            assessmentId: assessments[2].id,
            text: 'Conduct board evaluation',
            status: 'completed',
            dueDate: new Date(),
            assignee: teamMembers[2],
            resource: 'https://example.com/resource3',
          },
          {
            id: '4',
            type: 'action',
            assessmentId: assessments[2].id,
            text: 'Implement new compliance measures',
            status: 'blocked',
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from today
            assignee: teamMembers[2],
            resource: 'https://example.com/resource4',
          },
        ],
      },
      {
        id: '1',
        type: 'risk',
        assessmentId: assessments[2].id,
        risk: 'green',
        subRows: [
          {
            id: '1',
            type: 'action',
            assessmentId: assessments[2].id,
            text: 'Review financial policies',
            status: 'in-progress',
            dueDate: new Date('2025-11-15'),
            // assignee: teamMembers[0],
            resource: 'https://example.com/resource1',
          },
          {
            id: '2',
            type: 'action',
            assessmentId: assessments[2].id,
            text: 'Update risk management plan',
            status: 'not-started',
            dueDate: new Date('2023-12-01'),
            resource: 'https://example.com/resource2',
          },
        ],
      },
    ],
  },
  {
    type: 'assessment',
    assessment: assessments[3],
    subRows: [
      {
        id: '4',
        type: 'risk',
        assessmentId: assessments[3].id,
        risk: 'black',
        subRows: [
          {
            id: '7',
            type: 'action',
            assessmentId: assessments[3].id,
            text: 'Update board policies',
            status: 'in-progress',
            dueDate: new Date('2024-01-05'),
            assignee: teamMembers[0],
            resource: 'https://example.com/resource7',
          },
          {
            id: '8',
            type: 'action',
            assessmentId: assessments[3].id,
            text: 'Conduct board training',
            status: 'not-started',
            dueDate: new Date('2024-01-25'),
            assignee: teamMembers[0],
            resource: 'https://example.com/resource8',
          },
        ],
      },
      {
        id: '3',
        type: 'risk',
        assessmentId: assessments[3].id,
        risk: 'red',
        subRows: [
          {
            id: '5',
            type: 'action',
            assessmentId: assessments[3].id,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada lectus enim. Maecenas elit tellus, interdum nec magna in, mattis pretium tortor. Proin auctor accumsan leo at vulputate. Vivamus ultrices pharetra libero in dapibus. Duis maximus enim quis nulla auctor venenatis. Ut at risus ullamcorper magna lobortis placerat a ac eros. Duis consequat erat non imperdiet malesuada. Curabitur ornare euismod nibh eu pulvinar. Mauris eleifend, risus ac vulputate ultricies, lorem dui ullamcorper est, eget efficitur velit sem sit amet dolor. Ut malesuada sem nec tellus varius suscipit. Pellentesque et ullamcorper lorem.',
            status: 'not-started',
            dueDate: new Date('2024-01-10'),
            assignee: teamMembers[3],
            resource: 'https://example.com/resource5',
          },
          {
            id: '6',
            type: 'action',
            assessmentId: assessments[3].id,
            text: 'Assess board performance',
            status: 'not-started',
            dueDate: new Date('2024-01-20'),
            assignee: teamMembers[4],
            resource: 'https://example.com/resource6',
          },
        ],
      },
      {
        id: '2',
        type: 'risk',
        assessmentId: assessments[3].id,
        risk: 'amber',
        subRows: [
          {
            id: '3',
            type: 'action',
            assessmentId: assessments[3].id,
            text: 'Conduct board evaluation',
            status: 'completed',
            dueDate: new Date(),
            assignee: teamMembers[2],
            resource: 'https://example.com/resource3',
          },
          {
            id: '4',
            type: 'action',
            assessmentId: assessments[3].id,
            text: 'Implement new compliance measures',
            status: 'blocked',
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from today
            assignee: teamMembers[2],
            resource: 'https://example.com/resource4',
          },
        ],
      },
      {
        id: '1',
        type: 'risk',
        assessmentId: assessments[3].id,
        risk: 'green',
        subRows: [
          {
            id: '1',
            type: 'action',
            assessmentId: assessments[3].id,
            text: 'Review financial policies',
            status: 'in-progress',
            dueDate: new Date('2025-11-15'),
            assignee: teamMembers[0],
            resource: 'https://example.com/resource1',
          },
          {
            id: '2',
            type: 'action',
            assessmentId: assessments[3].id,
            text: 'Update risk management plan',
            status: 'not-started',
            dueDate: new Date('2023-12-01'),
            assignee: teamMembers[1],
            resource: 'https://example.com/resource2',
          },
        ],
      },
    ],
  },
];
