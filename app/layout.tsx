import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://wahlaexchange.co.uk'),
  title: 'Wahla Exchange LTD - Glasgow Currency Exchange & Tech Store',
  description: 'Zero-commission foreign currency exchange & premium smartphones at 22 Maxwell Road, Glasgow.',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: '342SHCX8WHDYuF7iMQEIGVQwqrV2ooXj0snOS8sR578',
  },
  other: {
    'google-site-verification': '342SHCX8WHDYuF7iMQEIGVQwqrV2ooXj0snOS8sR578',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="342SHCX8WHDYuF7iMQEIGVQwqrV2ooXj0snOS8sR578" />
      </head>
      <body className="min-h-screen bg-[#0A0F1D] text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
