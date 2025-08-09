import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { cn } from '@/lib/utils';


export const metadata: Metadata = {
  title: 'HaloAiStudios | AI Project Showcase',
  description: "Showcasing HaloAiStudios' cutting-edge AI projects and software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
