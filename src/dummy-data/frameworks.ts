export type Framework = {
  name: string;
  type: 'self' | 'board';
  authority: string;
  monthlyCost: number;
};

export const frameworks: Framework[] = [
  {
    name: 'Governance Framework',
    type: 'self',
    authority: 'GovernApp',
    monthlyCost: 100,
  },
  {
    name: 'Board Effectiveness Framework',
    type: 'board',
    authority: 'GovernApp',
    monthlyCost: 150,
  },
];
