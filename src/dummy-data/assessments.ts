import type { Status } from './status';
import { type TeamMember, teamMembers } from './team';

export const assessmentStatuses = [
  'not-started',
  'in-progress',
  'completed',
  'closed',
] as const;

export type UserAssessment = {
  user: TeamMember;
  status: 'not-started' | 'in-progress' | 'completed';
};

export type Assessment = {
  id: string;
  type: 'self' | 'board';
  name: string;
  status: Status;
  framework: string;
  dueDate: Date;
  userAssessments: UserAssessment[];
};

export const assessments: Assessment[] = [
  {
    id: '0',
    type: 'self',
    name: 'Self-Assessment 2023',
    status: 'in-progress',
    framework: 'Governance Framework',
    dueDate: new Date('2023-12-31'),
    userAssessments: [
      {
        user: teamMembers[0],
        status: 'in-progress',
      },
      {
        user: teamMembers[1],
        status: 'not-started',
      },
      {
        user: teamMembers[2],
        status: 'completed',
      },
    ],
  },
  {
    id: '1',
    type: 'board',
    name: 'Board Assessment 2023',
    status: 'not-started',
    framework: 'Board Effectiveness Framework',
    dueDate: new Date('2024-01-15'),
    userAssessments: [
      {
        user: teamMembers[0],
        status: 'not-started',
      },
      {
        user: teamMembers[1],
        status: 'not-started',
      },
      {
        user: teamMembers[2],
        status: 'not-started',
      },
      {
        user: teamMembers[3],
        status: 'not-started',
      },
      {
        user: teamMembers[4],
        status: 'not-started',
      },
    ],
  },
  {
    id: '2',
    type: 'self',
    name: 'Self-Assessment 2024',
    status: 'closed',
    framework: 'Governance Framework',
    dueDate: new Date('2024-12-31'),
    userAssessments: [
      {
        user: teamMembers[0],
        status: 'not-started',
      },
      {
        user: teamMembers[1],
        status: 'not-started',
      },
      {
        user: teamMembers[2],
        status: 'not-started',
      },
    ],
  },
  {
    id: '3',
    type: 'board',
    name: 'Board Assessment 2024',
    status: 'completed',
    framework: 'Board Effectiveness Framework',
    dueDate: new Date('2025-01-15'),
    userAssessments: [
      {
        user: teamMembers[0],
        status: 'completed',
      },
      {
        user: teamMembers[1],
        status: 'completed',
      },
    ],
  },
];
