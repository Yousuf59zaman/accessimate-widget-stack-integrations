// Static data service for AccessiHealth Telemedicine Portal

export const SPECIALTIES = [
  {
    id: 'spec-1',
    title: 'Cardiology & Heart Care',
    description: 'Expert cardiac consultation, ECG analysis, and hypertension management.',
    icon: 'pi pi-heart-fill',
    activeDoctors: 12
  },
  {
    id: 'spec-2',
    title: 'Neurology & Brain Health',
    description: 'Diagnosis of neurological disorders, stroke prevention, and migraine therapy.',
    icon: 'pi pi-compass',
    activeDoctors: 8
  },
  {
    id: 'spec-3',
    title: 'Pediatrics & Child Care',
    description: 'Specialized infant care, child vaccination tracking, and growth monitoring.',
    icon: 'pi pi-user',
    activeDoctors: 15
  },
  {
    id: 'spec-4',
    title: 'Orthopedics & Joint Care',
    description: 'Bone fracture care, joint replacement consultation, and physical therapy.',
    icon: 'pi pi-shield',
    activeDoctors: 10
  },
  {
    id: 'spec-5',
    title: 'Ophthalmology & Vision Care',
    description: 'Comprehensive eye exams, glaucoma screening, and vision correction.',
    icon: 'pi pi-eye',
    activeDoctors: 7
  },
  {
    id: 'spec-6',
    title: 'Dermatology & Skin Care',
    description: 'Treatment for acne, eczema, psoriasis, and cosmetic skin procedures.',
    icon: 'pi pi-sparkles',
    activeDoctors: 9
  },
  {
    id: 'spec-7',
    title: 'ENT & Head Neck Care',
    description: 'Ear infection care, sinus allergy relief, and hearing loss assessment.',
    icon: 'pi pi-volume-up',
    activeDoctors: 6
  },
  {
    id: 'spec-8',
    title: 'General Internal Medicine',
    description: 'Primary care, diabetes management, annual health checkups, and consultations.',
    icon: 'pi pi-briefcase',
    activeDoctors: 20
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'rep-1',
    reportNo: 'REP-2026-9001',
    patientName: 'Mahbubur Rahman',
    nidNumber: '1985345678901234',
    doctorName: 'Dr. Farhana Ahmed (Cardiologist)',
    testType: 'Comprehensive Cardiac Lipid Profile & ECG',
    urgency: 'High',
    status: 'Completed',
    date: '2026-08-01',
    summary: 'Lipid parameters within healthy range. Minor ST segment variation noted; follow-up in 30 days.'
  },
  {
    id: 'rep-2',
    reportNo: 'REP-2026-9002',
    patientName: 'Nusrat Sultana',
    nidNumber: '1992456789012345',
    doctorName: 'Dr. Kazi Tanvir (Neurologist)',
    testType: 'Brain MRI & EEG Assessment',
    urgency: 'Urgent',
    status: 'In Progress',
    date: '2026-08-02',
    summary: 'MRI scans completed. EEG signal processing under specialist review.'
  },
  {
    id: 'rep-3',
    reportNo: 'REP-2026-9003',
    patientName: 'Anwar Hossain',
    nidNumber: '1970123456789012',
    doctorName: 'Dr. Shahriar Kabir (Orthopedic)',
    testType: 'Lumbar Spine Digital X-Ray',
    urgency: 'Normal',
    status: 'Completed',
    date: '2026-08-03',
    summary: 'L4-L5 disc mild degeneration. Physical therapy recommended twice weekly.'
  },
  {
    id: 'rep-4',
    reportNo: 'REP-2026-9004',
    patientName: 'Sharmin Chowdhury',
    nidNumber: '1998789012345678',
    doctorName: 'Dr. Sabrina Haque (Dermatologist)',
    testType: 'Skin Allergy & Biopsy Panel',
    urgency: 'Normal',
    status: 'Pending',
    date: '2026-08-04',
    summary: 'Sample collected; awaiting lab culture sensitivity analysis.'
  },
  {
    id: 'rep-5',
    reportNo: 'REP-2026-9005',
    patientName: 'Tariqul Islam',
    nidNumber: '1989345678901234',
    doctorName: 'Dr. Rafiqul Hassan (Pediatrician)',
    testType: 'Complete Blood Count (CBC) & HbA1c',
    urgency: 'High',
    status: 'Action Required',
    date: '2026-08-05',
    summary: 'Hemoglobin slightly low (10.2 g/dL). Iron supplementation prescribed.'
  },
  {
    id: 'rep-6',
    reportNo: 'REP-2026-9006',
    patientName: 'Farida Yasmin',
    nidNumber: '1975567890123456',
    doctorName: 'Dr. Monirul Islam (ENT Specialist)',
    testType: 'Audiometric Hearing Threshold Test',
    urgency: 'Normal',
    status: 'Completed',
    date: '2026-08-06',
    summary: 'Bilateral mild high-frequency hearing loss. Earwax clearance performed.'
  },
  {
    id: 'rep-7',
    reportNo: 'REP-2026-9007',
    patientName: 'Sajid Mahmud',
    nidNumber: '2000123456789012',
    doctorName: 'Dr. Nazmul Huda (Ophthalmologist)',
    testType: 'Intraocular Pressure & Retina Scan',
    urgency: 'Urgent',
    status: 'Completed',
    date: '2026-08-07',
    summary: 'Normal eye pressure (14 mmHg). Retinal nerve fiber layer intact.'
  },
  {
    id: 'rep-8',
    reportNo: 'REP-2026-9008',
    patientName: 'Rokeya Begum',
    nidNumber: '1962901234567890',
    doctorName: 'Dr. Asif Iqbal (Medicine Specialist)',
    testType: 'Kidney Function Test (Serum Creatinine & Uric Acid)',
    urgency: 'High',
    status: 'In Progress',
    date: '2026-08-08',
    summary: 'Serum Creatinine 1.1 mg/dL. Hydration protocol initiated.'
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'How do I book a doctor appointment on AccessiHealth?',
    answer: 'Navigate to the "Book Appointment" tab, choose your preferred medical specialty, fill in your patient details (Name, NID, Mobile Number), and select urgency level.',
    category: 'Appointment'
  },
  {
    id: 'faq-2',
    question: 'How does the AccessiMate Widget help visually impaired patients?',
    answer: 'Click the floating AccessiMate icon at the bottom of the screen to activate Text Magnifier, High Contrast modes, Dyslexia-friendly font replacement, and Screen Reader Text-to-Speech.',
    category: 'Accessibility'
  },
  {
    id: 'faq-3',
    question: 'How can I lookup my medical test report status?',
    answer: 'Enter your unique Medical Report Code (e.g., REP-2026-9001) in the Medical Directory search bar to view instant diagnostic results.',
    category: 'Reports'
  },
  {
    id: 'faq-4',
    question: 'Are my health records compliant with privacy standards?',
    answer: 'Yes, AccessiHealth follows strict patient data privacy protocols ensuring all diagnostic reports and personal NID data remain confidential.',
    category: 'Privacy'
  }
];

