import type { Metadata } from 'next';
import Link from 'next/link';
import '../styles/globals.css';

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
        </header>
        {children}
      </body>
    </html>
  );
}
