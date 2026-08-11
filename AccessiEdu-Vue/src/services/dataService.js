// Static data service for AccessiEdu Vue 3 Portal

export const COURSES = [
  {
    id: 'course-1',
    title: 'Accessible Web Design & WCAG 2.1',
    category: 'Web Development',
    instructor: 'Prof. Tanvir Ahmed',
    duration: '6 Weeks',
    students: 1240,
    icon: 'pi pi-desktop',
    level: 'Beginner to Advanced'
  },
  {
    id: 'course-2',
    title: 'Full-Stack Vue 3 & Nuxt Architecture',
    category: 'Software Engineering',
    instructor: 'Engr. Nusrat Jahan',
    duration: '8 Weeks',
    students: 890,
    icon: 'pi pi-code',
    level: 'Intermediate'
  },
  {
    id: 'course-3',
    title: 'Digital Governance & Public Service Systems',
    category: 'Public Administration',
    instructor: 'Dr. Mahbubur Rahman',
    duration: '4 Weeks',
    students: 1560,
    icon: 'pi pi-building',
    level: 'All Levels'
  },
  {
    id: 'course-4',
    title: 'Cybersecurity & Citizen Data Privacy',
    category: 'Information Security',
    instructor: 'Dr. Rafiqul Islam',
    duration: '10 Weeks',
    students: 720,
    icon: 'pi pi-shield',
    level: 'Advanced'
  }
];

export const INITIAL_STUDENTS = [
  {
    id: 'std-1',
    studentId: 'EDU-2026-7001',
    studentName: 'Sajid Hossain',
    nidNumber: '1990345678901234',
    courseTitle: 'Accessible Web Design & WCAG 2.1',
    enrollmentType: 'Merit Stipend',
    status: 'Verified',
    enrolledDate: '2026-08-01',
    grade: 'A+'
  },
  {
    id: 'std-2',
    studentId: 'EDU-2026-7002',
    studentName: 'Sharmin Akter',
    nidNumber: '1995456789012345',
    courseTitle: 'Full-Stack Vue 3 & Nuxt Architecture',
    enrollmentType: 'Regular Self-Paced',
    status: 'In Progress',
    enrolledDate: '2026-08-02',
    grade: 'Pending'
  },
  {
    id: 'std-3',
    studentId: 'EDU-2026-7003',
    studentName: 'Tariqul Islam',
    nidNumber: '1988123456789012',
    courseTitle: 'Digital Governance & Public Service Systems',
    enrollmentType: 'Govt Officer Grant',
    status: 'Verified',
    enrolledDate: '2026-08-03',
    grade: 'A'
  },
  {
    id: 'std-4',
    studentId: 'EDU-2026-7004',
    studentName: 'Farhana Chowdhury',
    nidNumber: '1997789012345678',
    courseTitle: 'Cybersecurity & Citizen Data Privacy',
    enrollmentType: 'Regular Self-Paced',
    status: 'Pending Approval',
    enrolledDate: '2026-08-04',
    grade: 'N/A'
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'What is AccessiEdu Student Portal?',
    answer: 'AccessiEdu is an accessible e-learning portal built with Vue 3 to demonstrate educational accessibility and test the AccessiMate widget.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How do I test AccessiMate in Vue 3?',
    answer: 'Click the floating AccessiMate icon at the bottom corner of your screen to trigger font scaling, high contrast, screen reader speech, and dyslexia replacement filters.',
    category: 'Accessibility'
  },
  {
    id: 'faq-3',
    question: 'How do I verify my student enrollment code?',
    answer: 'Enter your unique Student ID (e.g. EDU-2026-7001) in the Student Verification Directory search box.',
    category: 'Directory'
  }
];

class DataService {
  constructor() {
    this.students = [...INITIAL_STUDENTS];
    this.auditLogs = [];
  }

  getCourses() {
    return Promise.resolve([...COURSES]);
  }

  getStudents(search = '', status = 'All') {
    let list = [...this.students];
    if (status && status !== 'All') {
      list = list.filter(s => s.status.toLowerCase() === status.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(s =>
        s.studentId.toLowerCase().includes(q) ||
        s.studentName.toLowerCase().includes(q) ||
        s.nidNumber.includes(q) ||
        s.courseTitle.toLowerCase().includes(q)
      );
    }
    return Promise.resolve(list);
  }

  lookupStudent(studentId) {
    const found = this.students.find(
      s => s.studentId.toLowerCase() === studentId.trim().toLowerCase()
    );
    return Promise.resolve(found || null);
  }

  enrollStudent(data) {
    const newStudentId = `EDU-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const matchedCourse = COURSES.find(c => c.id === data.courseId);

    const newRecord = {
      id: `std-${Date.now()}`,
      studentId: newStudentId,
      studentName: data.studentName,
      nidNumber: data.nidNumber,
      courseTitle: matchedCourse ? matchedCourse.title : 'General Academic Program',
      enrollmentType: data.enrollmentType || 'Regular Self-Paced',
      status: 'Pending Approval',
      enrolledDate: new Date().toISOString().split('T')[0],
      grade: 'N/A'
    };

    this.students.unshift(newRecord);
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
