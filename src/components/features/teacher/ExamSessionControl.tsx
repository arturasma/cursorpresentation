import { useState } from 'react';
import { Play, Stop, Key, Pause, Coffee } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import TeacherVerificationPanel from './TeacherVerificationPanel';
import type { ExamSession, StudentRegistration } from '@/types/exam';

interface ExamSessionControlProps {
  examId: string;
  examName: string;
  activeSession: ExamSession | null;
  pendingStudents: StudentRegistration[];
  verifiedStudents: StudentRegistration[];
  teacherName: string;
  numberOfBreaks?: number;
  breakDurationMinutes?: number;
  onActivateSession: () => void;
  onDeactivateSession: () => void;
  onPauseSession: () => void;
  onResumeSession: () => void;
  onVerifyStudent: (idCode: string) => void;
}

export default function ExamSessionControl({
  examId: _examId,
  examName: _examName,
  activeSession,
  pendingStudents,
  verifiedStudents,
  teacherName: _teacherName,
  numberOfBreaks = 0,
  breakDurationMinutes = 0,
  onActivateSession,
  onDeactivateSession,
  onPauseSession,
  onResumeSession,
  onVerifyStudent,
}: ExamSessionControlProps) {
  const [showConfirmDeactivate, setShowConfirmDeactivate] = useState(false);
  const [showConfirmPause, setShowConfirmPause] = useState(false);

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

  const handlePause = () => {
    setShowConfirmPause(true);
  };

  const confirmPause = () => {
    setShowConfirmPause(false);
    onPauseSession();
  };

  const canPause = activeSession && 
    !activeSession.isPaused && 
    numberOfBreaks > 0 && 
    activeSession.pauseCount < numberOfBreaks;

  const nextBreakNumber = activeSession ? activeSession.pauseCount + 1 : 1;

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
              <div className={`${activeSession.isPaused ? 'bg-amber-50 border-amber-500' : 'bg-green-50 border-green-500'} border p-4 rounded-lg`}>
                <div className="flex items-center justify-between mb-3">
                  <p className={`text-sm font-semibold ${activeSession.isPaused ? 'text-amber-900' : 'text-green-900'}`}>
                    {activeSession.isPaused ? 'Session Paused' : 'Session Active'}
                  </p>
                  {activeSession.isPaused ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-600 text-white text-xs">
                      <Coffee size={12} weight="fill" />
                      Break {activeSession.pauseCount} of {numberOfBreaks}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-600 text-white text-xs">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Live
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className={`text-xs mb-1 ${activeSession.isPaused ? 'text-amber-700' : 'text-green-700'}`}>
                      Room Code (Display to Students):
                    </p>
                    <div className={`bg-white border-2 rounded-lg p-4 text-center ${activeSession.isPaused ? 'border-amber-600' : 'border-green-600'}`}>
                      <p className={`text-5xl font-bold font-mono tracking-wider ${activeSession.isPaused ? 'text-amber-900' : 'text-green-900'}`}>
                        {activeSession.roomCode}
                      </p>
                    </div>
                    <p className={`text-xs mt-2 text-center ${activeSession.isPaused ? 'text-amber-700' : 'text-green-700'}`}>
                      {activeSession.isPaused 
                        ? 'Code remains valid during break'
                        : 'Students need this code to access the exam'}
                    </p>
                  </div>

                  {activeSession.isPaused && (
                    <div className="text-xs text-amber-800 bg-amber-100 p-3 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Coffee size={16} weight="duotone" />
                        <p className="font-semibold">Exam is on break ({breakDurationMinutes} minutes)</p>
                      </div>
                      <p>Students who are already in the exam will see a break screen. You can resume the session when ready.</p>
                    </div>
                  )}

                  <div className={`text-xs p-2 rounded ${activeSession.isPaused ? 'text-amber-800 bg-amber-100' : 'text-green-800 bg-green-100'}`}>
                    <p><strong>Activated by:</strong> {activeSession.activatedBy}</p>
                    <p><strong>Time:</strong> {new Date(activeSession.activeAt).toLocaleString()}</p>
                    {activeSession.isPaused && activeSession.pausedAt && (
                      <p><strong>Paused at:</strong> {new Date(activeSession.pausedAt).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>

              {!activeSession.isPaused && numberOfBreaks === 0 && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-blue-800">
                  <p className="font-semibold mb-1">Pause Feature Not Available</p>
                  <p>This exam was created without breaks. To use the pause feature, create an exam with "Number of Breaks" greater than 0.</p>
                </div>
              )}

              {!activeSession.isPaused && numberOfBreaks > 0 && activeSession.pauseCount >= numberOfBreaks && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-blue-800">
                  <p className="font-semibold mb-1">All Breaks Used</p>
                  <p>All {numberOfBreaks} scheduled break{numberOfBreaks > 1 ? 's have' : ' has'} been used. You can only end the session now.</p>
                </div>
              )}

              <div className="flex gap-2">
                {activeSession.isPaused ? (
                  <Button
                    onClick={onResumeSession}
                    className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Play size={18} weight="fill" />
                    Resume Session
                  </Button>
                ) : canPause ? (
                  <Button
                    onClick={handlePause}
                    variant="outline"
                    className="flex-1 gap-2 border-amber-600 text-amber-700 hover:bg-amber-50"
                  >
                    <Pause size={18} weight="fill" />
                    Pause Session
                  </Button>
                ) : null}
                
                <Button
                  onClick={handleDeactivate}
                  variant="destructive"
                  className={`gap-2 ${activeSession.isPaused || canPause ? 'flex-1' : 'w-full'}`}
                >
                  <Stop size={18} weight="fill" />
                  End Session
                </Button>
              </div>

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

      <ConfirmDialog
        open={showConfirmPause}
        onOpenChange={setShowConfirmPause}
        title="Pause Exam Session?"
        description={`Pause exam for break ${nextBreakNumber} of ${numberOfBreaks} (${breakDurationMinutes} minutes)? Students will see a break screen but the room code and their PINs remain valid.`}
        confirmText="Pause Session"
        cancelText="Cancel"
        onConfirm={confirmPause}
      />
    </div>
  );
}

