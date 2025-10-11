import { BookOpen } from 'phosphor-react';
import { Card, CardContent } from '@/components/ui/card';
import StudentExamCard from './StudentExamCard';
import type { Exam } from '@/types/exam';

interface StudentExamListProps {
  exams: Exam[];
  studentName: string;
  registeredExamIds: Set<string>;
  studentPINs: Map<string, string>;
  onRegister: (examId: string) => void;
  onUnregister: (examId: string) => void;
}

export default function StudentExamList({
  exams,
  studentName,
  registeredExamIds,
  studentPINs,
  onRegister,
  onUnregister,
}: StudentExamListProps) {
  // Separate registered and available exams
  const registeredExams = exams.filter(exam => registeredExamIds.has(exam.id));
  const availableExams = exams.filter(exam => !registeredExamIds.has(exam.id));

  if (exams.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-16 text-center">
          <BookOpen size={64} weight="light" className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Exams Available</h3>
          <p className="text-muted-foreground">
            There are no exams scheduled at the moment. Check back later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {registeredExams.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Registered Exams</h2>
          <div className="grid gap-4">
            {registeredExams.map((exam) => (
              <StudentExamCard
                key={exam.id}
                exam={exam}
                isRegistered={true}
                studentPIN={studentPINs.get(exam.id)}
                onRegister={onRegister}
                onUnregister={onUnregister}
              />
            ))}
          </div>
        </div>
      )}

      {availableExams.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Exams</h2>
          <div className="grid gap-4">
            {availableExams.map((exam) => (
              <StudentExamCard
                key={exam.id}
                exam={exam}
                isRegistered={false}
                onRegister={onRegister}
                onUnregister={onUnregister}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

