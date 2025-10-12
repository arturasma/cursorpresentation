import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ExamCreationModal from '@/components/features/teacher/ExamCreationModal';
import ExamList from '@/components/features/teacher/ExamList';
import ExamDetailsModal from '@/components/features/teacher/ExamDetailsModal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { examStorage } from '@/utils/examStorage';
import type { Exam } from '@/types/exam';

export default function TeacherPage() {
  const navigate = useNavigate();
  
  // Mocked teacher data (in production from authentication)
  const mockedTeacher = {
    name: 'Tõnu Kuusk',
  };

  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [examToDelete, setExamToDelete] = useState<string | null>(null);

  const loadExams = () => {
    setExams(examStorage.getAll());
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleDelete = (id: string) => {
    setExamToDelete(id);
  };

  const confirmDelete = () => {
    if (examToDelete) {
      examStorage.delete(examToDelete);
      loadExams();
      setExamToDelete(null);
    }
  };

  const handleOpenExam = (exam: Exam) => {
    // Navigate to exam monitoring page
    navigate(`/exam/${exam.id}`);
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Exam Management</h1>
              <p className="text-muted-foreground mt-1">Welcome, {mockedTeacher.name}</p>
            </div>
            <div className="w-full sm:w-auto">
              <ExamCreationModal teacherName={mockedTeacher.name} onExamCreated={loadExams} />
            </div>
          </div>

          <ExamList 
            exams={exams} 
            onDelete={handleDelete}
            onOpenExam={handleOpenExam}
            onCreateExam={loadExams}
            teacherName={mockedTeacher.name}
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

      <ConfirmDialog
        open={examToDelete !== null}
        onOpenChange={(open) => !open && setExamToDelete(null)}
        title="Delete Exam"
        description="Are you sure you want to delete this exam? This action cannot be undone. All student registrations will be lost."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </>
  );
}

