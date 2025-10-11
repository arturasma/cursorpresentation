import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, SignOut } from 'phosphor-react';
import Header from '@/components/Header';
import ExamDetails from '@/components/features/exam/ExamDetails';
import PINAuthenticationCard from '@/components/features/exam/PINAuthenticationCard';
import ExamConcept from '@/components/features/exam/ExamConcept';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { useExam } from '@/context/ExamContext';
import { examStorage } from '@/utils/examStorage';
import { studentRegistration } from '@/utils/studentRegistration';
import type { Exam } from '@/types/exam';

export default function ExamPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setIsInExam, showExitConfirmation, setShowExitConfirmation } = useExam();
  const [exam, setExam] = useState<Exam | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mocked student data
  const mockedStudent = {
    name: 'Mari Maasikas',
    idCode: '50001010001',
  };

  useEffect(() => {
    if (id) {
      const allExams = examStorage.getAll();
      const foundExam = allExams.find(e => e.id === id);
      
      if (!foundExam) {
        navigate('/student');
        return;
      }

      // Check if student is registered
      if (!studentRegistration.isRegistered(id, mockedStudent.idCode)) {
        navigate('/student');
        return;
      }

      setExam(foundExam);
      setIsInExam(true);
    }

    return () => {
      setIsInExam(false);
    };
  }, [id, navigate, setIsInExam]);

  const handleExitExam = () => {
    setShowExitConfirmation(false);
    setIsInExam(false);
    setIsAuthenticated(false);
    navigate('/student');
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleRequestExit = () => {
    setShowExitConfirmation(true);
  };

  if (!exam) {
    return null;
  }

  const registration = studentRegistration.getRegistration(exam.id, mockedStudent.idCode);

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">{exam.name}</h1>
                <p className="text-muted-foreground">
                  {exam.subject.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} - {exam.gradeLevel?.replace('grade-', '') + 'th Grade'}
                </p>
              </div>
              {!isAuthenticated && (
                <Button variant="outline" onClick={handleRequestExit} className="gap-2">
                  <ArrowLeft size={16} weight="bold" />
                  Back to Exams
                </Button>
              )}
            </div>
          </div>

          {!isAuthenticated ? (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <ExamDetails exam={exam} />
                
                {registration && (
                  <PINAuthenticationCard
                    studentName={mockedStudent.name}
                    studentIdCode={mockedStudent.idCode}
                    teacherName={exam.teacherName}
                    correctPIN={registration.pin}
                    onAuthenticated={handleAuthenticated}
                  />
                )}
              </div>

              <ExamConcept
                studentIdCode={mockedStudent.idCode}
                school={exam.school}
                examDate={exam.scheduledDate}
                examTime={exam.scheduledTime}
                examType={exam.examType}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-3xl font-bold mb-4">Exam Started Successfully!</h2>
              <p className="text-muted-foreground mb-8">
                The exam interface would load here. This is where students would complete their exam.
              </p>
              <div className="bg-muted/50 p-6 rounded-lg border border-border max-w-2xl mx-auto mb-8">
                <p className="text-sm text-muted-foreground">
                  <strong>Prototype Note:</strong> This area would display the actual exam questions, 
                  answer inputs, timer, and submission controls. The student would complete their exam 
                  here with full access to the questions and the ability to submit their answers.
                </p>
              </div>
              <Button variant="outline" onClick={handleRequestExit} className="gap-2">
                <SignOut size={16} weight="bold" />
                Exit Exam
              </Button>
            </div>
          )}
        </div>
      </main>

      <ConfirmDialog
        open={showExitConfirmation}
        onOpenChange={setShowExitConfirmation}
        title="Exit Exam?"
        description="Are you sure you want to exit the exam? Any unsaved progress may be lost."
        confirmText="Exit Exam"
        cancelText="Stay"
        onConfirm={handleExitExam}
        variant="destructive"
      />
    </>
  );
}

