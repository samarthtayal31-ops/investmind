import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InvestMind AI — Your AI Investment Mentor',
  description: 'AI-powered investment education platform. Learn NASDAQ, NIFTY, FOREX, and Crypto basics with InvestMind AI by Samarth Tayal.',
  metadataBase: new URL('https://investmind-ai.netlify.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
