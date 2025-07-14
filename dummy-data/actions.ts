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
  assignee: TeamMember;
  resource: string;
};

export const risks = ['green', 'amber', 'red', 'black'] as const;

export type ActionDueSummary = {
  total: number;
  overdue: number;
  soon: number;
};

export type ActionProgressSummary = {
  total: number;
  completed: number;
};

export type ActionsRowRisk = {
  type: 'risk';
  id: string;
  risk: (typeof risks)[number];
  progressSummary: ActionProgressSummary;
  dueSummary: ActionDueSummary;
  assignees: TeamMember[];
  subRows: ActionsRowAction[];
};

export type ActionsRowAssessment = {
  type: 'assessment';
  id: string;
  name: string;
  framework: string;
  date: Date;
  participants: TeamMember[];
  numParticipantsCompleted: number;
  progressSummary: ActionProgressSummary;
  dueSummary: ActionDueSummary;
  assignees: TeamMember[];
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
    name: 'Self-Assessment 2023',
    framework: 'Governance Framework',
    date: new Date('2023-12-31'),
    participants: teamMembers,
    numParticipantsCompleted: 3,
    progressSummary: {
      total: 4,
      completed: 1,
    },
    dueSummary: {
      total: 4,
      overdue: 1,
      soon: 2,
    },
    assignees: teamMembers,
    subRows: [
      {
        id: '1',
        type: 'risk',
        risk: 'green',
        progressSummary: {
          total: 2,
          completed: 1,
        },
        dueSummary: {
          total: 2,
          overdue: 1,
          soon: 0,
        },
        assignees: [teamMembers[0], teamMembers[1]],
        subRows: [
          {
            id: '1',
            type: 'action',
            text: 'Review financial policies',
            status: 'in-progress',
            dueDate: new Date('2023-11-15'),
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
      {
        id: '2',
        type: 'risk',
        risk: 'amber',
        progressSummary: {
          total: 2,
          completed: 0,
        },
        dueSummary: {
          total: 2,
          overdue: 0,
          soon: 1,
        },
        assignees: [teamMembers[2]],
        subRows: [
          {
            id: '3',
            type: 'action',
            text: 'Conduct board evaluation',
            status: 'completed',
            dueDate: new Date('2023-12-15'),
            assignee: teamMembers[2],
            resource: 'https://example.com/resource3',
          },
          {
            id: '4',
            type: 'action',
            text: 'Implement new compliance measures',
            status: 'blocked',
            dueDate: new Date('2024-01-05'),
            assignee: teamMembers[2],
            resource: 'https://example.com/resource4',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    type: 'assessment',
    name: 'Board Assessment 2024',
    framework: 'Board Effectiveness Framework',
    date: new Date('2024-01-15'),
    participants: teamMembers,
    numParticipantsCompleted: 2,
    progressSummary: {
      total: 4,
      completed: 1,
    },
    dueSummary: {
      total: 4,
      overdue: 0,
      soon: 2,
    },
    assignees: [teamMembers[3], teamMembers[4]],
    subRows: [
      {
        id: '3',
        type: 'risk',
        risk: 'red',
        progressSummary: {
          total: 2,
          completed: 0,
        },
        dueSummary: {
          total: 2,
          overdue: 0,
          soon: 1,
        },
        assignees: [teamMembers[3], teamMembers[4]],
        subRows: [
          {
            id: '5',
            type: 'action',
            text: 'Review board composition',
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
        id: '4',
        type: 'risk',
        risk: 'black',
        progressSummary: {
          total: 2,
          completed: 0,
        },
        dueSummary: {
          total: 2,
          overdue: 0,
          soon: 1,
        },
        assignees: [teamMembers[0]],
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
    ],
  },
];
