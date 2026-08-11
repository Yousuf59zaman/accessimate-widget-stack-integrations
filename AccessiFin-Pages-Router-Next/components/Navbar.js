import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Landmark, Sun, Moon, Wallet, Users, HelpCircle, Sliders } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const isActive = (path) => router.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight flex items-center gap-1">
                Accessi<span className="text-gradient-sky">Fin</span>
              </span>
              <span className="text-[10px] font-bold tracking-wider text-sky-400 uppercase block -mt-1">
                Next Pages Router Banking Portal
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive('/')
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Landmark className="w-4 h-4" /> Home
            </Link>

            <Link
              href="/loans"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive('/loans')
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Wallet className="w-4 h-4" /> Apply for Loan
            </Link>

            <Link
              href="/directory"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive('/directory')
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-4 h-4" /> Directory & Lookup
            </Link>

            <Link
              href="/faqs"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive('/faqs')
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <HelpCircle className="w-4 h-4" /> FAQs
            </Link>

            <Link
              href="/audit-suite"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive('/audit-suite')
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sliders className="w-4 h-4 text-sky-400" /> Audit Suite
            </Link>
          </nav>

          {/* Right Theme Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-sky-400" /> Dark Mode
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
