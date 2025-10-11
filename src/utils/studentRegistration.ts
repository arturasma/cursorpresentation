import type { Exam, StudentRegistration } from '@/types/exam';
import { examStorage } from './examStorage';

// Generate a PIN from ID code, exam date, and ID card last digits
function generatePIN(idCode: string, examDate: string, idCardLastDigits: string): string {
  const hash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };
  
  // Combine ID code, exam date, and ID card digits for unique PIN
  const combined = `${idCode}${examDate}${idCardLastDigits}`;
  const numHash = hash(combined);
  const pin = String(numHash).slice(0, 8).padStart(8, '0');
  return `${pin.slice(0, 4)}-${pin.slice(4, 8)}`;
}

export const studentRegistration = {
  register(examId: string, studentName: string, idCode: string, idCardLastDigits: string): boolean {
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
      
      const registration: StudentRegistration = {
        studentId: crypto.randomUUID(),
        studentName,
        idCode,
        idCardLastDigits,
        registeredAt: new Date().toISOString(),
        pin: generatePIN(idCode, exam.scheduledDate, idCardLastDigits),
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
  }
};

