import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import StudentExamList from '@/components/features/student/StudentExamList';
import { examStorage } from '@/utils/examStorage';
import { studentRegistration } from '@/utils/studentRegistration';
import type { Exam } from '@/types/exam';

export default function StudentPage() {
  // Use a default student ID from localStorage or generate one
  const [studentName] = useState<string>(() => {
    let name = localStorage.getItem('studentIdentity');
    if (!name) {
      name = `Student-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('studentIdentity', name);
    }
    return name;
  });
  
  const [exams, setExams] = useState<Exam[]>([]);
  const [registeredExamIds, setRegisteredExamIds] = useState<Set<string>>(new Set());
  const [studentPINs, setStudentPINs] = useState<Map<string, string>>(new Map());

  const loadExams = () => {
    const allExams = examStorage.getAll();
    setExams(allExams);

    const registered = new Set<string>();
    const pins = new Map<string, string>();

    allExams.forEach(exam => {
      const registration = studentRegistration.getRegistration(exam.id, studentName);
      if (registration) {
        registered.add(exam.id);
        pins.set(exam.id, registration.pin);
      }
    });

    setRegisteredExamIds(registered);
    setStudentPINs(pins);
  };

  useEffect(() => {
    loadExams();
  }, [studentName]);

  const handleRegister = (examId: string) => {
    if (studentRegistration.register(examId, studentName)) {
      loadExams();
    } else {
      alert('Unable to register for this exam. It may be full or you are already registered.');
    }
  };

  const handleUnregister = (examId: string) => {
    if (window.confirm('Are you sure you want to unregister from this exam?')) {
      if (studentRegistration.unregister(examId, studentName)) {
        loadExams();
      }
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Available Exams</h1>
            <p className="text-muted-foreground mt-1">Browse and register for exams</p>
          </div>

          <StudentExamList
            exams={exams}
            studentName={studentName}
            registeredExamIds={registeredExamIds}
            studentPINs={studentPINs}
            onRegister={handleRegister}
            onUnregister={handleUnregister}
          />
        </div>
      </main>
    </>
  );
}

