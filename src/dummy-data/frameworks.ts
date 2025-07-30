export type Framework = {
  name: string;
  type: 'self' | 'board';
  authority: string;
  monthlyCost: number;
  subscribedOn: Date;
};

export const frameworks: Framework[] = [
  {
    name: 'Governance Framework',
    type: 'self',
    authority: 'GovernApp',
    monthlyCost: 100,
    subscribedOn: new Date('2023-01-01'),
  },
  {
    name: 'Board Effectiveness Framework',
    type: 'board',
    authority: 'GovernApp',
    monthlyCost: 150,
    subscribedOn: new Date('2023-02-01'),
  },
];
