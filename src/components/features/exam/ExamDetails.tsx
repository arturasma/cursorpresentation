import { Calendar, Clock, MapPin, GraduationCap, Chalkboard, IdentificationCard, Users, CheckCircle } from 'phosphor-react';
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

  const registeredCount = exam.registeredStudents.length;
  const completedCount = exam.registeredStudents.filter(s => s.completedAt).length;
  const verifiedCount = exam.registeredStudents.filter(s => s.teacherVerified).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <IdentificationCard size={20} weight="duotone" />
          Exam Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <GraduationCap size={20} weight="regular" className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Subject</p>
            <p className="font-medium capitalize">{exam.subject.replace('-', ' ')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Chalkboard size={20} weight="regular" className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Type</p>
            <p className="font-medium capitalize">{exam.examType.replace('-', ' ')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar size={20} weight="regular" className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-medium">{formatDate(exam.scheduledDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={20} weight="regular" className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="font-medium">{exam.scheduledTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={20} weight="regular" className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="font-medium capitalize">{exam.school.replace('-', ' ')}</p>
            <p className="text-sm text-muted-foreground">{exam.location}</p>
          </div>
        </div>

        <div className="border-t pt-3 mt-3">
          <div className="flex items-center gap-3 mb-2">
            <Users size={20} weight="regular" className="text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Registration Status</p>
              <p className="font-medium">{registeredCount} / {exam.studentCount} students</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            <div className="bg-blue-50 border border-blue-200 p-2 rounded">
              <p className="text-blue-700 font-semibold">{verifiedCount} Verified</p>
              <p className="text-blue-600">by teacher</p>
            </div>
            <div className="bg-green-50 border border-green-200 p-2 rounded flex items-center gap-1">
              <CheckCircle size={14} weight="fill" className="text-green-600" />
              <div>
                <p className="text-green-700 font-semibold">{completedCount} Completed</p>
                <p className="text-green-600">exams</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

