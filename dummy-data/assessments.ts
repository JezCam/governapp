import type { Status } from './status';
import type { TeamMember } from './team';

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
  type: 'self' | 'board';
  name: string;
  status: Status;
  framework: string;
  dueDate: Date;
  userAssessments: UserAssessment[];
};

export const assessments: Assessment[] = [
  {
    type: 'self',
    name: 'Self-Assessment 2023',
    status: 'in-progress',
    framework: 'Governance Framework',
    dueDate: new Date('2023-12-31'),
    userAssessments: [
      {
        user: {
          userId: 0,
          name: 'Jeremy Cameron',
          email: 'jeremy@cameron.org.au',
          role: 'Chief Executive Officer',
          permission: 'admin',
          imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
        },
        status: 'in-progress',
      },
      {
        user: {
          userId: 1,
          name: 'Alice Johnson',
          email: 'alice@johnson.com',
          role: 'Chief Financial Officer',
          permission: 'member',
          imageUrl: 'https://i.pravatar.cc/150?img=2',
        },
        status: 'not-started',
      },
      {
        user: {
          userId: 2,
          name: 'Bob Smith',
          email: 'bob@smith.com',
          role: 'Chair',
          permission: 'member',
          imageUrl: 'https://i.pravatar.cc/150?img=3',
        },
        status: 'completed',
      },
    ],
  },
  {
    type: 'board',
    name: 'Board Assessment 2023',
    status: 'not-started',
    framework: 'Board Effectiveness Framework',
    dueDate: new Date('2024-01-15'),
    userAssessments: [
      {
        user: {
          userId: 0,
          name: 'Jeremy Cameron',
          email: 'jeremy@cameron.com',
          role: 'Chief Executive Officer',
          permission: 'admin',
          imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
        },
        status: 'not-started',
      },
      {
        user: {
          userId: 1,
          name: 'Alice Johnson',
          email: 'alice@johnson.com',
          role: 'Chief Financial Officer',
          permission: 'member',
          imageUrl: 'https://i.pravatar.cc/150?img=2',
        },
        status: 'not-started',
      },
      {
        user: {
          userId: 2,
          name: 'Bob Smith',
          email: 'bob@smith.com',
          role: 'Chair',
          permission: 'member',
          imageUrl: 'https://i.pravatar.cc/150?img=3',
        },
        status: 'not-started',
      },
      {
        user: {
          userId: 3,
          name: 'Charlie Brown',
          email: 'charlie@brown.com',
          role: 'Treasurer',
          permission: 'member',
          imageUrl: 'https://i.pravatar.cc/150?img=4',
        },
        status: 'not-started',
      },
      {
        user: {
          userId: 4,
          name: 'Diana Prince',
          email: 'diana@prince.com',
          role: 'Vice Chair',
          permission: 'member',
          imageUrl: 'https://i.pravatar.cc/150?img=5',
        },
        status: 'not-started',
      },
    ],
  },
  {
    type: 'self',
    name: 'Self-Assessment 2024',
    status: 'closed',
    framework: 'Governance Framework',
    dueDate: new Date('2024-12-31'),
    userAssessments: [
      {
        user: {
          userId: 0,
          name: 'Jeremy Cameron',
          email: 'jeremy@cameron.org.au',
          role: 'Chief Executive Officer',
          permission: 'admin',
          imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
        },
        status: 'not-started',
      },
      {
        user: {
          userId: 1,
          name: 'Alice Johnson',
          email: 'alice@johnson.com',
          role: 'Chief Financial Officer',
          permission: 'member',
          imageUrl: 'https://i.pravatar.cc/150?img=2',
        },
        status: 'not-started',
      },
      {
        user: {
          userId: 2,
          name: 'Bob Smith',
          email: 'bob@smith.com',
          role: 'Chair',
          permission: 'member',
          imageUrl: 'https://i.pravatar.cc/150?img=3',
        },
        status: 'not-started',
      },
    ],
  },
  {
    type: 'board',
    name: 'Board Assessment 2024',
    status: 'completed',
    framework: 'Board Effectiveness Framework',
    dueDate: new Date('2025-01-15'),
    userAssessments: [
      {
        user: {
          userId: 0,
          name: 'Jeremy Cameron',
          email: 'jeremy@cameron.org.au',
          role: 'Chief Executive Officer',
          permission: 'admin',
          imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
        },
        status: 'completed',
      },
      {
        user: {
          userId: 1,
          name: 'Alice Johnson',
          email: 'alice@johnson.com',
          role: 'Chief Financial Officer',
          permission: 'member',
          imageUrl: 'https://i.pravatar.cc/150?img=2',
        },
        status: 'completed',
      },
    ],
  },
];
