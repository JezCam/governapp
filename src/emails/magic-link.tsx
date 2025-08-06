import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface MagicLinkEmailProps {
  magicLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const MagicLinkEmail = ({ magicLink }: MagicLinkEmailProps) => {
  const previewText = 'Your magic link';

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
              🪄 <strong>Your magic link</strong>
            </Heading>
            <Section>
              <Text>
                <Link href={magicLink}>👉 Click here to sign in 👈</Link>
              </Text>
              <Text>
                If you didn&apos;t request this, please ignore this email.
              </Text>
            </Section>
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

MagicLinkEmail.PreviewProps = {
  magicLink: 'https://governapp.com',
} as MagicLinkEmailProps;

export default MagicLinkEmail;
