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

interface VercelInviteUserEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  organisationName?: string;
  organisationImage?: string;
  inviteLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const VercelInviteUserEmail = ({
  username,
  userImage,
  invitedByUsername,
  invitedByEmail,
  organisationName: teamName,
  organisationImage: teamImage,
  inviteLink,
}: VercelInviteUserEmailProps) => {
  const previewText = `Join ${invitedByUsername} on Vercel`;

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
                src={`${baseUrl}/static/logomark.svg`}
                width="40"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Join <strong>{teamName}</strong> on <strong>GovernApp</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>{invitedByUsername}</strong> (
              <Link
                className="text-blue-600 no-underline"
                href={`mailto:${invitedByEmail}`}
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>{teamName}</strong> team on{' '}
              <strong>GovernApp</strong>.
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    alt={`${username}'s profile picture`}
                    className="rounded-full"
                    height="64"
                    src={userImage}
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
                    alt={`${teamName} team logo`}
                    className="rounded-full"
                    height="64"
                    src={teamImage}
                    width="64"
                  />
                </Column>
              </Row>
            </Section>
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

VercelInviteUserEmail.PreviewProps = {
  username: 'Jeremy',
  userImage: 'https://avatars.githubusercontent.com/u/77473646?v=4',
  invitedByUsername: 'Lee',
  invitedByEmail: 'lee@example.com',
  organisationName: 'Enigma',
  organisationImage: `${baseUrl}/static/vercel-team.png`,
  inviteLink: 'https://governapp.com',
} as VercelInviteUserEmailProps;

export default VercelInviteUserEmail;
