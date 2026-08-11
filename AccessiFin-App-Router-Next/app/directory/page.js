'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { dataService } from '@/lib/dataService';
import { Search, X, AlertTriangle } from 'lucide-react';

function DirectoryContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  const [lookupInput, setLookupInput] = useState('');
  const [lookupResult, setLookupResult] = useState(undefined);
  const [selectedModalTx, setSelectedModalTx] = useState(null);

  const statuses = ['All', 'Completed', 'In Progress', 'Approved', 'Pending'];

  useEffect(() => {
    setLoading(true);
    dataService.getTransactions(searchQuery, selectedStatus).then(data => {
      setTransactions(data);
      setLoading(false);
    });
  }, [searchQuery, selectedStatus]);

  const handleLookupSubmit = (e) => {
    e.preventDefault();
    if (!lookupInput.trim()) return;
    dataService.lookupTransaction(lookupInput.trim()).then(res => {
      setLookupResult(res);
    });
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-left">
        <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
          Financial Records Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">Account & Transaction Directory</h1>
      </div>

      {/* Lookup Card */}
      <div className="glass-panel p-8 rounded-3xl mb-10 border border-sky-500/30 bg-slate-900 shadow-2xl">
        <h2 className="text-lg font-bold text-white mb-3">Direct Financial Record Lookup</h2>
        <form onSubmit={handleLookupSubmit} className="flex gap-3">
          <input
            type="text"
            value={lookupInput}
            onChange={(e) => setLookupInput(e.target.value)}
            placeholder="Enter Transaction Code (e.g. FIN-2026-6001)"
            className="flex-1 px-5 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-sky-500"
          />
          <button type="submit" className="px-7 py-3 rounded-2xl bg-sky-500 text-slate-950 font-extrabold text-sm shadow-lg">
            Lookup
          </button>
        </form>

        {lookupResult !== undefined && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            {lookupResult ? (
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono font-bold text-sky-400">{lookupResult.txNo}</span>
                  <h3 className="text-base font-bold text-white">{lookupResult.applicantName}</h3>
                  <p className="text-xs text-slate-400">{lookupResult.serviceTitle} • {lookupResult.amount}</p>
                </div>
                <button onClick={() => setSelectedModalTx(lookupResult)} className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold">
                  Details
                </button>
              </div>
            ) : (
              <div className="text-amber-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> No record matching code "{lookupInput}".
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900 border-b border-slate-800 text-[11px] uppercase font-bold text-slate-400">
            <tr>
              <th className="py-4 px-6">Reference Code</th>
              <th className="py-4 px-6">Applicant Name</th>
              <th className="py-4 px-6">NID</th>
              <th className="py-4 px-6">Service</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm">
            {loading ? (
              <tr><td colSpan="7" className="py-8 text-center text-slate-400">Loading directory...</td></tr>
            ) : transactions.length === 0 ? (
              <tr><td colSpan="7" className="py-12 text-center text-slate-500">No records found.</td></tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-sky-400">{tx.txNo}</td>
                  <td className="py-4 px-6 font-bold text-white">{tx.applicantName}</td>
                  <td className="py-4 px-6 font-mono text-slate-400 text-xs">{tx.nidNumber}</td>
                  <td className="py-4 px-6 text-slate-300 font-medium">{tx.serviceTitle}</td>
                  <td className="py-4 px-6 font-mono text-emerald-400 font-bold">{tx.amount}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">{tx.status}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => setSelectedModalTx(tx)} className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-semibold">View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedModalTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-xl font-bold text-white">{selectedModalTx.txNo}</h2>
              <button onClick={() => setSelectedModalTx(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong className="text-slate-400 text-xs block">Applicant Name:</strong> <span className="text-white font-bold">{selectedModalTx.applicantName}</span></p>
              <p><strong className="text-slate-400 text-xs block">NID:</strong> <span className="text-slate-300 font-mono">{selectedModalTx.nidNumber}</span></p>
              <p><strong className="text-slate-400 text-xs block">Service:</strong> <span className="text-slate-300">{selectedModalTx.serviceTitle}</span></p>
              <p><strong className="text-slate-400 text-xs block">Amount:</strong> <span className="text-emerald-400 font-mono font-bold">{selectedModalTx.amount}</span></p>
            </div>
            <div className="pt-4 flex justify-end">
              <button onClick={() => setSelectedModalTx(null)} className="px-5 py-2 bg-sky-500 text-slate-950 font-bold text-xs rounded-xl">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Directory() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-slate-400">Loading Directory...</div>}>
      <DirectoryContent />
    </Suspense>
  );
}
