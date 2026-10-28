import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/features/common/components/Navbar';

export const metadata: Metadata = {
  title: 'F1 History',
  description: 'Historia de la Fórmula 1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}