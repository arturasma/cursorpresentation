export interface StudentRegistration {
  studentId: string;
  studentName: string;
  idCode: string; // Estonian Isikukood
  idCardLastDigits: string; // Last 3 digits of ID card document number
  registeredAt: string;
  pin: string;
  completedAt?: string; // Timestamp when student completed the exam
  teacherVerified: boolean; // Whether teacher has verified student identity
  verifiedAt?: string; // Timestamp when teacher verified
  verifiedBy?: string; // Name of teacher who verified
  awaitingVerification?: boolean; // Student entered PIN and waiting for teacher
}

export interface ExamSession {
  examId: string;
  roomCode: string; // 4-digit code for location validation
  activeAt: string; // Timestamp when session was activated
  teacherId: string; // ID of teacher who activated session
  activatedBy: string; // Name of teacher who activated session
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
  activeSession?: ExamSession; // Active exam session with room code
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

