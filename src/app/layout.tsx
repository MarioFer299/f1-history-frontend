import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/features/common/components/Navbar';

export const metadata: Metadata = {
  title: 'F1 History',
  description: 'Catálogo de escuderías de Fórmula 1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}