class DataService {
  constructor() {
    this.reports = [...INITIAL_REPORTS];
    this.auditLogs = [];
  }

  getSpecialties() {
    return Promise.resolve([...SPECIALTIES]);
  }

  getReports(search = '', status = 'All') {
    let list = [...this.reports];
    if (status && status !== 'All') {
      list = list.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(r =>
        r.reportNo.toLowerCase().includes(q) ||
        r.patientName.toLowerCase().includes(q) ||
        r.nidNumber.includes(q) ||
        r.testType.toLowerCase().includes(q) ||
        r.doctorName.toLowerCase().includes(q)
      );
    }
    return Promise.resolve(list);
  }

  lookupReport(reportNo) {
    const found = this.reports.find(
      r => r.reportNo.toLowerCase() === reportNo.trim().toLowerCase()
    );
    return Promise.resolve(found || null);
  }

  bookAppointment(data) {
    const newReportNo = `REP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const matchedSpec = SPECIALTIES.find(s => s.id === data.specialtyId);
    
    const newRecord = {
      id: `rep-${Date.now()}`,
      reportNo: newReportNo,
      patientName: data.patientName,
      nidNumber: data.nidNumber,
      doctorName: matchedSpec ? `Specialist (${matchedSpec.title})` : 'Consultant Physician',
      testType: `${data.serviceTitle || 'Telemedicine Consultation'}`,
      urgency: data.priority || 'Normal',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      summary: `Patient statement: ${data.symptoms}`
    };

    this.reports.unshift(newRecord);
    return Promise.resolve(newRecord);
  }

  getFaqs() {
    return Promise.resolve([...FAQS]);
  }

  saveAuditLog(logData) {
    const item = {
      id: `log-${Date.now()}`,
      ...logData,
      createdAt: new Date().toISOString()
    };
    this.auditLogs.unshift(item);
    return Promise.resolve(item);
  }
}

export const dataService = new DataService();
