import type { Exam, StudentRegistration } from '@/types/exam';
import { examStorage } from './examStorage';

// Generate a PIN from ID code and exam date
function generatePIN(idCode: string, examDate: string, studentId: string): string {
  const hash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };
  
  // Combine ID code, exam date, and student ID for unique PIN
  const combined = `${idCode}${examDate}${studentId}`;
  const numHash = hash(combined);
  const pin = String(numHash).slice(0, 8).padStart(8, '0');
  return `${pin.slice(0, 4)}-${pin.slice(4, 8)}`;
}

export const studentRegistration = {
  register(examId: string, studentName: string, idCode: string): boolean {
    try {
      const exams = examStorage.getAll();
      const exam = exams.find(e => e.id === examId);
      
      if (!exam) return false;
      
      // Check if already registered (by ID code)
      if (exam.registeredStudents.some(s => s.idCode === idCode)) {
        return false;
      }
      
      // Check if exam is full
      if (exam.registeredStudents.length >= exam.studentCount) {
        return false;
      }
      
      const studentId = crypto.randomUUID();
      const registration: StudentRegistration = {
        studentId,
        studentName,
        idCode,
        registeredAt: new Date().toISOString(),
        pin: generatePIN(idCode, exam.scheduledDate, studentId),
        teacherVerified: false,
        awaitingVerification: false,
      };
      
      exam.registeredStudents.push(registration);
      examStorage.update(examId, { registeredStudents: exam.registeredStudents });
      
      return true;
    } catch (error) {
      console.error('Error registering student:', error);
      return false;
    }
  },

  unregister(examId: string, idCode: string): boolean {
    try {
      const exams = examStorage.getAll();
      const exam = exams.find(e => e.id === examId);
      
      if (!exam) return false;
      
      const filteredStudents = exam.registeredStudents.filter(
        s => s.idCode !== idCode
      );
      
      examStorage.update(examId, { registeredStudents: filteredStudents });
      return true;
    } catch (error) {
      console.error('Error unregistering student:', error);
      return false;
    }
  },

  isRegistered(examId: string, idCode: string): boolean {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam) return false;
    
    return exam.registeredStudents.some(s => s.idCode === idCode);
  },

  getRegistration(examId: string, idCode: string): StudentRegistration | null {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam) return null;
    
    return exam.registeredStudents.find(s => s.idCode === idCode) || null;
  },

  getStudentExams(idCode: string): Exam[] {
    const exams = examStorage.getAll();
    return exams.filter(exam => 
      exam.registeredStudents.some(s => s.idCode === idCode)
    );
  },

  // Mark exam as completed for a student
  completeExam(examId: string, idCode: string): boolean {
    try {
      const exams = examStorage.getAll();
      const exam = exams.find(e => e.id === examId);
      
      if (!exam) return false;
      
      const studentIndex = exam.registeredStudents.findIndex(s => s.idCode === idCode);
      
      if (studentIndex === -1) return false;
      
      // Only mark as completed if not already completed
      if (!exam.registeredStudents[studentIndex].completedAt) {
        exam.registeredStudents[studentIndex].completedAt = new Date().toISOString();
        examStorage.update(examId, { registeredStudents: exam.registeredStudents });
      }
      
      return true;
    } catch (error) {
      console.error('Error completing exam:', error);
      return false;
    }
  },

  // Check if student has completed an exam
  isCompleted(examId: string, idCode: string): boolean {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam) return false;
    
    const registration = exam.registeredStudents.find(s => s.idCode === idCode);
    return registration?.completedAt !== undefined;
  },

  // Get completed exams for a student
  getCompletedExams(idCode: string): Exam[] {
    const exams = examStorage.getAll();
    return exams.filter(exam => {
      const registration = exam.registeredStudents.find(s => s.idCode === idCode);
      return registration?.completedAt !== undefined;
    });
  },

  // Get pending (registered but not completed) exams for a student
  getPendingExams(idCode: string): Exam[] {
    const exams = examStorage.getAll();
    return exams.filter(exam => {
      const registration = exam.registeredStudents.find(s => s.idCode === idCode);
      return registration && !registration.completedAt;
    });
  },

  // Mark student as awaiting teacher verification
  setAwaitingVerification(examId: string, idCode: string): boolean {
    try {
      const exams = examStorage.getAll();
      const exam = exams.find(e => e.id === examId);
      
      if (!exam) return false;
      
      const studentIndex = exam.registeredStudents.findIndex(s => s.idCode === idCode);
      
      if (studentIndex === -1) return false;
      
      // Don't set awaiting verification if already verified
      if (exam.registeredStudents[studentIndex].teacherVerified) {
        return true; // Return true since student is already verified
      }
      
      exam.registeredStudents[studentIndex].awaitingVerification = true;
      examStorage.update(examId, { registeredStudents: exam.registeredStudents });
      
      return true;
    } catch (error) {
      console.error('Error setting awaiting verification:', error);
      return false;
    }
  },

  // Verify student by teacher
  verifyStudent(examId: string, idCode: string, teacherName: string): boolean {
    try {
      const exams = examStorage.getAll();
      const exam = exams.find(e => e.id === examId);
      
      if (!exam) return false;
      
      const studentIndex = exam.registeredStudents.findIndex(s => s.idCode === idCode);
      
      if (studentIndex === -1) return false;
      
      exam.registeredStudents[studentIndex].teacherVerified = true;
      exam.registeredStudents[studentIndex].verifiedAt = new Date().toISOString();
      exam.registeredStudents[studentIndex].verifiedBy = teacherName;
      exam.registeredStudents[studentIndex].awaitingVerification = false;
      
      examStorage.update(examId, { registeredStudents: exam.registeredStudents });
      
      return true;
    } catch (error) {
      console.error('Error verifying student:', error);
      return false;
    }
  },

  // Check if student is verified
  isVerified(examId: string, idCode: string): boolean {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam) return false;
    
    const registration = exam.registeredStudents.find(s => s.idCode === idCode);
    return registration?.teacherVerified === true;
  },

  // Check if student is awaiting verification
  isAwaitingVerification(examId: string, idCode: string): boolean {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam) return false;
    
    const registration = exam.registeredStudents.find(s => s.idCode === idCode);
    return registration?.awaitingVerification === true;
  },

  // Get students awaiting verification for an exam (not yet verified)
  getPendingVerifications(examId: string): StudentRegistration[] {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam) return [];
    
    return exam.registeredStudents.filter(s => s.awaitingVerification === true && s.teacherVerified !== true);
  },

  // Get all verified students for an exam
  getVerifiedStudents(examId: string): StudentRegistration[] {
    const exams = examStorage.getAll();
    const exam = exams.find(e => e.id === examId);
    
    if (!exam) return [];
    
    return exam.registeredStudents.filter(s => s.teacherVerified === true);
  }
};

