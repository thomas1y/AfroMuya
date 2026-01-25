'use client';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';
import ReduxProvider from '@/lib/redux/provider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Toast from '@/components/ui/Toast';
import ClientInitializer from '@/components/ClientInitializer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith('/dashboard');
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ClientInitializer />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            {/* Conditionally render footer */}
            {!isDashboardPage && <Footer />}
            <Toast />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}