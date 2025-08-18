import { ConvexError } from 'convex/values';
import { XMLParser } from 'fast-xml-parser';
import type { Id } from '../_generated/dataModel';
import type { MutationCtx, QueryCtx } from '../_generated/server';
import { type turnoverRanges, types } from '../schemas/organisationSchemas';
import { getMembershipByUserIdAndOrganisationId } from './memberships';
import { getCurrentUser } from './users';

export async function getActiveOrganisationId(ctx: QueryCtx | MutationCtx) {
  const user = await getCurrentUser(ctx);
  if (!user) {
    throw new ConvexError('not_authenticated');
  }
  const activeOrganisationId = user.activeOrganisationId;
  if (!activeOrganisationId) {
    throw new ConvexError('no_active_organisation');
  }
  return activeOrganisationId;
}

export async function getActiveOrganisation(ctx: QueryCtx | MutationCtx) {
  const activeOrganisationId = await getActiveOrganisationId(ctx);
  const organisation = await ctx.db.get(activeOrganisationId);
  if (!organisation) {
    throw new ConvexError('active_organisation_not_found');
  }
  return organisation;
}

export async function getOrganisationById(
  ctx: QueryCtx | MutationCtx,
  organisationId: Id<'organisations'>
) {
  const organisation = await ctx.db.get(organisationId);
  if (!organisation) {
    throw new ConvexError('organisation_not_found');
  }
  return organisation;
}

export async function updateOrganisationById(
  ctx: MutationCtx,
  organisationId: Id<'organisations'>,
  updates: Partial<{
    imageUrl: string;
  }>
) {
  await ctx.db.patch(organisationId, updates);
}

export async function isUserAdminOfOrganisation(
  ctx: QueryCtx | MutationCtx,
  userId: Id<'users'>,
  organisationId: Id<'organisations'>
) {
  const membership = await getMembershipByUserIdAndOrganisationId(
    ctx,
    userId,
    organisationId
  );

  return membership.isAdmin;
}

export async function createOrganisationAndMembership(
  ctx: MutationCtx,
  data: {
    createdByUserId: Id<'users'>;
    abnOrAcn: string;
    name: string;
    type: (typeof types)[number];
    turnoverRange: (typeof turnoverRanges)[number];
    role: string;
  }
) {
  const organisationId = await ctx.db.insert('organisations', {
    createdByUserId: data.createdByUserId,
    name: data.name,
    type: data.type,
    turnoverRange: data.turnoverRange,
    abnOrAcn: data.abnOrAcn,
  });

  await ctx.db.insert('memberships', {
    organisationId,
    userId: data.createdByUserId,
    role: data.role,
    isAdmin: true,
  });

  await ctx.db.patch(data.createdByUserId, {
    activeOrganisationId: organisationId,
  });

  return organisationId;
}

export async function AbrSeachByAbnOrAcn(abnOrAcn: string, isAbn: boolean) {
  const url = isAbn
    ? `https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx/ABRSearchByABN
            ?searchString=${abnOrAcn}&includeHistoricalDetails=N&authenticationGuid=${process.env.ABRXML_KEY}`
    : `https://abr.business.gov.au/ABRXMLSearch/AbrXmlSearch.asmx/ABRSearchByASIC
            ?searchString=${abnOrAcn}&includeHistoricalDetails=N&authenticationGuid=${process.env.ABRXML_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch organisation details');
  }

  const xml = await response.text();

  // Parse the XML reponse into a DOM
  const parser = new XMLParser();
  const doc = parser.parse(xml);

  // Check for error
  const error =
    doc.ABRPayloadSearchResults.response.exception?.exceptionDescription;
  if (error) {
    throw new Error('ABN or ACN not found');
  }

  const businessEntity = doc.ABRPayloadSearchResults.response.businessEntity;

  // Get the entity name
  let entityName = '';

  if (businessEntity.mainName) {
    entityName = businessEntity.mainName.organisationName;
  } else if (businessEntity.legalName) {
    const givenName = businessEntity.legalName.givenName;
    const otherGivenName = businessEntity.legalName.otherGivenName;
    const familyName = businessEntity.legalName.familyName;
    entityName = `${familyName}, ${givenName}${otherGivenName ? ` ${otherGivenName}` : ''}`;
  }

  // Get the entity type
  const type = businessEntity.entityType.entityDescription;

  return { name: entityName, type: types.find((t) => t === type) || 'Other' };
}
