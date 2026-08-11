import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { dataService, SPECIALTIES } from '../services/dataService';
import { ArrowLeft, CheckCircle2, Send, AlertCircle } from 'lucide-react';

export default function Appointment() {
  const [searchParams] = useSearchParams();
  const initialSpec = searchParams.get('specialty') || '';

  const [formData, setFormData] = useState({
    patientName: '',
    nidNumber: '',
    email: '',
    phone: '',
    specialtyId: initialSpec,
    serviceTitle: '',
    priority: 'Normal',
    symptoms: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);

  useEffect(() => {
    if (initialSpec) {
      setFormData(prev => ({ ...prev, specialtyId: initialSpec }));
    }
  }, [initialSpec]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.patientName || formData.patientName.length < 3) {
      errs.patientName = 'Patient Name is required (minimum 3 characters).';
    }
    if (!formData.nidNumber || !/^[0-9]{10,17}$/.test(formData.nidNumber)) {
      errs.nidNumber = 'Valid 10 or 17 digit NID required.';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email address required.';
    }
    if (!formData.phone || !/^[0-9]{11}$/.test(formData.phone)) {
      errs.phone = 'Valid 11-digit mobile phone number required.';
    }
    if (!formData.specialtyId) {
      errs.specialtyId = 'Please select a medical department.';
    }
    if (!formData.symptoms) {
      errs.symptoms = 'Please describe patient symptoms/statement.';
    }
    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must agree to the healthcare declaration terms.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    dataService.bookAppointment(formData).then(res => {
      setSubmitting(false);
      setSubmittedReport(res);
    });
  };

  const handleReset = () => {
    setFormData({
      patientName: '',
      nidNumber: '',
      email: '',
      phone: '',
      specialtyId: '',
      serviceTitle: '',
      priority: 'Normal',
      symptoms: '',
      agreeTerms: false
    });
    setErrors({});
    setSubmittedReport(null);
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
      
      <div className="mb-10 text-left">
        <Link to="/" className="text-sky-400 font-semibold text-xs inline-flex items-center gap-1.5 mb-3 hover:text-sky-300 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Patient Doctor Appointment</h1>
        <p className="text-slate-400 text-sm mt-1">WCAG 2.1 AA Accessible Medical Form. Tested for screen readers, font scaling, and contrast modes.</p>
      </div>

      {submittedReport ? (
        <div role="alert" aria-live="assertive" className="mb-10 p-8 bg-emerald-950/80 border border-emerald-500/40 rounded-3xl backdrop-blur-xl flex items-start gap-5 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl flex-shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Appointment Scheduled Successfully!</h2>
            <p className="text-slate-300 text-sm">
              Your Diagnostic Reference Code is: <strong className="text-emerald-400 font-mono text-xl block sm:inline mt-1 sm:mt-0 underline">{submittedReport.reportNo}</strong>
            </p>
            <p className="text-slate-400 text-xs">
              Save this reference code to view medical test results and diagnostic updates.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to={`/reports?search=${submittedReport.reportNo}`}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg"
              >
                Track Medical Report
              </Link>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-xs hover:text-white"
              >
                Schedule Another Patient
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel p-8 sm:p-10 rounded-3xl space-y-10 border border-slate-800 shadow-2xl" role="form">
          
          {/* Step 1 */}
          <fieldset className="space-y-6">
            <legend className="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-bold">1</span>
              Patient Personal Information
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="patientName" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Patient Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="e.g. Mahbubur Rahman"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white focus:border-sky-500 text-sm"
                  aria-invalid={!!errors.patientName}
                />
                {errors.patientName && (
                  <p className="text-rose-400 text-xs mt-1.5 font-semibold flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.patientName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="nidNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  National ID (NID) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="nidNumber"
                  name="nidNumber"
                  value={formData.nidNumber}
                  onChange={handleChange}
                  placeholder="1985345678901234"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white font-mono focus:border-sky-500 text-sm"
                  aria-invalid={!!errors.nidNumber}
                />
                {errors.nidNumber && (
                  <p className="text-rose-400 text-xs mt-1.5 font-semibold flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.nidNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="patient@health.gov.bd"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white focus:border-sky-500 text-sm"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-rose-400 text-xs mt-1.5 font-semibold flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01711002233"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white font-mono focus:border-sky-500 text-sm"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-rose-400 text-xs mt-1.5 font-semibold flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Step 2 */}
          <fieldset className="space-y-6">
            <legend className="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">2</span>
              Medical Department & Urgency Priority
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="specialtyId" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Medical Department <span className="text-rose-500">*</span>
                </label>
                <select
                  id="specialtyId"
                  name="specialtyId"
                  value={formData.specialtyId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-sky-500 text-sm"
                >
                  <option value="">-- Select Medical Specialty --</option>
                  {SPECIALTIES.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                {errors.specialtyId && (
                  <p className="text-rose-400 text-xs mt-1.5 font-semibold flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.specialtyId}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="serviceTitle" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Specific Consultation Type
                </label>
                <input
                  type="text"
                  id="serviceTitle"
                  name="serviceTitle"
                  value={formData.serviceTitle}
                  onChange={handleChange}
                  placeholder="e.g. ECG & Cardiac Followup"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white focus:border-sky-500 text-sm"
                />
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Consultation Urgency Level:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Normal', 'High', 'Urgent'].map(p => (
                  <label key={p} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-sky-500/40 transition-all flex items-center gap-3">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={formData.priority === p}
                      onChange={handleChange}
                      className="text-sky-500 focus:ring-sky-500"
                    />
                    <div>
                      <span className={`block text-sm font-bold ${p === 'Urgent' ? 'text-rose-400' : p === 'High' ? 'text-amber-400' : 'text-white'}`}>
                        {p}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {p === 'Urgent' ? '24-Hour Express' : p === 'High' ? '2-3 Business Days' : '5-7 Business Days'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="symptoms" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Patient Symptoms & Medical History Statement <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                rows="4"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Explain the background symptoms or diagnostic requirements..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white focus:border-sky-500 text-sm"
              />
              {errors.symptoms && (
                <p className="text-rose-400 text-xs mt-1.5 font-semibold flex items-center gap-1" role="alert">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.symptoms}
                </p>
              )}
            </div>
          </fieldset>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-3.5">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-5 h-5 mt-0.5 text-sky-500 rounded bg-slate-800 border-slate-700"
            />
            <label htmlFor="agreeTerms" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
              I hereby declare that all provided statements are true and authentic. Misrepresentation is punishable under Digital Health Regulations.
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-rose-400 text-xs font-semibold flex items-center gap-1 -mt-6" role="alert">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.agreeTerms}
            </p>
          )}

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-xs hover:text-white"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-sky-500/20 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Appointment Request'}
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
