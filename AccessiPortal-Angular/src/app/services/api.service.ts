import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  _count?: { applications: number };
}

export interface CitizenApplication {
  id: string;
  trackingNo: string;
  applicantName: string;
  nidNumber: string;
  email: string;
  phone: string;
  serviceType: string;
  priority: string;
  description: string;
  address: string;
  fileUrl?: string;
  status: string;
  submittedAt: string;
  category?: ServiceCategory;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private staticCategories: ServiceCategory[] = [
    {
      id: 'cat-1',
      title: 'NID & Identity Services',
      description: 'Smart NID card correction, new application, lost card re-issue & voter transfer.',
      icon: 'pi pi-id-card',
      slug: 'nid-identity',
      _count: { applications: 3 }
    },
    {
      id: 'cat-2',
      title: 'Trade License & Business',
      description: 'Commercial & E-Commerce Trade License issuance, renewal & ownership mutation.',
      icon: 'pi pi-briefcase',
      slug: 'trade-license',
      _count: { applications: 2 }
    },
    {
      id: 'cat-3',
      title: 'Social Safety Net & Grants',
      description: 'Senior citizen pension, disability support grant, widow allowance & maternity aid.',
      icon: 'pi pi-heart',
      slug: 'social-safety',
      _count: { applications: 2 }
    },
    {
      id: 'cat-4',
      title: 'Land & Utility Services',
      description: 'Holding tax revision, commercial mutation certificate, WASA & electricity connection.',
      icon: 'pi pi-building',
      slug: 'land-utility',
      _count: { applications: 2 }
    },
    {
      id: 'cat-5',
      title: 'Passport & Immigration',
      description: 'E-Passport status check, urgent passport endorsement & clearance certificate.',
      icon: 'pi pi-globe',
      slug: 'passport-immigration',
      _count: { applications: 0 }
    },
    {
      id: 'cat-6',
      title: 'Driving License & BRTA',
      description: 'Learner license, Smart card driving license renewal & vehicle fitness certificate.',
      icon: 'pi pi-car',
      slug: 'brta-license',
      _count: { applications: 0 }
    },
    {
      id: 'cat-7',
      title: 'Birth & Death Registry',
      description: 'Digital birth registration certificate, correction & international translation.',
      icon: 'pi pi-file',
      slug: 'birth-death-registry',
      _count: { applications: 0 }
    },
    {
      id: 'cat-8',
      title: 'Education & Scholarship',
      description: 'Higher education merit stipend, primary education grant & freedom fighter scholarship.',
      icon: 'pi pi-book',
      slug: 'education-scholarship',
      _count: { applications: 1 }
    }
  ];

