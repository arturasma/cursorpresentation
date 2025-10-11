export interface StudentRegistration {
  studentId: string;
  studentName: string;
  registeredAt: string;
  pin: string;
}

export interface Exam {
  id: string;
  name: string;
  examType: string;
  location: string;
  scheduledDate: string;
  scheduledTime: string;
  studentCount: number;
  status: 'scheduled' | 'active' | 'completed';
  createdAt: string;
  registeredStudents: StudentRegistration[];
}

export interface ExamFormData {
  name: string;
  examType: string;
  location: string;
  scheduledDate: string;
  scheduledTime: string;
}

