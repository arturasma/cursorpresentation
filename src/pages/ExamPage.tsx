import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, SignOut, CheckCircle, Hourglass } from 'phosphor-react';
import Header from '@/components/Header';
import ExamDetails from '@/components/features/exam/ExamDetails';
import PINAuthenticationCard from '@/components/features/exam/PINAuthenticationCard';
import ExamConcept from '@/components/features/exam/ExamConcept';
import ExamSessionControl from '@/components/features/teacher/ExamSessionControl';
import StudentStatusPanel from '@/components/features/teacher/StudentStatusPanel';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { useExam } from '@/context/ExamContext';
import { useUser } from '@/context/UserContext';
import { examStorage } from '@/utils/examStorage';
import { studentRegistration } from '@/utils/studentRegistration';
import { activateExamSession, deactivateExamSession } from '@/utils/roomCodeGenerator';
import type { Exam } from '@/types/exam';

export default function ExamPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setIsInExam, showExitConfirmation, setShowExitConfirmation, pendingAction, setPendingAction } = useExam();
  const { userRole, handleRoleSelect, handleLogout } = useUser();
  const [exam, setExam] = useState<Exam | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAwaitingVerification, setIsAwaitingVerification] = useState(false);
  const [showCompleteConfirmation, setShowCompleteConfirmation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mocked student data
  const mockedStudent = {
    name: 'Mari Maasikas',
    idCode: '50001010001',
  };

  // Mocked teacher data
  const mockedTeacher = {
    id: 'teacher-1',
    name: 'Tõnu Kuusk',
  };

  // Function to load/reload exam data
  const loadExam = () => {
    if (id) {
      const allExams = examStorage.getAll();
      const foundExam = allExams.find(e => e.id === id);
      
      if (!foundExam) {
        navigate(userRole === 'teacher' ? '/teacher' : '/student');
        return;
      }

      // For students, check registration and verification
      if (userRole === 'student') {
        if (!studentRegistration.isRegistered(id, mockedStudent.idCode)) {
          navigate('/student');
          return;
        }

        // Check if already completed
        const completed = studentRegistration.isCompleted(id, mockedStudent.idCode);
        setIsCompleted(completed);

        // Check if verified (if verified, student can access exam directly)
        const verified = studentRegistration.isVerified(id, mockedStudent.idCode);
        if (verified) {
          // Student was already verified, grant exam access immediately
          setIsAwaitingVerification(false);
          setIsAuthenticated(true);
        } else {
          // Check if currently awaiting verification
          const awaiting = studentRegistration.isAwaitingVerification(id, mockedStudent.idCode);
          setIsAwaitingVerification(awaiting);
        }
      }

      setExam(foundExam);
      // Only set isInExam for students (blocks header navigation)
      // Teachers can navigate freely
      if (userRole === 'student') {
        setIsInExam(true);
      }
    }
  };

  useEffect(() => {
    loadExam();

    return () => {
      setIsInExam(false);
    };
  }, [id, navigate, setIsInExam, userRole]);

  // Poll for verification status when awaiting
  useEffect(() => {
    if (!isAwaitingVerification || !id) return;

    const interval = setInterval(() => {
      const verified = studentRegistration.isVerified(id, mockedStudent.idCode);
      if (verified) {
        setIsAwaitingVerification(false);
        setIsAuthenticated(true);
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, [isAwaitingVerification, id]);

  const handleExitExam = () => {
    setShowExitConfirmation(false);
    if (userRole === 'student') {
      setIsInExam(false);
    }
    setIsAuthenticated(false);
    setIsAwaitingVerification(false);
    
    // Execute the pending action
    if (pendingAction.type === 'roleSwitch') {
      // Switch to the new role
      handleRoleSelect(pendingAction.newRole);
      // Navigate to appropriate dashboard for new role
      navigate(pendingAction.newRole === 'teacher' ? '/teacher' : '/student');
    } else if (pendingAction.type === 'logout') {
      // Logout
      handleLogout();
    } else if (pendingAction.type === 'home') {
      // Go home (logout)
      handleLogout();
    } else {
      // No pending action, just exit to appropriate dashboard
      navigate(userRole === 'teacher' ? '/teacher' : '/student');
    }
    
    // Clear the pending action
    setPendingAction({ type: 'none' });
  };

  const handleAwaitingVerification = () => {
    if (id) {
      studentRegistration.setAwaitingVerification(id, mockedStudent.idCode);
      setIsAwaitingVerification(true);
    }
  };

  const handleActivateSession = () => {
    if (id) {
      activateExamSession(id, mockedTeacher.id, mockedTeacher.name);
      loadExam();
    }
  };

  const handleDeactivateSession = () => {
    if (id) {
      deactivateExamSession(id);
      loadExam();
    }
  };

  const handleVerifyStudent = (idCode: string) => {
    if (id) {
      studentRegistration.verifyStudent(id, idCode, mockedTeacher.name);
      loadExam();
    }
  };

  const handleRequestExit = () => {
    // If exam is completed, navigate directly without confirmation
    if (isCompleted) {
      setIsInExam(false);
      navigate('/student');
      return;
    }
    // Otherwise, show exit confirmation
    setPendingAction({ type: 'none' });
    setShowExitConfirmation(true);
  };

  const handleTeacherBackToDashboard = () => {
    // Teachers can navigate back without confirmation
    navigate('/teacher');
  };

  const handleCompleteExam = () => {
    setShowCompleteConfirmation(true);
  };

  const confirmCompleteExam = () => {
    if (exam && studentRegistration.completeExam(exam.id, mockedStudent.idCode)) {
      setShowCompleteConfirmation(false);
      setIsCompleted(true);
      // User can now manually click "Back to Exams" button
    }
  };

  if (!exam) {
    return null;
  }

  const registration = studentRegistration.getRegistration(exam.id, mockedStudent.idCode);
  const pendingVerifications = studentRegistration.getPendingVerifications(exam.id);
  const verifiedStudents = studentRegistration.getVerifiedStudents(exam.id);

  // Teacher view
  if (userRole === 'teacher') {
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
                    Teacher Exam Monitoring & Control
                  </p>
                </div>
                <Button variant="outline" onClick={handleTeacherBackToDashboard} className="gap-2">
                  <ArrowLeft size={16} weight="bold" />
                  Back to Dashboard
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <ExamDetails exam={exam} />
                <ExamSessionControl
                  examId={exam.id}
                  examName={exam.name}
                  activeSession={exam.activeSession || null}
                  pendingStudents={pendingVerifications}
                  verifiedStudents={verifiedStudents}
                  teacherName={mockedTeacher.name}
                  onActivateSession={handleActivateSession}
                  onDeactivateSession={handleDeactivateSession}
                  onVerifyStudent={handleVerifyStudent}
                />
              </div>
              
              <StudentStatusPanel registeredStudents={exam.registeredStudents} />
            </div>
          </div>
        </main>
      </>
    );
  }

  // Student view
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
              {(!isAuthenticated && !isAwaitingVerification) || isCompleted ? (
                <Button variant="outline" onClick={handleRequestExit} className="gap-2">
                  <ArrowLeft size={16} weight="bold" />
                  Back to Exams
                </Button>
              ) : null}
            </div>
          </div>

          {isAwaitingVerification ? (
            <div className="text-center py-16">
              <Hourglass size={64} weight="duotone" className="mx-auto mb-4 text-orange-600 animate-pulse" />
              <h2 className="text-3xl font-bold mb-4">Awaiting Teacher Verification</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Your PIN and room code were correct. Please wait for your teacher to verify your identity before starting the exam.
              </p>
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-orange-800">
                  The teacher will confirm your identity in person. This should only take a moment.
                </p>
              </div>
            </div>
          ) : !isAuthenticated ? (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <ExamDetails exam={exam} />
                
                {registration && (
                  <PINAuthenticationCard
                    studentName={mockedStudent.name}
                    studentIdCode={mockedStudent.idCode}
                    teacherName={exam.teacherName}
                    correctPIN={registration.pin}
                    examId={exam.id}
                    activeRoomCode={exam.activeSession?.roomCode}
                    onAuthenticated={() => setIsAuthenticated(true)}
                    onAwaitingVerification={handleAwaitingVerification}
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
              {isCompleted ? (
                <>
                  <CheckCircle size={64} weight="fill" className="mx-auto mb-4 text-green-600" />
                  <h2 className="text-3xl font-bold mb-4 text-green-600">Exam Completed!</h2>
                  <p className="text-muted-foreground mb-4">
                    Your exam has been successfully submitted.
                  </p>
                  <Button 
                    onClick={() => {
                      setIsInExam(false);
                      navigate('/student');
                    }}
                    className="gap-2"
                    size="lg"
                  >
                    <ArrowLeft size={16} weight="bold" />
                    Back to Exams
                  </Button>
                </>
              ) : (
                <>
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
                  <div className="flex gap-3 justify-center">
                    <Button onClick={handleCompleteExam} className="gap-2">
                      <CheckCircle size={16} weight="bold" />
                      Complete Exam
                    </Button>
                    <Button variant="outline" onClick={handleRequestExit} className="gap-2">
                      <SignOut size={16} weight="bold" />
                      Exit Without Completing
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <ConfirmDialog
        open={showExitConfirmation}
        onOpenChange={(open) => {
          setShowExitConfirmation(open);
          // If dialog is closed without confirming, clear pending action
          if (!open) {
            setPendingAction({ type: 'none' });
          }
        }}
        title="Exit Exam?"
        description="Are you sure you want to exit the exam? Any unsaved progress may be lost."
        confirmText="Exit Exam"
        cancelText="Stay"
        onConfirm={handleExitExam}
        variant="destructive"
      />

      <ConfirmDialog
        open={showCompleteConfirmation}
        onOpenChange={setShowCompleteConfirmation}
        title="Complete Exam?"
        description="Are you sure you want to submit your exam? You won't be able to make any changes after submission."
        confirmText="Submit Exam"
        cancelText="Continue Working"
        onConfirm={confirmCompleteExam}
      />
    </>
  );
}

