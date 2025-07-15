export const risks = ['green', 'amber', 'red', 'black'] as const;

export type Risk = (typeof risks)[number];
