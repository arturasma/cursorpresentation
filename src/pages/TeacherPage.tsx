import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ExamCreationModal from '@/components/features/teacher/ExamCreationModal';
import ExamList from '@/components/features/teacher/ExamList';
import ExamDetailsModal from '@/components/features/teacher/ExamDetailsModal';
import { examStorage } from '@/utils/examStorage';
import type { Exam } from '@/types/exam';

export default function TeacherPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const loadExams = () => {
    setExams(examStorage.getAll());
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      examStorage.delete(id);
      loadExams();
    }
  };

  const handleOpenExam = (exam: Exam) => {
    setSelectedExam(exam);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedExam(null);
  };

  const handleExamUpdated = () => {
    loadExams();
  };

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Exam Management</h1>
            <ExamCreationModal onExamCreated={loadExams} />
          </div>

          <ExamList 
            exams={exams} 
            onDelete={handleDelete}
            onOpenExam={handleOpenExam}
            onCreateExam={loadExams}
          />
        </div>
      </main>

      {selectedExam && (
        <ExamDetailsModal
          exam={selectedExam}
          open={isDetailsOpen}
          onClose={handleCloseDetails}
          onUpdate={handleExamUpdated}
          onDelete={() => {
            handleDelete(selectedExam.id);
            handleCloseDetails();
          }}
        />
      )}
    </>
  );
}

