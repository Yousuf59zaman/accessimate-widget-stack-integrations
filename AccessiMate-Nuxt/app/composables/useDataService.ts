// Static composable data service for AccessiGov Nuxt 3 Portal

export interface GovService {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  status: string;
}

export interface CitizenRecord {
  id: string;
  appNo: string;
  citizenName: string;
  nidNumber: string;
  serviceTitle: string;
  district: string;
  status: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const GOV_SERVICES: GovService[] = [
  {
    id: 'gov-1',
    title: 'Smart Citizen ID Verification',
    category: 'Identity',
    description: 'Instant national biometric smart ID verification & reissue service.',
    icon: 'pi pi-id-card',
    status: 'Active'
  },
  {
    id: 'gov-2',
    title: 'E-Trade License Renewal',
    category: 'Commerce',
    description: 'Automated commercial trade license issuance and tax clearance.',
    icon: 'pi pi-briefcase',
    status: 'Active'
  },
  {
    id: 'gov-3',
    title: 'Social Safety Net Stipend',
    category: 'Welfare',
    description: 'Direct allowance distribution for elderly, widow, and disabled citizens.',
    icon: 'pi pi-heart',
    status: 'Active'
  },
  {
    id: 'gov-4',
    title: 'Digital Birth & Death Registration',
    category: 'Civil Status',
    description: 'Unified online civil status registration & QR code verified certificates.',
    icon: 'pi pi-file',
    status: 'Active'
  }
];

export const INITIAL_CITIZEN_RECORDS: CitizenRecord[] = [
  {
    id: 'rec-1',
    appNo: 'GOV-2026-9001',
    citizenName: 'Kabir Uddin',
    nidNumber: '1985123456789012',
    serviceTitle: 'Smart Citizen ID Verification',
    district: 'Dhaka',
    status: 'Approved',
    date: '2026-08-01'
  },
  {
    id: 'rec-2',
    appNo: 'GOV-2026-9002',
    citizenName: 'Rokeha Khanam',
    nidNumber: '1992456789012345',
    serviceTitle: 'Social Safety Net Stipend',
    district: 'Chittagong',
    status: 'In Progress',
    date: '2026-08-02'
  },
  {
    id: 'rec-3',
    appNo: 'GOV-2026-9003',
    citizenName: 'Jahangir Alam',
    nidNumber: '1978345678901234',
    serviceTitle: 'E-Trade License Renewal',
    district: 'Rajshahi',
    status: 'Verified',
    date: '2026-08-03'
  },
  {
    id: 'rec-4',
    appNo: 'GOV-2026-9004',
    citizenName: 'Nasrin Sultana',
    nidNumber: '1996789012345678',
    serviceTitle: 'Digital Birth Registration',
    district: 'Sylhet',
    status: 'Pending',
    date: '2026-08-04'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is AccessiGov Nuxt 3 Portal?',
    answer: 'AccessiGov is an accessible public e-services portal built with Nuxt 3 to demonstrate government service accessibility and test the AccessiMate widget.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How do I test AccessiMate in Nuxt 3?',
    answer: 'Click the floating AccessiMate icon at the bottom corner of your screen to trigger font scaling, high contrast, screen reader speech, and dyslexia replacement filters.',
    category: 'Accessibility'
  },
  {
    id: 'faq-3',
    question: 'How do I track my e-service application status?',
    answer: 'Enter your unique Reference Code (e.g. GOV-2026-9001) in the Directory & Lookup page.',
    category: 'Directory'
  }
];

export const useDataService = () => {
  const records = ref<CitizenRecord[]>([...INITIAL_CITIZEN_RECORDS]);
  const auditLogs = ref<any[]>([]);

  const getServices = () => Promise.resolve([...GOV_SERVICES]);

  const getRecords = (search = '', status = 'All') => {
    let list = [...records.value];
    if (status && status !== 'All') {
      list = list.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(r =>
        r.appNo.toLowerCase().includes(q) ||
        r.citizenName.toLowerCase().includes(q) ||
        r.nidNumber.includes(q) ||
        r.serviceTitle.toLowerCase().includes(q)
      );
    }
    return Promise.resolve(list);
  };

  const lookupRecord = (appNo: string) => {
    const found = records.value.find(
      r => r.appNo.toLowerCase() === appNo.trim().toLowerCase()
    );
    return Promise.resolve(found || null);
  };

  const applyService = (data: any) => {
    const newAppNo = `GOV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const matched = GOV_SERVICES.find(s => s.id === data.serviceId);

    const newRecord: CitizenRecord = {
      id: `rec-${Date.now()}`,
      appNo: newAppNo,
      citizenName: data.citizenName,
      nidNumber: data.nidNumber,
      serviceTitle: matched ? matched.title : 'General Public E-Service',
      district: data.district || 'Dhaka',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    records.value.unshift(newRecord);
    return Promise.resolve(newRecord);
  };

  const getFaqs = () => Promise.resolve([...FAQS]);

  const saveAuditLog = (logData: any) => {
    const item = {
      id: `log-${Date.now()}`,
      ...logData,
      createdAt: new Date().toISOString()
    };
    auditLogs.value.unshift(item);
    return Promise.resolve(item);
  };

  return {
    getServices,
    getRecords,
    lookupRecord,
    applyService,
    getFaqs,
    saveAuditLog
  };
};
