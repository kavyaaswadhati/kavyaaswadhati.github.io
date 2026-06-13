import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kavya Aswadhati',
  description: 'Comics and artwork by Kavya Aswadhati.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="px-5 pb-3 pt-4 text-center">
          <Link
            href="/"
            className="font-[Avara] text-[35px] leading-tight text-[var(--accent)] no-underline"
          >
            kavya aswadhati
          </Link>
          <nav
            aria-label="Primary navigation"
            className="mt-4 flex justify-center gap-5 text-xl font-bold"
          >
            <Link className="text-[var(--link)] no-underline hover:text-[#004f91]" href="/">
              home
            </Link>
            <Link
              className="text-[var(--link)] no-underline hover:text-[#004f91]"
              href="/about"
            >
              about
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
