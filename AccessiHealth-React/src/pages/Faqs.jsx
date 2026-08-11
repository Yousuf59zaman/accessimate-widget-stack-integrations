import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.getFaqs().then((data) => {
      setFaqs(data);
      setLoading(false);
    });
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
          Patient Support Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h1>
        <p className="text-slate-400 text-base">Find answers regarding digital health services and WCAG accessibility standards.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading FAQs...</div>
      ) : (
        <div className="space-y-4" role="region">
          {faqs.map((faq, i) => (
            <div key={faq.id} className="glass-panel rounded-2xl overflow-hidden border border-slate-800 transition-all">
              <button
                onClick={() => toggleFaq(i)}
                aria-expanded={openIndex === i}
                className="w-full p-6 text-left font-bold text-white text-lg flex justify-between items-center gap-4 hover:bg-slate-900/60 focus:outline-none"
              >
                <span>{faq.question}</span>
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-sky-400">
                  {openIndex === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {openIndex === i && (
                <div className="px-6 pb-6 pt-2 text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 bg-slate-955">
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  <span className="inline-block mt-4 px-3 py-1 rounded-lg text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    Category: {faq.category}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
