import Image from 'next/image';
import Header from './header';

export default function Home() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="relative flex size-full items-center justify-center">
        <div
          className="-z-1 absolute inset-0 bg-[url('/pattern-light.svg')] bg-primary stroke-current text-foreground dark:bg-[url('/pattern-dark.svg')]"
          style={{
            backgroundColor: 'var(--color-accent)',
            backgroundRepeat: 'repeat',
            backgroundSize: '100px',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
            maskRepeat: 'no-repeat',
            maskSize: '100% 100%',
          }}
        />
        <div className="flex h-full w-full max-w-7xl translate-y-24 flex-col items-center justify-end gap-16">
          <h1
            className="text-center font-extrabold text-7xl leading-22"
            style={{ fontFamily: 'var(--font-m-plus-rounded-1c' }}
          >
            Compliance is Hard
            <br />
            So We Fixed it
          </h1>
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl border shadow-xl">
            <Image
              alt="hero"
              fill
              objectFit="cover"
              objectPosition="top"
              src="/hero.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
