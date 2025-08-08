import { render } from '@react-email/components';
import { ConvexError, v } from 'convex/values';
import { Resend } from 'resend';
import InvitationEmail from '@/emails/invitation';
import { api, internal } from '../_generated/api';
import { action, internalMutation, internalQuery } from '../_generated/server';
import '../polyfills';

// Query

export const getByEmailAndOrganisation = internalQuery({
  args: {
    email: v.string(),
    organisationId: v.id('organisations'),
  },
  handler: async (ctx, args) => {
    const invitation = await ctx.db
      .query('invitations')
      .withIndex('by_organisation_email', (q) =>
        q
          .eq('organisationId', args.organisationId)
          .eq('inviteeEmail', args.email)
      )
      .first();

    return invitation;
  },
});

// Mutate

export const createInvitation = internalMutation({
  args: {
    invitedByUserId: v.id('users'),
    inviteeEmail: v.string(),
    organisationId: v.id('organisations'),
    organisationName: v.string(),
    role: v.string(),
    isAdmin: v.boolean(),
  },
  handler: async (ctx, args) => {
    const invitationId = await ctx.db.insert('invitations', {
      ...args,
      status: 'pending',
    });
    return invitationId;
  },
});

export const deleteInvitation = internalMutation({
  args: { invitationId: v.id('invitations') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.invitationId);
  },
});

export const create = action({
  args: {
    inviteeEmail: v.string(),
    role: v.string(),
    isAdmin: v.boolean(),
  },
  handler: async (ctx, args) => {
    const invitedByUser = await ctx.runQuery(api.services.users.getCurrent);
    if (!invitedByUser) {
      throw new ConvexError('not_authenticated');
    }

    if (invitedByUser.email === args.inviteeEmail) {
      throw new ConvexError('self_invitation');
    }

    const activeOrganisation = await ctx.runQuery(
      api.services.organisation.getActive
    );
    if (!activeOrganisation) {
      throw new ConvexError('no_active_organisation');
    }

    const existingInvitation = await ctx.runQuery(
      internal.services.invitations.getByEmailAndOrganisation,
      {
        email: args.inviteeEmail,
        organisationId: activeOrganisation._id,
      }
    );

    if (existingInvitation) {
      throw new ConvexError('email_already_exists');
    }

    const invitationId = await ctx.runMutation(
      internal.services.invitations.createInvitation,
      {
        ...args,
        invitedByUserId: invitedByUser._id,
        organisationId: activeOrganisation._id,
        organisationName: activeOrganisation.name,
      }
    );

    const inviteeUser = await ctx.runQuery(api.services.users.getByEmail, {
      email: args.inviteeEmail,
    });

    // Send the email
    try {
      const resend = new Resend(process.env.AUTH_RESEND_KEY);

      await resend.emails.send({
        from: 'GovernApp <onboarding@resend.dev>',
        to: args.inviteeEmail,
        subject: `You're invited to join ${activeOrganisation.name} on GovernApp`,
        html: await render(
          <InvitationEmail
            invitedByEmail={invitedByUser.email}
            invitedByName={`${invitedByUser.firstName} ${invitedByUser.lastName}`}
            inviteeImageUrl={inviteeUser ? inviteeUser.imageUrl : undefined}
            inviteeName={
              inviteeUser
                ? `${inviteeUser.firstName} ${inviteeUser.lastName}`
                : undefined
            }
            inviteLink={`${process.env.SITE_URL}/invitation/${invitationId}`}
            organisationImageUrl={activeOrganisation.imageUrl}
            organisationName={activeOrganisation.name}
          />
        ),
      });
    } catch (error) {
      console.error('Error sending invitation email:', error);

      // Delete the invitation if the email fails to send
      await ctx.runMutation(internal.services.invitations.deleteInvitation, {
        invitationId,
      });

      throw new Error('Failed to send invitation email');
    }
  },
});
