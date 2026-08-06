import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wahla Exchange LTD - Glasgow Currency Exchange & Tech Store',
  description: 'Zero-commission foreign currency exchange & premium smartphones at 22 Maxwell Road, Glasgow.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0F1115] text-slate-100 antialiased selection:bg-teal-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
