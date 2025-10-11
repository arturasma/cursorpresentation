import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Key, LockSimple, CheckCircle } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PINRevealModal from './PINRevealModal';
import type { Exam } from '@/types/exam';

interface StudentExamCardProps {
  exam: Exam;
  isRegistered: boolean;
  isCompleted: boolean;
  studentPIN?: string;
  onOpenRegistration: (exam: Exam) => void;
  onUnregister: (examId: string) => void;
}

export default function StudentExamCard({
  exam,
  isRegistered,
  isCompleted,
  studentPIN,
  onOpenRegistration,
  onUnregister,
}: StudentExamCardProps) {
  const navigate = useNavigate();
  const [showPINRevealModal, setShowPINRevealModal] = useState(false);
  const [isPINRevealed, setIsPINRevealed] = useState(false);

  const handleRevealPIN = () => {
    setIsPINRevealed(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: Exam['status']) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'completed':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const isFull = exam.registeredStudents.length >= exam.studentCount;

  // Get completion timestamp if completed
  const completionInfo = isCompleted && exam.registeredStudents.find(
    s => s.idCode && s.completedAt
  );

  return (
    <Card className={isCompleted ? 'border-green-500' : isRegistered ? 'border-primary' : ''}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{exam.name}</CardTitle>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border ${getStatusColor(exam.status)}`}>
                {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground capitalize">{exam.subject?.replace('-', ' ')}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{exam.gradeLevel?.replace('grade-', '') + 'th Grade'}</span>
              {isCompleted ? (
                <>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                    <CheckCircle size={14} weight="fill" />
                    Completed
                  </span>
                </>
              ) : isRegistered && (
                <>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-xs font-medium text-primary">Registered</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={16} weight="regular" />
                <span>{formatDate(exam.scheduledDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={16} weight="regular" />
                <span>{exam.scheduledTime}</span>
              </div>
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <MapPin size={16} weight="regular" />
                <span className="capitalize">{exam.school?.replace('-', ' ')}</span>
              </div>
              <div className="pl-6 text-xs text-muted-foreground">
                {exam.location}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground text-sm">
                Teacher: {exam.teacherName}
              </div>
            </div>
          </div>

          {isCompleted && completionInfo && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={20} weight="fill" className="text-green-600" />
                <span className="text-sm font-semibold text-green-700">Exam Completed</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Submitted on {new Date(completionInfo.completedAt!).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          )}

          {isRegistered && !isCompleted && studentPIN && (
            <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Key size={16} weight="regular" className="text-primary" />
                  <span className="text-sm font-medium">Your Exam PIN</span>
                </div>
                {!isPINRevealed && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 gap-2 text-xs"
                    onClick={() => setShowPINRevealModal(true)}
                  >
                    <LockSimple size={14} weight="bold" />
                    Reveal
                  </Button>
                )}
              </div>
              {isPINRevealed ? (
                <>
                  <p className="text-2xl font-bold font-mono">{studentPIN}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use this PIN to access the exam
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold font-mono text-muted-foreground">••••-••••</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click reveal to view your PIN
                  </p>
                </>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            {isCompleted ? (
              <div className="flex-1 text-center py-2 px-4 rounded-md bg-green-100 text-green-700 font-medium text-sm">
                Exam Submitted
              </div>
            ) : isRegistered ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => onUnregister(exam.id)}
                  className="flex-1"
                >
                  Unregister
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => navigate(`/exam/${exam.id}`)}
                >
                  Take Exam
                </Button>
              </>
            ) : (
              <Button
                onClick={() => onOpenRegistration(exam)}
                className="flex-1"
                disabled={isFull}
              >
                {isFull ? 'Exam Full' : 'Register for Exam'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      {isRegistered && studentPIN && (
        <PINRevealModal
          open={showPINRevealModal}
          onOpenChange={setShowPINRevealModal}
          onReveal={handleRevealPIN}
          examName={exam.name}
        />
      )}
    </Card>
  );
}

