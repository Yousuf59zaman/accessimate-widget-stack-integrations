import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'AccessiFin — National Accessible Banking & FinTech Portal',
  description: 'Accessible Citizen Banking, Micro-Loans & Financial Directory Portal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* AccessiMate Accessibility Widget Script injected via Next.js Script component */}
        <Script
          src="https://dev-script.accessimate.com/js/main.js"
          data-account="yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ"
          type="module"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
