import type { Exam, ExamFormData } from '@/types/exam';

const EXAMS_STORAGE_KEY = 'exams';

export const examStorage = {
  getAll(): Exam[] {
    try {
      const exams = localStorage.getItem(EXAMS_STORAGE_KEY);
      const parsed = exams ? JSON.parse(exams) : [];
      // Ensure all exams have required fields (migration for old data)
      return parsed.map((exam: Exam) => ({
        ...exam,
        subject: exam.subject || 'mathematics',
        gradeLevel: exam.gradeLevel || 'grade-9',
        school: exam.school || 'tallinna-kesklinna-gumnaasium',
        teacherName: exam.teacherName || 'Unknown Teacher',
        registeredStudents: exam.registeredStudents || []
      }));
    } catch (error) {
      console.error('Error reading exams from localStorage:', error);
      return [];
    }
  },

  create(formData: ExamFormData): Exam {
    const exams = this.getAll();
    const newExam: Exam = {
      ...formData,
      id: crypto.randomUUID(),
      status: 'scheduled',
      studentCount: 30, // Default student count per class
      createdAt: new Date().toISOString(),
      registeredStudents: [],
    };
    
    exams.push(newExam);
    this.save(exams);
    return newExam;
  },

  delete(id: string): boolean {
    try {
      const exams = this.getAll();
      const filteredExams = exams.filter(exam => exam.id !== id);
      this.save(filteredExams);
      return true;
    } catch (error) {
      console.error('Error deleting exam:', error);
      return false;
    }
  },

  update(id: string, updates: Partial<Exam>): Exam | null {
    const exams = this.getAll();
    const index = exams.findIndex(exam => exam.id === id);
    
    if (index === -1) return null;
    
    exams[index] = { ...exams[index], ...updates };
    this.save(exams);
    return exams[index];
  },

  save(exams: Exam[]): void {
    try {
      localStorage.setItem(EXAMS_STORAGE_KEY, JSON.stringify(exams));
    } catch (error) {
      console.error('Error saving exams to localStorage:', error);
    }
  },

  clear(): void {
    localStorage.removeItem(EXAMS_STORAGE_KEY);
  }
};