  private staticApplications: CitizenApplication[] = [
    {
      id: 'app-1',
      trackingNo: 'APP-2026-8901',
      applicantName: 'Rahim Uddin',
      nidNumber: '1987345678901234',
      email: 'rahim.uddin@example.com',
      phone: '01711002233',
      serviceType: 'Smart NID Correction',
      priority: 'High',
      description: 'Requesting correction of spelling in father name field as per Secondary School Certificate.',
      address: 'House 12, Ward 4, Mirpur 10, Dhaka',
      status: 'In Progress',
      submittedAt: '2026-08-01T10:00:00.000Z'
    },
    {
      id: 'app-2',
      trackingNo: 'APP-2026-8902',
      applicantName: 'Nusrat Jahan',
      nidNumber: '1990456789012345',
      email: 'nusrat.jahan@example.com',
      phone: '01812345678',
      serviceType: 'New Trade License',
      priority: 'Normal',
      description: 'New IT consultancy business registration trade license application.',
      address: 'Plot 45, Commercial Area, Sector 3, Uttara, Dhaka',
      status: 'Approved',
      submittedAt: '2026-08-02T11:30:00.000Z'
    },
    {
      id: 'app-3',
      trackingNo: 'APP-2026-8903',
      applicantName: 'Abdul Karim',
      nidNumber: '1965123456789012',
      email: 'karim.senior@example.com',
      phone: '01911223344',
      serviceType: 'Senior Citizen Pension',
      priority: 'Urgent',
      description: 'Monthly social security safety net pension enrollment for senior citizen aged 68.',
      address: 'Village-Rampur, Upazila-Sadar, Sylhet',
      status: 'Pending',
      submittedAt: '2026-08-03T09:15:00.000Z'
    },
    {
      id: 'app-4',
      trackingNo: 'APP-2026-8904',
      applicantName: 'Sharmin Akter',
      nidNumber: '1993789012345678',
      email: 'sharmin.akter@example.com',
      phone: '01511223344',
      serviceType: 'Holding Tax Revision',
      priority: 'Normal',
      description: 'Dispute regarding annual residential holding tax valuation rate increase.',
      address: 'Road 5, Block B, Banani, Dhaka',
      status: 'Rejected',
      submittedAt: '2026-08-04T14:20:00.000Z'
    },
    {
      id: 'app-5',
      trackingNo: 'APP-2026-8905',
      applicantName: 'Tanvir Hossain',
      nidNumber: '1992345678901234',
      email: 'tanvir.hossain@example.com',
      phone: '01611223344',
      serviceType: 'Disability Support Grant',
      priority: 'Urgent',
      description: 'Financial allowance support request for visually impaired citizen medical assistance.',
      address: 'House 88, Sector 3, Uttara, Dhaka',
      status: 'Approved',
      submittedAt: '2026-08-05T16:45:00.000Z'
    },
    {
      id: 'app-6',
      trackingNo: 'APP-2026-8906',
      applicantName: 'Mahmudul Hasan',
      nidNumber: '1988567890123456',
      email: 'mahmud.hasan@example.com',
      phone: '01733445566',
      serviceType: 'Lost Smart NID Re-issue',
      priority: 'High',
      description: 'Police GD filed regarding lost NID card; requesting urgent duplicate smart card.',
      address: 'Flat 4A, Green Road, Dhanmondi, Dhaka',
      status: 'In Progress',
      submittedAt: '2026-08-06T12:10:00.000Z'
    },
    {
      id: 'app-7',
      trackingNo: 'APP-2026-8907',
      applicantName: 'Farhana Chowdhury',
      nidNumber: '1995123456789012',
      email: 'farhana.c@example.com',
      phone: '01844556677',
      serviceType: 'E-Commerce Trade License',
      priority: 'Normal',
      description: 'Online boutique boutique business license application under digital commercial scheme.',
      address: 'House 23, Road 11, Gulshan 1, Dhaka',
      status: 'Pending',
      submittedAt: '2026-08-07T15:00:00.000Z'
    },
    {
      id: 'app-8',
      trackingNo: 'APP-2026-8908',
      applicantName: 'Kabir Hossain',
      nidNumber: '1978901234567890',
      email: 'kabir.hossain@example.com',
      phone: '01955667788',
      serviceType: 'WASA Water Connection Approval',
      priority: 'Normal',
      description: 'New pipeline utility connection permission for newly constructed 4-story building.',
      address: 'Sector 7, Uttara, Dhaka',
      status: 'Approved',
      submittedAt: '2026-08-08T08:30:00.000Z'
    },
    {
      id: 'app-9',
      trackingNo: 'APP-2026-8909',
      applicantName: 'Sabrina Islam',
      nidNumber: '2001123456789012',
      email: 'sabrina.i@example.com',
      phone: '01666778899',
      serviceType: 'Student Education Stipend',
      priority: 'Urgent',
      description: 'University merit-based tuition stipend grant for final year undergraduate semester.',
      address: 'University Housing, Agargaon, Dhaka',
      status: 'In Progress',
      submittedAt: '2026-08-09T11:00:00.000Z'
    },
    {
      id: 'app-10',
      trackingNo: 'APP-2026-8910',
      applicantName: 'Sajid Khan',
      nidNumber: '1984567890123456',
      email: 'sajid.khan@example.com',
      phone: '01777889900',
      serviceType: 'Commercial Mutation Certificate',
      priority: 'High',
      description: 'Commercial property ownership record mutation update request.',
      address: 'Plot 12, Motijheel C/A, Dhaka',
      status: 'Pending',
      submittedAt: '2026-08-10T13:40:00.000Z'
    }
  ];

