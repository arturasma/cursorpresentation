import { useState } from 'react';
import { Play, Stop, Key } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TeacherVerificationPanel from './TeacherVerificationPanel';
import type { ExamSession, StudentRegistration } from '@/types/exam';

interface ExamSessionControlProps {
  examId: string;
  examName: string;
  activeSession: ExamSession | null;
  pendingStudents: StudentRegistration[];
  verifiedStudents: StudentRegistration[];
  teacherName: string;
  onActivateSession: () => void;
  onDeactivateSession: () => void;
  onVerifyStudent: (idCode: string) => void;
}

export default function ExamSessionControl({
  examId: _examId,
  examName: _examName,
  activeSession,
  pendingStudents,
  verifiedStudents,
  teacherName: _teacherName,
  onActivateSession,
  onDeactivateSession,
  onVerifyStudent,
}: ExamSessionControlProps) {
  const [showConfirmDeactivate, setShowConfirmDeactivate] = useState(false);

  const handleDeactivate = () => {
    if (pendingStudents.length > 0) {
      setShowConfirmDeactivate(true);
    } else {
      onDeactivateSession();
    }
  };

  const confirmDeactivate = () => {
    setShowConfirmDeactivate(false);
    onDeactivateSession();
  };

  return (
    <div className="space-y-4">
      <Card className={activeSession ? 'border-green-500' : 'border-border'}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Key size={20} weight="duotone" className="text-primary" />
            Exam Session Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!activeSession ? (
            <>
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-3">
                  No active session. Activate the exam session to allow students to enter the exam.
                </p>
                <p className="text-xs text-muted-foreground">
                  When activated, a unique room code will be generated for this exam session.
                  Students must enter this code along with their PIN to access the exam.
                </p>
              </div>
              <Button onClick={onActivateSession} className="w-full gap-2" size="lg">
                <Play size={18} weight="fill" />
                Activate Exam Session
              </Button>
            </>
          ) : (
            <>
              <div className="bg-green-50 border border-green-500 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-green-900">Session Active</p>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-600 text-white text-xs">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Live
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-green-700 mb-1">Room Code (Display to Students):</p>
                    <div className="bg-white border-2 border-green-600 rounded-lg p-4 text-center">
                      <p className="text-5xl font-bold font-mono tracking-wider text-green-900">
                        {activeSession.roomCode}
                      </p>
                    </div>
                    <p className="text-xs text-green-700 mt-2 text-center">
                      Students need this code to access the exam
                    </p>
                  </div>

                  <div className="text-xs text-green-800 bg-green-100 p-2 rounded">
                    <p><strong>Activated by:</strong> {activeSession.activatedBy}</p>
                    <p><strong>Time:</strong> {new Date(activeSession.activeAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDeactivate}
                variant="destructive"
                className="w-full gap-2"
              >
                <Stop size={18} weight="fill" />
                End Session
              </Button>

              {showConfirmDeactivate && (
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-orange-900 mb-2">
                    Warning: Students Awaiting Verification
                  </p>
                  <p className="text-xs text-orange-800 mb-3">
                    There are {pendingStudents.length} student(s) waiting for verification. 
                    Ending the session now will prevent them from accessing the exam.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowConfirmDeactivate(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={confirmDeactivate}
                      className="flex-1"
                    >
                      End Anyway
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {activeSession && (
        <TeacherVerificationPanel
          pendingStudents={pendingStudents}
          verifiedStudents={verifiedStudents}
          onVerifyStudent={onVerifyStudent}
        />
      )}
    </div>
  );
}

