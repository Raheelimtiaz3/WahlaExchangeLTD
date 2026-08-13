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
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="342SHCX8WHDYuF7iMQEIGVQwqrV2ooXj0snOS8sR578" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
