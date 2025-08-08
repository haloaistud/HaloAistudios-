import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { cn } from '@/lib/utils';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'HaloAiStudios Hub',
  description: 'The central hub for HaloAiStudios applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn('min-h-screen bg-background font-sans antialiased', spaceGrotesk.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