  private staticFaqs: Faq[] = [
    {
      id: 'faq-1',
      question: 'What is the AccessiPortal Citizen Service?',
      answer: 'AccessiPortal is a digital government service portal designed to provide accessible citizen services and serve as a live testbed for the AccessiMate accessibility widget.',
      category: 'General'
    },
    {
      id: 'faq-2',
      question: 'How can I test the AccessiMate Accessibility Widget?',
      answer: 'Click the floating AccessiMate icon at the bottom corner of your screen. You can test High Contrast, Text Scaling, Screen Reader TTS, Colorblindness filters, and Keyboard Navigation.',
      category: 'Accessibility'
    },
    {
      id: 'faq-3',
      question: 'How do I track my submitted application status?',
      answer: 'Navigate to the Application Directory (/tracking) and enter your unique Tracking Number (e.g. APP-2026-8901) into the search box or filter by status.',
      category: 'Tracking'
    },
    {
      id: 'faq-4',
      question: 'Is my National ID data secure?',
      answer: 'Yes, AccessiPortal implements strict validation and data privacy protocols to ensure all applicant information remains protected.',
      category: 'Security'
    },
    {
      id: 'faq-5',
      question: 'Which WCAG standards are supported by this portal?',
      answer: 'AccessiPortal is crafted following WCAG 2.1 Level AA guidelines, featuring semantic HTML5 markup, ARIA landmark roles, visible keyboard focus indicators, and high contrast ratios.',
      category: 'Standards'
    }
  ];

  private staticAuditLogs: Array<{ id: string; feature: string; rating: number; comment: string; pageUrl: string; createdAt: string }> = [];

  getCategories(): Observable<{ success: boolean; data: ServiceCategory[] }> {
    return of({ success: true, data: [...this.staticCategories] }).pipe(delay(150));
  }

  getApplications(search = '', status = 'All'): Observable<{ success: boolean; data: CitizenApplication[] }> {
    let filtered = [...this.staticApplications];

    if (status && status !== 'All') {
      filtered = filtered.filter(app => app.status.toLowerCase() === status.toLowerCase());
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(app =>
        app.trackingNo.toLowerCase().includes(q) ||
        app.applicantName.toLowerCase().includes(q) ||
        app.nidNumber.includes(q) ||
        app.serviceType.toLowerCase().includes(q)
      );
    }

    return of({ success: true, data: filtered }).pipe(delay(150));
  }

  trackApplication(trackingNo: string): Observable<{ success: boolean; data?: CitizenApplication }> {
    const found = this.staticApplications.find(
      app => app.trackingNo.toLowerCase() === trackingNo.trim().toLowerCase()
    );
    return of({ success: true, data: found }).pipe(delay(150));
  }

  createApplication(payload: any): Observable<{ success: boolean; data: CitizenApplication }> {
    const newTrackingNo = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const matchedCategory = this.staticCategories.find(c => c.id === payload.categoryId);

    const newApp: CitizenApplication = {
      id: `app-${Date.now()}`,
      trackingNo: newTrackingNo,
      applicantName: payload.applicantName,
      nidNumber: payload.nidNumber,
      email: payload.email,
      phone: payload.phone,
      serviceType: payload.serviceType,
      priority: payload.priority || 'Normal',
      description: payload.description,
      address: payload.address,
      status: 'Pending',
      submittedAt: new Date().toISOString(),
      category: matchedCategory
    };

    this.staticApplications.unshift(newApp);
    return of({ success: true, data: newApp }).pipe(delay(250));
  }

  getFaqs(): Observable<{ success: boolean; data: Faq[] }> {
    return of({ success: true, data: [...this.staticFaqs] }).pipe(delay(150));
  }

  submitAccessibilityLog(payload: { feature: string; rating: number; comment: string; pageUrl: string }) {
    const logItem = {
      id: `log-${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString()
    };
    this.staticAuditLogs.unshift(logItem);
    return of({ success: true, data: logItem }).pipe(delay(200));
  }
}

