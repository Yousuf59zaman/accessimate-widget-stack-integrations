import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { Search, X, Eye, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function Reports() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  const [lookupInput, setLookupInput] = useState('');
  const [lookupResult, setLookupResult] = useState(undefined);
  const [selectedModalReport, setSelectedModalReport] = useState(null);

  const statuses = ['All', 'Completed', 'In Progress', 'Pending', 'Action Required'];

  const loadReports = () => {
    setLoading(true);
    dataService.getReports(searchQuery, selectedStatus).then(data => {
      setReports(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadReports();
  }, [searchQuery, selectedStatus]);

  const handleLookupSubmit = (e) => {
    e.preventDefault();
    if (!lookupInput.trim()) return;
    dataService.lookupReport(lookupInput.trim()).then(res => {
      setLookupResult(res);
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'In Progress':
        return 'px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30';
      case 'Pending':
        return 'px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30';
      case 'Action Required':
        return 'px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30';
      default:
        return 'px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300';
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'Urgent':
        return 'text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-md border border-rose-500/30';
      case 'High':
        return 'text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/30';
      default:
        return 'text-[11px] font-semibold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-md border border-slate-800';
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="mb-10 text-left">
        <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
          Diagnostic Directory & Lookup
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">Medical Test Reports Directory</h1>
        <p className="text-slate-400 text-sm mt-1">Track patient diagnostic status or search medical records stored in the testbed.</p>
      </div>

      {/* Quick Lookup Card */}
      <div className="glass-panel p-8 rounded-3xl mb-10 border border-sky-500/30 bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-sky-400" /> Direct Medical Report Lookup
          </h2>
          <form onSubmit={handleLookupSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={lookupInput}
              onChange={(e) => setLookupInput(e.target.value)}
              placeholder="Enter Report Code (e.g. REP-2026-9001)"
              className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-955 border border-slate-800 text-white font-mono text-sm focus:border-sky-500"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-sky-500/20"
            >
              Lookup Report
            </button>
          </form>

          {lookupResult !== undefined && (
            <div className="mt-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
              {lookupResult ? (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs uppercase font-mono text-sky-400 font-bold">Record Found: {lookupResult.reportNo}</span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{lookupResult.patientName}</h3>
                    <p className="text-xs text-slate-400">{lookupResult.testType} • Date: {lookupResult.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={getStatusBadge(lookupResult.status)}>{lookupResult.status}</span>
                    <button
                      onClick={() => setSelectedModalReport(lookupResult)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                    >
                      Full Details
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-amber-400 font-medium text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> No record matching report code "{lookupInput}".
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Patient Name, NID, or Doctor..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-sky-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto" role="tablist">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`px-4 py-2 rounded-xl text-xs border transition-colors ${
                selectedStatus === s
                  ? 'bg-sky-500/20 text-sky-400 border-sky-500/50 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
              role="tab"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" role="table">
            <caption className="sr-only">Medical Reports Directory Table</caption>
            <thead className="bg-slate-900/90 border-b border-slate-800 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              <tr>
                <th scope="col" className="py-4 px-6">Report Code</th>
                <th scope="col" className="py-4 px-6">Patient Name</th>
                <th scope="col" className="py-4 px-6">NID Number</th>
                <th scope="col" className="py-4 px-6">Diagnostic Test</th>
                <th scope="col" className="py-4 px-6">Urgency</th>
                <th scope="col" className="py-4 px-6">Status</th>
                <th scope="col" className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    Loading medical test reports...
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-slate-500">
                    <FileText className="w-10 h-10 text-slate-600 block mx-auto mb-3" />
                    No medical records match your search filter.
                  </td>
                </tr>
              ) : (
                reports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-sky-400">
                      {rep.reportNo}
                    </td>
                    <td className="py-4 px-6 font-bold text-white">
                      {rep.patientName}
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-400 text-xs">
                      {rep.nidNumber}
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-medium">
                      {rep.testType}
                    </td>
                    <td className="py-4 px-6">
                      <span className={getUrgencyBadge(rep.urgency)}>{rep.urgency}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={getStatusBadge(rep.status)}>{rep.status}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedModalReport(rep)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-sky-500/20 hover:text-sky-300 text-slate-300 border border-slate-800 text-xs font-semibold inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Details Modal */}
      {selectedModalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" role="dialog">
          <div className="glass-panel max-w-xl w-full p-8 space-y-6 rounded-3xl border border-slate-800 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase font-mono text-sky-400 font-bold">Reference Record</span>
                <h2 className="text-2xl font-bold text-white mt-0.5">{selectedModalReport.reportNo}</h2>
              </div>
              <button
                onClick={() => setSelectedModalReport(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Patient Name</span>
                  <span className="font-bold text-white text-base">{selectedModalReport.patientName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">NID Number</span>
                  <span className="font-mono text-slate-300">{selectedModalReport.nidNumber}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Attending Physician</span>
                  <span className="text-slate-300 font-medium">{selectedModalReport.doctorName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Report Date</span>
                  <span className="font-mono text-slate-300">{selectedModalReport.date}</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Diagnostic Test Performed</span>
                <p className="text-slate-200 font-semibold">{selectedModalReport.testType}</p>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Medical Specialist Summary</span>
                <p className="text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs leading-relaxed">
                  {selectedModalReport.summary}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 flex justify-end">
              <button
                onClick={() => setSelectedModalReport(null)}
                className="px-6 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-extrabold text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
