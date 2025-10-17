import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import SEOHead from '@/components/shared/SEOHead';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import ExamCreationModal from '@/components/features/teacher/ExamCreationModal';
import ExamList from '@/components/features/teacher/ExamList';
import ExamDetailsModal from '@/components/features/teacher/ExamDetailsModal';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { examStorage } from '@/utils/examStorage';
import { useStorageSync } from '@/hooks/useStorageSync';
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
  const [examToEdit, setExamToEdit] = useState<Exam | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('teacher-exams-tab') || 'scheduled';
  });

  const loadExams = useCallback(() => {
    setExams(examStorage.getAll());
  }, []);

  useEffect(() => {
    loadExams();
  }, [loadExams]);

  // Sync exam changes across tabs
  const handleStorageChange = useCallback((key: string) => {
    if (key === 'exams') {
      loadExams();
    }
  }, [loadExams]);

  useStorageSync(handleStorageChange);

  const handleDelete = (id: string) => {
    setExamToDelete(id);
  };

  const confirmDelete = () => {
    if (examToDelete) {
      examStorage.delete(examToDelete);
      loadExams();
      setExamToDelete(null);
      toast.success('Exam deleted successfully');
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
    toast.success('Exam updated successfully');
  };

  const handleEditExam = (exam: Exam) => {
    setExamToEdit(exam);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    // Delay clearing examToEdit to allow modal to close gracefully
    setTimeout(() => setExamToEdit(null), 300);
  };

  const handleEditComplete = () => {
    loadExams();
    handleCloseEditModal();
  };

  const handleEditModalOpenChange = (open: boolean) => {
    setIsEditModalOpen(open);
    if (!open) {
      handleCloseEditModal();
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('teacher-exams-tab', value);
  };

  // Filter exams by status
  const scheduledExams = exams.filter(exam => exam.status === 'scheduled');
  const ongoingExams = exams.filter(exam => exam.status === 'active' || exam.activeSession);
  const completedExams = exams.filter(exam => exam.status === 'completed');

  return (
    <>
      <SEOHead
        title="Teacher Dashboard - Exam Management System"
        description="Teacher dashboard for exam creation and management"
        noindex={true}
      />
      <Header />
      <Toaster />
      <main className="flex-1 container mx-auto px-6 py-8 animate-page-enter">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Exam Management</h1>
              <p className="text-muted-foreground mt-1">Welcome, {mockedTeacher.name}</p>
            </div>
            <div className="w-full sm:w-auto">
              <ExamCreationModal 
                teacherName={mockedTeacher.name} 
                onExamCreated={() => {
                  loadExams();
                  toast.success('Exam created successfully');
                }}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex w-full min-w-max sm:grid sm:max-w-2xl sm:grid-cols-3 sm:w-auto">
                <TabsTrigger value="scheduled" className="flex-shrink-0">
                  Scheduled ({scheduledExams.length})
                </TabsTrigger>
                <TabsTrigger value="ongoing" className="flex-shrink-0">
                  Ongoing ({ongoingExams.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex-shrink-0">
                  Completed ({completedExams.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="scheduled" className="animate-tab-enter">
              <ExamList 
                exams={scheduledExams} 
                onDelete={handleDelete}
                onEdit={handleEditExam}
                onOpenExam={handleOpenExam}
                onCreateExam={loadExams}
                teacherName={mockedTeacher.name}
              />
            </TabsContent>

            <TabsContent value="ongoing" className="animate-tab-enter">
              {ongoingExams.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No ongoing exams</p>
                  <p className="text-sm text-muted-foreground">
                    Activate a scheduled exam session to see it here
                  </p>
                </div>
              ) : (
                <ExamList 
                  exams={ongoingExams} 
                  onDelete={handleDelete}
                  onEdit={handleEditExam}
                  onOpenExam={handleOpenExam}
                  onCreateExam={loadExams}
                  teacherName={mockedTeacher.name}
                />
              )}
            </TabsContent>

            <TabsContent value="completed" className="animate-tab-enter">
              {completedExams.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No completed exams</p>
                  <p className="text-sm text-muted-foreground">
                    Completed exams will appear here after ending their sessions
                  </p>
                </div>
              ) : (
                <ExamList 
                  exams={completedExams} 
                  onDelete={handleDelete}
                  onEdit={handleEditExam}
                  onOpenExam={handleOpenExam}
                  onCreateExam={loadExams}
                  teacherName={mockedTeacher.name}
                />
              )}
            </TabsContent>
          </Tabs>
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

      {examToEdit && (
        <ExamCreationModal
          teacherName={mockedTeacher.name}
          onExamCreated={handleEditComplete}
          exam={examToEdit}
          mode="edit"
          open={isEditModalOpen}
          onOpenChange={handleEditModalOpenChange}
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

