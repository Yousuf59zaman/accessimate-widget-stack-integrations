import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { Shield, Sliders, CheckCircle2, AlertCircle } from 'lucide-react';

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
      
      {/* Banner Header */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl mb-12 border border-sky-500/40 bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase border border-sky-400/30">
            <Shield className="w-3.5 h-3.5" /> React AccessiMate Audit Suite
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">AccessiMate Widget Feature Tester</h1>
          <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
            Click the floating <strong className="text-sky-400">AccessiMate Widget Trigger Icon</strong> (located at the bottom corner) to activate DOM accessibility features across these benchmarks.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        
        {/* Benchmark 1 */}
        <section className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg">1</div>
            <div>
              <h2 className="text-xl font-bold text-white">Color Contrast & Inversion Test Benchmark</h2>
              <p className="text-xs text-slate-400">Evaluate High Contrast, Dark Mode, Light Mode, and Monochrome filters.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold uppercase text-sky-400 block mb-2">Standard Text (High Contrast)</span>
              <p className="text-slate-200 text-sm leading-relaxed">
                Standard high legibility text on dark slate surface conforming to 4.5:1 ratio targets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <span className="text-[11px] font-bold uppercase text-amber-400 block mb-2">⚠️ Low Contrast Sample</span>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Intentionally low-contrast text to test how AccessiMate Contrast enhancer boosts readability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-sky-950/60 border border-sky-500/30">
              <span className="text-[11px] font-bold uppercase text-sky-300 block mb-2">Inverted Accent Surface</span>
              <p className="text-sky-100 text-sm leading-relaxed">
                Colored cards should retain clear boundaries when color filters or monochrome modes are triggered.
              </p>
            </div>
          </div>
        </section>

        {/* Benchmark 2 */}
        <section className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">2</div>
            <div>
              <h2 className="text-xl font-bold text-white">Typography Scaling & Dyslexia Font Sandbox</h2>
              <p className="text-xs text-slate-400">Test Font Resizing (+/-), Line Spacing, and Dyslexia-Friendly font replacement.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-lg font-bold text-white">Sample Medical Charter Article</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Accessible digital health platforms empower patients of all abilities to independently navigate healthcare services, schedule medical consultations, and view diagnostic results.
            </p>
          </div>
        </section>

        {/* Benchmark 3 */}
        <section className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">3</div>
            <div>
              <h2 className="text-xl font-bold text-white">Keyboard Navigation & Focus Ring Test</h2>
              <p className="text-xs text-slate-400">Press <kbd className="px-2 py-0.5 rounded bg-slate-800 text-sky-400 font-mono text-xs">Tab</kbd> to cycle keyboard focus indicators.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-5 py-3 rounded-xl bg-sky-500 text-slate-950 font-extrabold text-xs shadow-lg">
              Focus Button 1
            </button>
            <button className="px-5 py-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 font-bold text-xs">
              Focus Button 2
            </button>
            <a href="javascript:void(0)" className="text-sky-400 font-bold text-xs underline px-3 py-2 rounded-xl focus:outline-none">
              Accessible Focusable Link
            </a>
            <input type="text" placeholder="Type for focus outline..." className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs" />
          </div>
        </section>

        {/* Benchmark 4 */}
        <section className="glass-panel p-8 rounded-3xl border border-sky-500/30 bg-slate-900/60 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center font-black text-lg">4</div>
            <div>
              <h2 className="text-xl font-bold text-white">Save Audit Log (React In-Memory Session)</h2>
              <p className="text-xs text-slate-400">Persist your AccessiMate widget test observations into React state memory.</p>
            </div>
          </div>

          <form onSubmit={handleSubmitAuditLog} className="space-y-4 max-w-xl">
            <div>
              <label htmlFor="feature" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Tested Feature</label>
              <select
                id="feature"
                value={logForm.feature}
                onChange={(e) => setLogForm({ ...logForm, feature: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
              >
                <option value="High Contrast Mode">High Contrast Mode</option>
                <option value="Font Resize / Text Magnifier">Font Resize / Text Magnifier</option>
                <option value="Screen Reader TTS Speech">Screen Reader TTS Speech</option>
                <option value="Dyslexia Font Replacement">Dyslexia Font Replacement</option>
                <option value="Keyboard Focus Highlight">Keyboard Focus Highlight</option>
              </select>
            </div>

            <div>
              <label htmlFor="rating" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Rating Score (1-5)</label>
              <input
                type="number"
                id="rating"
                min="1"
                max="5"
                value={logForm.rating}
                onChange={(e) => setLogForm({ ...logForm, rating: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Test Observations</label>
              <textarea
                id="comment"
                rows="3"
                value={logForm.comment}
                onChange={(e) => setLogForm({ ...logForm, comment: e.target.value })}
                placeholder="e.g. Contrast mode rendered text elements perfectly without layout shift..."
                className="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={submittingLog}
              className="px-7 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-sky-500/20 disabled:opacity-50"
            >
              {submittingLog ? 'Saving Log...' : 'Save Log to Session'}
            </button>

            {logSavedSuccess && (
              <p className="text-emerald-400 font-bold text-xs flex items-center gap-1.5 pt-2">
                <CheckCircle2 className="w-4 h-4" /> Audit Record saved in React session memory!
              </p>
            )}
          </form>
        </section>

      </div>

    </div>
  );
}
