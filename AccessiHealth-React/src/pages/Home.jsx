import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { Activity, Stethoscope, ArrowRight, ShieldCheck, Heart, Users, Sliders, CheckCircle } from 'lucide-react';

export default function Home() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.getSpecialties().then((data) => {
      setSpecialties(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                Official React AccessiMate Testbed
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Accessible Digital <span className="text-gradient-sky">Healthcare & Telemedicine</span>
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed max-w-2xl font-normal">
                Book doctor consultations, check diagnostic test reports, and experience inclusive digital health services powered by the <strong className="text-sky-400">AccessiMate Accessibility Widget</strong>.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/appointment"
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] transition-all flex items-center gap-3"
                >
                  <Stethoscope className="w-5 h-5" /> Book Consultation
                </Link>

                <Link
                  to="/audit-suite"
                  className="px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-base hover:scale-[1.02] transition-all flex items-center gap-3"
                >
                  <Sliders className="w-5 h-5 text-sky-400" /> Open Audit Sandbox
                </Link>
              </div>

              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-800/80 max-w-xl">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                  <div className="text-xs font-semibold text-slate-400">WCAG 2.1 AA Compliant</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-sky-400">React 18</div>
                  <div className="text-xs font-semibold text-slate-400">Vite Standalone Mode</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-indigo-400">Instant</div>
                  <div className="text-xs font-semibold text-slate-400">Diagnostic Reports</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 rounded-3xl relative overflow-hidden border border-slate-800 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Active Telemedicine Desk</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    React Engine Online
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-lg font-bold">
                        <Heart className="w-5 h-5 text-sky-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Cardiology & Heart Desk</h3>
                        <p className="text-xs text-slate-400">12 Specialists Online</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-800 text-sky-300">Available</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg font-bold">
                        <Activity className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Neurology & EEG Desk</h3>
                        <p className="text-xs text-slate-400">8 Specialists Online</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-800 text-emerald-300">Fast Track</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg font-bold">
                        <Users className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Pediatric & Infant Desk</h3>
                        <p className="text-xs text-slate-400">15 Specialists Online</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-800 text-purple-300">Open Desk</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-center">
                  <Link to="/reports" className="text-xs font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1.5">
                    View Medical Reports Directory <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
            Specialized Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Available Medical Departments</h2>
          <p className="text-slate-400 text-base">Select a department to schedule an accessible consultation.</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400">
            <Activity className="w-8 h-8 animate-spin text-sky-400 mx-auto mb-3" />
            Loading medical departments...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((spec) => (
              <div key={spec.id} className="glass-panel p-7 rounded-3xl glass-panel-hover flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 text-sky-400 flex items-center justify-center text-2xl mb-6 group-hover:from-sky-500 group-hover:to-indigo-600 group-hover:text-white transition-all">
                    <i className={spec.icon}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors">{spec.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{spec.description}</p>
                </div>

                <Link
                  to={`/appointment?specialty=${spec.id}`}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-sky-600 hover:text-white text-sky-400 font-bold text-xs flex items-center justify-between border border-slate-800 transition-all"
                >
                  <span>Book Appointment</span>
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
