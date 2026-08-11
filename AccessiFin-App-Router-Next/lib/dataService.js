// Static data service for AccessiFin Next.js Banking Portal

export const BANKING_SERVICES = [
  {
    id: 'serv-1',
    title: 'Citizen Savings & DPS Account',
    description: 'High-yield accessible savings account with digital monthly DPS scheme.',
    icon: 'pi pi-wallet',
    category: 'Accounts'
  },
  {
    id: 'serv-2',
    title: 'SME Business & Startup Micro-Loan',
    description: 'Low-interest commercial credit for cottage, micro, and small enterprises.',
    icon: 'pi pi-briefcase',
    category: 'Loans'
  },
  {
    id: 'serv-3',
    title: 'Senior Citizen Pension Disbursement',
    description: 'Direct government pension credit transfer with automated SMS alert.',
    icon: 'pi pi-heart',
    category: 'Grants'
  },
  {
    id: 'serv-4',
    title: 'Expatriate Remittance Guarantee',
    description: 'Instant foreign currency remittance cash incentive payout portal.',
    icon: 'pi pi-globe',
    category: 'Remittance'
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-1',
    txNo: 'FIN-2026-6001',
    applicantName: 'Moklesur Rahman',
    nidNumber: '1982345678901234',
    serviceTitle: 'SME Micro-Loan Application',
    amount: 'BDT 500,000',
    priority: 'High',
    status: 'Approved',
    date: '2026-08-01'
  },
  {
    id: 'tx-2',
    txNo: 'FIN-2026-6002',
    applicantName: 'Nazma Begum',
    nidNumber: '1991456789012345',
    serviceTitle: 'Senior Pension Account Enrolment',
    amount: 'BDT 15,000 / month',
    priority: 'Urgent',
    status: 'In Progress',
    date: '2026-08-02'
  },
  {
    id: 'tx-3',
    txNo: 'FIN-2026-6003',
    applicantName: 'Kamrul Hasan',
    nidNumber: '1975123456789012',
    serviceTitle: 'Remittance Incentive Claim',
    amount: 'BDT 85,000',
    priority: 'Normal',
    status: 'Completed',
    date: '2026-08-03'
  },
  {
    id: 'tx-4',
    txNo: 'FIN-2026-6004',
    applicantName: 'Sharmin Sultana',
    nidNumber: '1998789012345678',
    serviceTitle: 'Citizen Savings DPS Scheme',
    amount: 'BDT 5,000 / month',
    priority: 'Normal',
    status: 'Pending',
    date: '2026-08-04'
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'What is AccessiFin Digital Banking?',
    answer: 'AccessiFin is an accessible digital financial portal created to provide inclusive banking services and test the AccessiMate widget in Next.js App Router.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How do I test AccessiMate in Next.js?',
    answer: 'Click the floating AccessiMate icon at the bottom corner of your screen to test contrast mode, font magnification, screen reader speech, and dyslexia replacement.',
    category: 'Accessibility'
  },
  {
    id: 'faq-3',
    question: 'How do I track my loan application status?',
    answer: 'Enter your unique Reference Code (e.g. FIN-2026-6001) in the Directory & Lookup page.',
    category: 'Loans'
  }
];

class DataService {
  constructor() {
    this.transactions = [...INITIAL_TRANSACTIONS];
    this.auditLogs = [];
  }

  getServices() {
    return Promise.resolve([...BANKING_SERVICES]);
  }

  getTransactions(search = '', status = 'All') {
    let list = [...this.transactions];
    if (status && status !== 'All') {
      list = list.filter(t => t.status.toLowerCase() === status.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(t =>
        t.txNo.toLowerCase().includes(q) ||
        t.applicantName.toLowerCase().includes(q) ||
        t.nidNumber.includes(q) ||
        t.serviceTitle.toLowerCase().includes(q)
      );
    }
    return Promise.resolve(list);
  }

  lookupTransaction(txNo) {
    const found = this.transactions.find(
      t => t.txNo.toLowerCase() === txNo.trim().toLowerCase()
    );
    return Promise.resolve(found || null);
  }

  applyLoan(data) {
    const newTxNo = `FIN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const matchedService = BANKING_SERVICES.find(s => s.id === data.serviceId);

    const newRecord = {
      id: `tx-${Date.now()}`,
      txNo: newTxNo,
      applicantName: data.applicantName,
      nidNumber: data.nidNumber,
      serviceTitle: matchedService ? matchedService.title : 'Micro-Credit Application',
      amount: `BDT ${data.amount || '100,000'}`,
      priority: data.priority || 'Normal',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    this.transactions.unshift(newRecord);
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
