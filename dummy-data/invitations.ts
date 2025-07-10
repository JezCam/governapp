export type Invitation = {
  email: string;
  role: string;
  permission: 'admin' | 'member';
};

export const pendingInvitations: Invitation[] = [
  {
    email: 'john@example.com',
    role: 'Board Member',
    permission: 'member',
  },
  {
    email: 'jill@example.com',
    role: 'Board Member',
    permission: 'member',
  },
];
