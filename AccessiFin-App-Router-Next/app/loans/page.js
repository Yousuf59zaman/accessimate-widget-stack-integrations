'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { dataService, BANKING_SERVICES } from '@/lib/dataService';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Loans() {
  const [formData, setFormData] = useState({
    applicantName: '',
    nidNumber: '',
    email: '',
    phone: '',
    serviceId: '',
    amount: '',
    priority: 'Normal',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedTx, setSubmittedTx] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.applicantName || formData.applicantName.length < 3) {
      errs.applicantName = 'Applicant name required (min 3 chars).';
    }
    if (!formData.nidNumber || !/^[0-9]{10,17}$/.test(formData.nidNumber)) {
      errs.nidNumber = 'Valid 10 or 17 digit NID required.';
    }
    if (!formData.serviceId) {
      errs.serviceId = 'Please select a banking service.';
    }
    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must accept terms.';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    dataService.applyLoan(formData).then(res => {
      setSubmitting(false);
      setSubmittedTx(res);
    });
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="mb-10 text-left">
        <Link href="/" className="text-sky-400 font-semibold text-xs inline-flex items-center gap-1.5 mb-3 hover:text-sky-300">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Citizen Financial Credit & Micro-Loan Form</h1>
        <p className="text-slate-400 text-sm mt-1">WCAG 2.1 AA Accessible Form. Tested in Next.js App Router for screen reader accessibility.</p>
      </div>

      {submittedTx ? (
        <div role="alert" className="mb-10 p-8 bg-emerald-950/80 border border-emerald-500/40 rounded-3xl backdrop-blur-xl flex items-start gap-5 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl flex-shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Application Submitted Successfully!</h2>
            <p className="text-slate-300 text-sm">
              Transaction Reference Code: <strong className="text-emerald-400 font-mono text-xl block sm:inline mt-1 sm:mt-0 underline">{submittedTx.txNo}</strong>
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href={`/directory?search=${submittedTx.txNo}`} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg">
                Track Application Status
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel p-8 sm:p-10 rounded-3xl space-y-8 border border-slate-800 shadow-2xl">
          <fieldset className="space-y-6">
            <legend className="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-bold">1</span>
              Applicant Personal & NID Data
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="applicantName" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Full Name *</label>
                <input type="text" id="applicantName" name="applicantName" value={formData.applicantName} onChange={handleChange} placeholder="e.g. Moklesur Rahman" className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
                {errors.applicantName && <p className="text-rose-400 text-xs mt-1 font-semibold">{errors.applicantName}</p>}
              </div>

              <div>
                <label htmlFor="nidNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">National ID (NID) *</label>
                <input type="text" id="nidNumber" name="nidNumber" value={formData.nidNumber} onChange={handleChange} placeholder="1982345678901234" className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm" />
                {errors.nidNumber && <p className="text-rose-400 text-xs mt-1 font-semibold">{errors.nidNumber}</p>}
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-6">
            <legend className="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">2</span>
              Financial Service & Credit Amount
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="serviceId" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Banking Service *</label>
                <select id="serviceId" name="serviceId" value={formData.serviceId} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm">
                  <option value="">-- Select Service --</option>
                  {BANKING_SERVICES.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                {errors.serviceId && <p className="text-rose-400 text-xs mt-1 font-semibold">{errors.serviceId}</p>}
              </div>

              <div>
                <label htmlFor="amount" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Required Credit Amount (BDT)</label>
                <input type="text" id="amount" name="amount" value={formData.amount} onChange={handleChange} placeholder="e.g. 500,000" className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm" />
              </div>
            </div>
          </fieldset>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="w-5 h-5 text-sky-500 rounded bg-slate-800" />
            <label htmlFor="agreeTerms" className="text-xs text-slate-300">I declare all provided financial information is authentic.</label>
          </div>
          {errors.agreeTerms && <p className="text-rose-400 text-xs font-semibold">{errors.agreeTerms}</p>}

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-800">
            <button type="submit" disabled={submitting} className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-sm shadow-xl">
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
