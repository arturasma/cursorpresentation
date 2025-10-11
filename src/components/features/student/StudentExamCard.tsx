import { Calendar, MapPin, Clock, Users, Key } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Exam } from '@/types/exam';

interface StudentExamCardProps {
  exam: Exam;
  isRegistered: boolean;
  studentPIN?: string;
  onOpenRegistration: (exam: Exam) => void;
  onUnregister: (examId: string) => void;
}

export default function StudentExamCard({
  exam,
  isRegistered,
  studentPIN,
  onOpenRegistration,
  onUnregister,
}: StudentExamCardProps) {
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
  const spotsLeft = exam.studentCount - exam.registeredStudents.length;

  return (
    <Card className={isRegistered ? 'border-primary' : ''}>
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
              <span className="text-sm text-muted-foreground capitalize">{exam.examType?.replace('-', ' ')}</span>
              {isRegistered && (
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users size={16} weight="regular" />
              <span>{exam.registeredStudents.length}/{exam.studentCount} registered</span>
            </div>
          </div>

          {isRegistered && studentPIN && (
            <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Key size={16} weight="regular" className="text-primary" />
                <span className="text-sm font-medium">Your Exam PIN</span>
              </div>
              <p className="text-2xl font-bold font-mono">{studentPIN}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Use this PIN to access the exam
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            {isRegistered ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => onUnregister(exam.id)}
                  className="flex-1"
                >
                  Unregister
                </Button>
                <Button variant="secondary" className="flex-1" disabled>
                  Take Exam
                </Button>
              </>
            ) : (
              <Button
                onClick={() => onOpenRegistration(exam)}
                className="flex-1"
                disabled={isFull}
              >
                {isFull ? 'Exam Full' : `Register (${spotsLeft} spots left)`}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

