import z from 'zod';

export const organisationTypes = [
  'Australian Public Company Limited by guarantee',
  'Incorporated Association',
  'Australian Private Company',
  'Other',
] as const;

export const organisationTurnoverRanges = [
  '$0 - $50,000',
  '$50,001 - $250,000',
  '$250,001 - $1m',
  '$1m - $10m',
  '$10m - $100m',
  '$100m+',
] as const;

export const roles = [
  'Audit Committee Member',
  'Board Member',
  'Chair',
  'Chief Executive Officer',
  'Compensation Committee Member',
  'Director',
  'Governance Committee Member',
  'Nomination Committee Member',
  'President',
  'Secretary',
  'Treasurer',
  'Vice Chair',
];

const acnSchema = z
  .string()
  .transform((val) => val.replace(/\s+/g, ''))
  .pipe(
    z
      .string()
      .min(1, 'Please enter your ABN or ACN')
      .regex(/^\d{9}$/, 'ABN or ACN must be 9 or 11 digits')
  );

const abnSchema = z
  .string()
  .transform((val) => val.replace(/\s+/g, ''))
  .pipe(z.string().regex(/^\d{11}$/, 'ABN or ACN must be 9 or 11 digits'));

const abnOrAcnSchema = z.union([acnSchema, abnSchema]);

const organisationTurnoverRangeSchema = z.enum(organisationTurnoverRanges);

const organisationTypeSchema = z.enum(organisationTypes);

export {
  abnOrAcnSchema,
  organisationTurnoverRangeSchema,
  organisationTypeSchema,
};
