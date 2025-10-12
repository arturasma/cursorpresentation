import { Calendar, Clock, MapPin, GraduationCap, Chalkboard, IdentificationCard } from 'phosphor-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Exam } from '@/types/exam';

interface ExamDetailsProps {
  exam: Exam;
}

export default function ExamDetails({ exam }: ExamDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <IdentificationCard size={20} weight="duotone" />
          Exam Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-3">
          <GraduationCap size={20} weight="regular" className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Subject</p>
            <p className="font-medium capitalize break-words">{exam.subject.replace('-', ' ')}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Chalkboard size={20} weight="regular" className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Type</p>
            <p className="font-medium capitalize break-words">{exam.examType.replace('-', ' ')}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar size={20} weight="regular" className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-medium break-words">{formatDate(exam.scheduledDate)}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock size={20} weight="regular" className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="font-medium">{exam.scheduledTime}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={20} weight="regular" className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="font-medium capitalize break-words">{exam.school.replace('-', ' ')}</p>
            <p className="text-sm text-muted-foreground break-words">{exam.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

