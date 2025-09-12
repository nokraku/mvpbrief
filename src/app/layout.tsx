import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MVPbrief - Real-world Product Challenges',
  description: 'Generate product management challenges based on your experience and area of interest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      import Script from 'next/script'

// Add these script tags in your layout
<Script src="https://www.googletagmanager.com/gtag/js?id=G_VJ3LKY7EK8" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G_VJ3LKY7EK8');
  `}
</Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}