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
  id: string;
  text: string;
  status: (typeof actionStatuses)[number];
  dueDate: Date;
  assignee?: TeamMember;
  resource: string;
};

export type ActionsRowRisk = {
  type: 'risk';
  id: string;
  risk: Risk;
  subRows: ActionsRowAction[];
};

export type ActionsRowAssessment = {
  type: 'assessment';
  assessmentType: 'self' | 'board';
  id: string;
  name: string;
  framework: string;
  date: Date;
  participants: TeamMember[];
  numParticipantsCompleted: number;
  subRows: ActionsRowRisk[];
};

export type ActionsRow =
  | ActionsRowAssessment
  | ActionsRowRisk
  | ActionsRowAction;

export const assessmentActionsRows: ActionsRowAssessment[] = [
  {
    id: '1',
    type: 'assessment',
    assessmentType: 'self',
    name: 'Self-Assessment 2023',
    framework: 'Governance Framework',
    date: new Date('2023-12-31'),
    participants: teamMembers,
    numParticipantsCompleted: 3,
    subRows: [
      {
        id: '4',
        type: 'risk',
        risk: 'black',
        subRows: [
          {
            id: '7',
            type: 'action',
            text: 'Update board policies',
            status: 'in-progress',
            dueDate: new Date('2024-01-05'),
            assignee: teamMembers[0],
            resource: 'https://example.com/resource7',
          },
          {
            id: '8',
            type: 'action',
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
        risk: 'red',
        subRows: [
          {
            id: '5',
            type: 'action',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada lectus enim. Maecenas elit tellus, interdum nec magna in, mattis pretium tortor. Proin auctor accumsan leo at vulputate. Vivamus ultrices pharetra libero in dapibus. Duis maximus enim quis nulla auctor venenatis. Ut at risus ullamcorper magna lobortis placerat a ac eros. Duis consequat erat non imperdiet malesuada. Curabitur ornare euismod nibh eu pulvinar. Mauris eleifend, risus ac vulputate ultricies, lorem dui ullamcorper est, eget efficitur velit sem sit amet dolor. Ut malesuada sem nec tellus varius suscipit. Pellentesque et ullamcorper lorem.',
            status: 'not-started',
            dueDate: new Date('2024-01-10'),
            assignee: teamMembers[3],
            resource: 'https://example.com/resource5',
          },
          {
            id: '6',
            type: 'action',
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
        risk: 'amber',
        subRows: [
          {
            id: '3',
            type: 'action',
            text: 'Conduct board evaluation',
            status: 'completed',
            dueDate: new Date(),
            assignee: teamMembers[2],
            resource: 'https://example.com/resource3',
          },
          {
            id: '4',
            type: 'action',
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
        risk: 'green',
        subRows: [
          {
            id: '1',
            type: 'action',
            text: 'Review financial policies',
            status: 'in-progress',
            dueDate: new Date('2025-11-15'),
            // assignee: teamMembers[0],
            resource: 'https://example.com/resource1',
          },
          {
            id: '2',
            type: 'action',
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
    id: '2',
    type: 'assessment',
    assessmentType: 'board',
    name: 'Board Assessment 2024',
    framework: 'Board Effectiveness Framework',
    date: new Date('2024-01-15'),
    participants: teamMembers,
    numParticipantsCompleted: 2,
    subRows: [
      {
        id: '4',
        type: 'risk',
        risk: 'black',
        subRows: [
          {
            id: '7',
            type: 'action',
            text: 'Update board policies',
            status: 'in-progress',
            dueDate: new Date('2024-01-05'),
            assignee: teamMembers[0],
            resource: 'https://example.com/resource7',
          },
          {
            id: '8',
            type: 'action',
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
        risk: 'red',
        subRows: [
          {
            id: '5',
            type: 'action',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada lectus enim. Maecenas elit tellus, interdum nec magna in, mattis pretium tortor. Proin auctor accumsan leo at vulputate. Vivamus ultrices pharetra libero in dapibus. Duis maximus enim quis nulla auctor venenatis. Ut at risus ullamcorper magna lobortis placerat a ac eros. Duis consequat erat non imperdiet malesuada. Curabitur ornare euismod nibh eu pulvinar. Mauris eleifend, risus ac vulputate ultricies, lorem dui ullamcorper est, eget efficitur velit sem sit amet dolor. Ut malesuada sem nec tellus varius suscipit. Pellentesque et ullamcorper lorem.',
            status: 'not-started',
            dueDate: new Date('2024-01-10'),
            assignee: teamMembers[3],
            resource: 'https://example.com/resource5',
          },
          {
            id: '6',
            type: 'action',
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
        risk: 'amber',
        subRows: [
          {
            id: '3',
            type: 'action',
            text: 'Conduct board evaluation',
            status: 'completed',
            dueDate: new Date(),
            assignee: teamMembers[2],
            resource: 'https://example.com/resource3',
          },
          {
            id: '4',
            type: 'action',
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
        risk: 'green',
        subRows: [
          {
            id: '1',
            type: 'action',
            text: 'Review financial policies',
            status: 'in-progress',
            dueDate: new Date('2025-11-15'),
            assignee: teamMembers[0],
            resource: 'https://example.com/resource1',
          },
          {
            id: '2',
            type: 'action',
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
