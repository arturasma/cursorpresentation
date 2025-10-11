export interface StudentRegistration {
  studentId: string;
  studentName: string;
  idCode: string; // Estonian Isikukood
  idCardLastDigits: string; // Last 3 digits of ID card document number
  registeredAt: string;
  pin: string;
}

export interface Exam {
  id: string;
  name: string;
  subject: string;
  examType: string;
  gradeLevel: string;
  school: string;
  location: string;
  scheduledDate: string;
  scheduledTime: string;
  studentCount: number;
  status: 'scheduled' | 'active' | 'completed';
  teacherName: string;
  createdAt: string;
  registeredStudents: StudentRegistration[];
}

export interface ExamFormData {
  name: string;
  subject: string;
  examType: string;
  gradeLevel: string;
  school: string;
  location: string;
  scheduledDate: string;
  scheduledTime: string;
  teacherName: string;
}

