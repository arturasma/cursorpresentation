import { format, addDays } from 'date-fns';
import type { ExamFormData } from '@/types/exam';

// Mock exam data templates
const MOCK_EXAMS: ExamFormData[] = [
  {
    name: 'Q4 Mathematics Final Assessment',
    subject: 'mathematics',
    examType: 'final-exam',
    gradeLevel: 'grade-11',
    school: 'tallinna-kesklinna-gumnaasium',
    location: 'Room 304, Building A',
    scheduledDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    scheduledTime: '09:00',
    teacherName: '',
    durationMinutes: 120,
    numberOfBreaks: 1,
    breakDurationMinutes: 15,
  },
  {
    name: 'Physics Midterm - Mechanics',
    subject: 'physics',
    examType: 'midterm',
    gradeLevel: 'grade-10',
    school: 'tartu-annelinna-gumnaasium',
    location: 'Laboratory B2',
    scheduledDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
    scheduledTime: '10:30',
    teacherName: '',
    durationMinutes: 90,
    numberOfBreaks: 1,
    breakDurationMinutes: 10,
  },
  {
    name: 'English Language Proficiency Test',
    subject: 'english-language',
    examType: 'test',
    gradeLevel: 'grade-9',
    school: 'tallinna-kesklinna-gumnaasium',
    location: 'Room 102, Main Building',
    scheduledDate: format(addDays(new Date(), 10), 'yyyy-MM-dd'),
    scheduledTime: '14:00',
    teacherName: '',
    durationMinutes: 75,
    numberOfBreaks: 0,
    breakDurationMinutes: 0,
  },
  {
    name: 'History Quiz - World War II',
    subject: 'history',
    examType: 'quiz',
    gradeLevel: 'grade-12',
    school: 'tartu-annelinna-gumnaasium',
    location: 'Room 215, Building C',
    scheduledDate: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
    scheduledTime: '11:00',
    teacherName: '',
    durationMinutes: 45,
    numberOfBreaks: 0,
    breakDurationMinutes: 0,
  },
  {
    name: 'Chemistry Practice Exam - Organic Chemistry',
    subject: 'chemistry',
    examType: 'practice-exam',
    gradeLevel: 'grade-11',
    school: 'tallinna-kesklinna-gumnaasium',
    location: 'Chemistry Lab 1',
    scheduledDate: format(addDays(new Date(), 21), 'yyyy-MM-dd'),
    scheduledTime: '13:30',
    teacherName: '',
    durationMinutes: 100,
    numberOfBreaks: 2,
    breakDurationMinutes: 10,
  },
];

/**
 * Gets a random mock exam data set, avoiding duplicate exam names
 * @param existingNames - Array of exam names that already exist to avoid duplicates
 * @param teacherName - The teacher's name to set in the mock data
 * @returns A random ExamFormData object with unique name
 */
export function getRandomMockExam(
  existingNames: string[] = [],
  teacherName: string = ''
): ExamFormData {
  // Filter out exams with names that already exist
  const availableExams = MOCK_EXAMS.filter(
    (exam) => !existingNames.includes(exam.name)
  );

  // If all mock exams already exist, append a timestamp to make it unique
  if (availableExams.length === 0) {
    const randomExam = MOCK_EXAMS[Math.floor(Math.random() * MOCK_EXAMS.length)];
    const timestamp = Date.now();
    return {
      ...randomExam,
      name: `${randomExam.name} (${timestamp})`,
      teacherName,
    };
  }

  // Select a random exam from available ones
  const randomIndex = Math.floor(Math.random() * availableExams.length);
  const selectedExam = availableExams[randomIndex];

  return {
    ...selectedExam,
    teacherName,
  };
}

