import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface InvitationEmailProps {
  inviteeName?: string;
  inviteeImageUrl?: string;
  invitedByName?: string;
  invitedByEmail?: string;
  organisationName?: string;
  organisationImageUrl?: string;
  inviteLink?: string;
}

const baseUrl = process.env.SITE_URL ? `https://${process.env.SITE_URL}` : '';

export const InvitationEmail = ({
  inviteeName,
  inviteeImageUrl,
  invitedByName,
  invitedByEmail,
  organisationName,
  organisationImageUrl,
  inviteLink,
}: InvitationEmailProps) => {
  const previewText = `Join ${invitedByName} on GovernApp`;

  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid p-[20px]">
            <Section className="mt-[32px]">
              <Img
                alt="GovernApp Logo"
                className="mx-auto my-0"
                height="37"
                src={`${baseUrl}/logomark.svg`}
                width="40"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Join <strong>{organisationName}</strong> on{' '}
              <strong>GovernApp</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello{` ${inviteeName}`},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByName}</strong> (
              <Link
                className="text-blue-600 no-underline"
                href={`mailto:${invitedByEmail}`}
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{organisationName}</strong> team
              on <strong>GovernApp</strong>.
            </Text>
            {inviteeImageUrl && (
              <Section>
                <Row>
                  <Column align="right">
                    <Img
                      alt={'profile picture'}
                      className="rounded-full"
                      height="64"
                      src={inviteeImageUrl}
                      width="64"
                    />
                  </Column>
                  <Column align="center">
                    <Img
                      alt="Arrow indicating invitation"
                      height="9"
                      src={`${baseUrl}/static/vercel-arrow.png`}
                      width="12"
                    />
                  </Column>
                  <Column align="left">
                    <Img
                      alt={`${organisationName} team logo`}
                      className="rounded-full"
                      height="64"
                      src={organisationImageUrl} // TODO: Add default image if not provided
                      width="64"
                    />
                  </Column>
                </Row>
              </Section>
            )}
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded-md bg-[#6c3082] px-6 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link className="text-blue-600 no-underline" href={inviteLink}>
                {inviteLink}
              </Link>
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Best,
              <br />- GovernApp Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

InvitationEmail.PreviewProps = {
  inviteeName: 'Jeremy',
  inviteeImageUrl: 'https://avatars.githubusercontent.com/u/77473646?v=4',
  invitedByName: 'Lee',
  invitedByEmail: 'lee@example.com',
  organisationName: 'Enigma',
  organisationImageUrl: `${baseUrl}/static/vercel-team.png`,
  inviteLink: 'https://governapp.com',
} as InvitationEmailProps;

export default InvitationEmail;
