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
}

export interface ExamFormData {
  name: string;
  examType: string;
  location: string;
  scheduledDate: string;
  scheduledTime: string;
}

