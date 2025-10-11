import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import StudentExamList from '@/components/features/student/StudentExamList';
import StudentRegistrationModal from '@/components/features/student/StudentRegistrationModal';
import RegistrationSuccessDialog from '@/components/features/student/RegistrationSuccessDialog';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { examStorage } from '@/utils/examStorage';
import { studentRegistration } from '@/utils/studentRegistration';
import type { Exam } from '@/types/exam';

export default function StudentPage() {
  // Mocked Estonian ID data (in production from authentication)
  const mockedStudent = {
    name: 'Mari Maasikas',
    idCode: '50001010001',
  };
  
  const [exams, setExams] = useState<Exam[]>([]);
  const [registeredExamIds, setRegisteredExamIds] = useState<Set<string>>(new Set());
  const [completedExamIds, setCompletedExamIds] = useState<Set<string>>(new Set());
  const [studentPINs, setStudentPINs] = useState<Map<string, string>>(new Map());
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [examToUnregister, setExamToUnregister] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<{ examName: string; pin: string } | null>(null);

  const loadExams = () => {
    const allExams = examStorage.getAll();
    setExams(allExams);

    const registered = new Set<string>();
    const completed = new Set<string>();
    const pins = new Map<string, string>();

    allExams.forEach(exam => {
      const registration = studentRegistration.getRegistration(exam.id, mockedStudent.idCode);
      if (registration) {
        registered.add(exam.id);
        pins.set(exam.id, registration.pin);
        
        // Check if completed
        if (registration.completedAt) {
          completed.add(exam.id);
        }
      }
    });

    setRegisteredExamIds(registered);
    setCompletedExamIds(completed);
    setStudentPINs(pins);
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleOpenRegistration = (exam: Exam) => {
    setSelectedExam(exam);
    setIsRegistrationOpen(true);
  };

  const handleRegister = (idCardLastDigits: string) => {
    if (!selectedExam) return;
    
    if (studentRegistration.register(
      selectedExam.id,
      mockedStudent.name,
      mockedStudent.idCode,
      idCardLastDigits
    )) {
      // Get the newly created PIN
      const registration = studentRegistration.getRegistration(selectedExam.id, mockedStudent.idCode);
      if (registration) {
        setRegistrationSuccess({
          examName: selectedExam.name,
          pin: registration.pin,
        });
      }
      
      loadExams();
      setIsRegistrationOpen(false);
      setSelectedExam(null);
    } else {
      alert('Unable to register for this exam. It may be full or you are already registered.');
    }
  };

  const handleUnregister = (examId: string) => {
    setExamToUnregister(examId);
  };

  const confirmUnregister = () => {
    if (examToUnregister && studentRegistration.unregister(examToUnregister, mockedStudent.idCode)) {
      loadExams();
      setExamToUnregister(null);
    }
  };

  // Separate exams by registration and completion status
  const completedExams = exams.filter(exam => completedExamIds.has(exam.id));
  const registeredExams = exams.filter(exam => registeredExamIds.has(exam.id) && !completedExamIds.has(exam.id));
  const availableExams = exams.filter(exam => !registeredExamIds.has(exam.id));

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Exam Registration</h1>
            <p className="text-muted-foreground mt-1">Welcome, {mockedStudent.name}</p>
          </div>

          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-3">
              <TabsTrigger value="available">
                Available ({availableExams.length})
              </TabsTrigger>
              <TabsTrigger value="registered">
                Registered ({registeredExams.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completedExams.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="available" className="mt-6">
              <StudentExamList
                exams={availableExams}
                registeredExamIds={registeredExamIds}
                completedExamIds={completedExamIds}
                studentPINs={studentPINs}
                onOpenRegistration={handleOpenRegistration}
                onUnregister={handleUnregister}
              />
            </TabsContent>
            <TabsContent value="registered" className="mt-6">
              <StudentExamList
                exams={registeredExams}
                registeredExamIds={registeredExamIds}
                completedExamIds={completedExamIds}
                studentPINs={studentPINs}
                onOpenRegistration={handleOpenRegistration}
                onUnregister={handleUnregister}
              />
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              <StudentExamList
                exams={completedExams}
                registeredExamIds={registeredExamIds}
                completedExamIds={completedExamIds}
                studentPINs={studentPINs}
                onOpenRegistration={handleOpenRegistration}
                onUnregister={handleUnregister}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {selectedExam && (
        <StudentRegistrationModal
          exam={selectedExam}
          open={isRegistrationOpen}
          onClose={() => {
            setIsRegistrationOpen(false);
            setSelectedExam(null);
          }}
          onRegister={handleRegister}
        />
      )}

      <ConfirmDialog
        open={examToUnregister !== null}
        onOpenChange={(open) => !open && setExamToUnregister(null)}
        title="Unregister from Exam"
        description="Are you sure you want to unregister from this exam? You will need to register again to access it."
        confirmText="Unregister"
        cancelText="Cancel"
        onConfirm={confirmUnregister}
        variant="destructive"
      />

      {registrationSuccess && (
        <RegistrationSuccessDialog
          open={registrationSuccess !== null}
          onOpenChange={(open) => !open && setRegistrationSuccess(null)}
          examName={registrationSuccess.examName}
          pin={registrationSuccess.pin}
        />
      )}
    </>
  );
}
