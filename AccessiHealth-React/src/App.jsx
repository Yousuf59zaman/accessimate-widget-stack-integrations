import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Reports from './pages/Reports';
import Faqs from './pages/Faqs';
import AuditSuite from './pages/AuditSuite';

export default function App() {
  useEffect(() => {
    // Dynamically inject AccessiMate Accessibility Widget script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://dev-script.accessimate.com/js/main.js';
    script.setAttribute('data-account', 'yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ');
    script.async = true;

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/audit-suite" element={<AuditSuite />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
