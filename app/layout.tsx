import type { Metadata, Viewport } from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Wahla Exchange LTD | Foreign Currency & Mobile Store',
  description: 'Wahla Exchange LTD - All-in-one foreign currency exchange counter, phone trade-in, unlocked smartphones & mobile accessories hub.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0B0E',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

