export type TeamMember = {
  userId: string;
  name: string;
  email: string;
  role: string;
  permission: 'admin' | 'member';
  imageUrl: string;
};

export const teamMembers: TeamMember[] = [
  {
    userId: '0',
    name: 'Jeremy Cameron',
    email: 'jeremy@cameron.org.au',
    role: 'Chief Executive Officer',
    permission: 'admin',
    imageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
  },
  {
    userId: '1',
    name: 'Alice Johnson',
    email: 'alice.j@acme.inc',
    role: 'Chief Executive Officer',
    permission: 'admin',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    userId: '2',
    name: 'Bob Smith',
    email: 'bobrocks@gmail.com',
    role: 'Chair',
    permission: 'member',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    userId: '3',
    name: 'Charlie Brown',
    email: 'charliethekid@email.com',
    role: 'Treasurer',
    permission: 'member',
    imageUrl: 'https://i.pravatar.cc/150?img=4',
  },
  {
    userId: '4',
    name: 'Diana Prince',
    email: 'dianatheprince@gmail.com',
    role: 'Vice Chair',
    permission: 'member',
    imageUrl: 'https://i.pravatar.cc/150?img=5',
  },
];
