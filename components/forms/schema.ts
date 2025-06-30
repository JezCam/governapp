import z from 'zod';

export const organisationTypes = [
  'Australian Public Company Limited by guarantee',
  'Incorporated Association',
  'Australian Private Company',
  'Other',
] as const;

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

const organisationTypeSchema = z.enum(organisationTypes);

export { abnOrAcnSchema, organisationTypeSchema };
