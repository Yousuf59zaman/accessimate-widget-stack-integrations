'use client';

import React, { useState } from 'react';
import { dataService } from '@/lib/dataService';
import { Shield, CheckCircle2 } from 'lucide-react';

export default function AuditSuite() {
  const [logForm, setLogForm] = useState({
    feature: 'High Contrast Mode',
    rating: 5,
    comment: '',
    pageUrl: 'http://localhost:3000/audit-suite'
  });

  const [submittingLog, setSubmittingLog] = useState(false);
  const [logSavedSuccess, setLogSavedSuccess] = useState(false);

  const handleSubmitAuditLog = (e) => {
    e.preventDefault();
    setSubmittingLog(true);
    dataService.saveAuditLog(logForm).then(() => {
      setSubmittingLog(false);
      setLogSavedSuccess(true);
      setLogForm(prev => ({ ...prev, comment: '' }));
      setTimeout(() => setLogSavedSuccess(false), 4000);
    });
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="glass-panel p-8 rounded-3xl mb-12 border border-sky-500/40 bg-slate-900 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Next.js App Router AccessiMate Audit Suite</h1>
        <p className="text-slate-300 text-sm mt-2">Test DOM accessibility features using the floating AccessiMate icon at the bottom corner.</p>
      </div>

      <div className="space-y-8">
        <section className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white">1. Color Contrast & Dyslexia Test</h2>
          <p className="text-slate-300 text-sm">High legibility sample text to test font resizing and dyslexia replacement in Next.js App Router.</p>
        </section>

        <section className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white">2. Keyboard Focus Ring Test</h2>
          <div className="flex gap-4">
            <button className="px-5 py-3 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs">Focus Button 1</button>
            <button className="px-5 py-3 rounded-xl bg-slate-900 text-white border border-slate-800 font-bold text-xs">Focus Button 2</button>
          </div>
        </section>

        <section className="glass-panel p-8 rounded-3xl border border-sky-500/30 bg-slate-900/60 space-y-4">
          <h2 className="text-xl font-bold text-white">3. Save Audit Log (Next.js Session)</h2>
          <form onSubmit={handleSubmitAuditLog} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Tested Feature</label>
              <select value={logForm.feature} onChange={(e) => setLogForm({ ...logForm, feature: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm">
                <option value="High Contrast Mode">High Contrast Mode</option>
                <option value="Font Resize / Text Magnifier">Font Resize / Text Magnifier</option>
                <option value="Screen Reader TTS Speech">Screen Reader TTS Speech</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Test Observation</label>
              <textarea value={logForm.comment} onChange={(e) => setLogForm({ ...logForm, comment: e.target.value })} rows="3" placeholder="Enter observation..." className="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"></textarea>
            </div>

            <button type="submit" disabled={submittingLog} className="px-7 py-3 rounded-xl bg-sky-500 text-slate-950 font-extrabold text-sm">
              {submittingLog ? 'Saving...' : 'Save Log to Session'}
            </button>

            {logSavedSuccess && <p className="text-emerald-400 font-bold text-xs flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Audit record saved in Next.js session memory!</p>}
          </form>
        </section>
      </div>
    </div>
  );
}
