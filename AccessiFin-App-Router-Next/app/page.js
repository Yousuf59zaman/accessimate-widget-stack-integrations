'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { dataService } from '@/lib/dataService';
import { Landmark, Wallet, ArrowRight, ShieldCheck, Heart, Users, Sliders, CheckCircle } from 'lucide-react';

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                Official Next.js App Router AccessiMate Testbed
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Accessible Citizen <span className="text-gradient-sky">Banking & Micro-Finance</span>
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed max-w-2xl font-normal">
                Apply for SME micro-loans, track remittance payouts, and experience inclusive digital financial services powered by the <strong className="text-sky-400">AccessiMate Accessibility Widget</strong>.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/loans"
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] transition-all flex items-center gap-3"
                >
                  <Wallet className="w-5 h-5" /> Apply for Credit
                </Link>

                <Link
                  href="/audit-suite"
                  className="px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-base hover:scale-[1.02] transition-all flex items-center gap-3"
                >
                  <Sliders className="w-5 h-5 text-sky-400" /> Open Audit Sandbox
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 rounded-3xl relative overflow-hidden border border-slate-800 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Next.js App Router Active</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    Next.js 15
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-lg font-bold">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">SME Startup Credit</h3>
                        <p className="text-xs text-slate-400">Fast 24h Approval</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-800 text-emerald-300">Open</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg font-bold">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Citizen DPS Scheme</h3>
                        <p className="text-xs text-slate-400">High Interest Yield</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-800 text-sky-300">Active</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
            Digital Banking Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Available Financial Portals</h2>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((serv) => (
              <div key={serv.id} className="glass-panel p-7 rounded-3xl glass-panel-hover flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 text-sky-400 flex items-center justify-center text-2xl mb-6 group-hover:from-sky-500 group-hover:to-indigo-600 group-hover:text-white transition-all">
                    <i className={serv.icon}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">{serv.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">{serv.description}</p>
                </div>

                <Link
                  href={`/loans?service=${serv.id}`}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-sky-600 hover:text-white text-sky-400 font-bold text-xs flex items-center justify-between border border-slate-800 transition-all"
                >
                  <span>Apply Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
