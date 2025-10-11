import { Trash, Calendar, MapPin, Users, Clock, FolderOpen } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExamCreationModal from './ExamCreationModal';
import type { Exam } from '@/types/exam';

interface ExamListProps {
  exams: Exam[];
  onDelete: (id: string) => void;
  onOpenExam: (exam: Exam) => void;
  onCreateExam: () => void;
}

export default function ExamList({ exams, onDelete, onOpenExam, onCreateExam }: ExamListProps) {
  if (exams.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-16 text-center">
          <FolderOpen size={64} weight="light" className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Exams Created</h3>
          <p className="text-muted-foreground mb-6">
            Get started by creating your first exam session.
          </p>
          <ExamCreationModal onExamCreated={onCreateExam} />
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: Exam['status']) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-50';
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'completed':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-3">
      {exams.map((exam) => (
        <Card 
          key={exam.id}
          className="cursor-pointer transition-colors hover:bg-accent/50"
          onClick={() => onOpenExam(exam)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{exam.name}</CardTitle>
                <div className="mt-1 flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(exam.status)}`}>
                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground capitalize">{exam.subject?.replace('-', ' ')}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(exam.id);
                }}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash size={18} weight="regular" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={16} weight="regular" />
                <span>{formatDate(exam.scheduledDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={16} weight="regular" />
                <span>{exam.scheduledTime}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} weight="regular" />
                <span>{exam.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users size={16} weight="regular" />
                <span>{exam.studentCount} students</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

