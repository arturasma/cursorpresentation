import { Users, CheckCircle, Hourglass, UserCircle, Clock } from 'phosphor-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StudentRegistration } from '@/types/exam';

interface StudentStatusPanelProps {
  registeredStudents: StudentRegistration[];
}

export default function StudentStatusPanel({
  registeredStudents,
}: StudentStatusPanelProps) {
  // Categorize students
  const completedStudents = registeredStudents.filter(s => s.completedAt);
  const activeStudents = registeredStudents.filter(s => s.teacherVerified && !s.completedAt);
  const awaitingStudents = registeredStudents.filter(s => s.awaitingVerification && !s.teacherVerified);
  const registeredOnly = registeredStudents.filter(s => !s.awaitingVerification && !s.teacherVerified && !s.completedAt);

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDateTime = (timestamp?: string) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users size={20} weight="duotone" className="text-primary" />
          Student Status Overview
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Track student registration, exam progress, and completion
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 px-2 py-2 rounded-lg">
            <p className="font-bold text-lg text-blue-900 dark:text-blue-300">{registeredOnly.length}</p>
            <p className="text-blue-700 dark:text-blue-400">Registered</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 px-2 py-2 rounded-lg">
            <p className="font-bold text-lg text-orange-900 dark:text-orange-300">{awaitingStudents.length}</p>
            <p className="text-orange-700 dark:text-orange-400">Awaiting</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 px-2 py-2 rounded-lg">
            <p className="font-bold text-lg text-purple-900 dark:text-purple-300">{activeStudents.length}</p>
            <p className="text-purple-700 dark:text-purple-400">Taking Exam</p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 px-2 py-2 rounded-lg">
            <p className="font-bold text-lg text-green-900 dark:text-green-300">{completedStudents.length}</p>
            <p className="text-green-700 dark:text-green-400">Completed</p>
          </div>
        </div>

        {/* Student Lists */}
        <div className="space-y-3 max-h-96 overflow-y-auto animate-content-update">
          {/* Completed Students */}
          {completedStudents.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-1">
                <CheckCircle size={14} weight="fill" />
                Completed ({completedStudents.length})
              </h4>
              <div className="space-y-1">
                {completedStudents.map((student) => (
                  <div
                    key={student.studentId}
                    className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 p-2 rounded text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-green-900 dark:text-green-300">{student.studentName}</p>
                        <p className="text-green-700 dark:text-green-400 font-mono text-xs">{student.idCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-800 dark:text-green-400 text-xs">
                          {formatDateTime(student.completedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Students (Taking Exam) */}
          {activeStudents.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-1">
                <UserCircle size={14} weight="fill" />
                Taking Exam ({activeStudents.length})
              </h4>
              <div className="space-y-1">
                {activeStudents.map((student) => (
                  <div
                    key={student.studentId}
                    className="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-2 rounded text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-purple-900 dark:text-purple-300">{student.studentName}</p>
                        <p className="text-purple-700 dark:text-purple-400 font-mono text-xs">{student.idCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-purple-800 dark:text-purple-400 text-xs">
                          Verified: {formatTime(student.verifiedAt)}
                        </p>
                        <p className="text-purple-700 dark:text-purple-500 text-xs">
                          by {student.verifiedBy}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awaiting Verification */}
          {awaitingStudents.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-orange-700 dark:text-orange-400 mb-2 flex items-center gap-1">
                <Hourglass size={14} weight="fill" />
                Awaiting Verification ({awaitingStudents.length})
              </h4>
              <div className="space-y-1">
                {awaitingStudents.map((student) => (
                  <div
                    key={student.studentId}
                    className="border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 p-2 rounded text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-orange-900 dark:text-orange-300">{student.studentName}</p>
                        <p className="text-orange-700 dark:text-orange-400 font-mono text-xs">{student.idCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-800 dark:text-orange-400 text-xs">
                          Entered: {formatTime(student.registeredAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Registered Only */}
          {registeredOnly.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-1">
                <Clock size={14} weight="fill" />
                Registered Only ({registeredOnly.length})
              </h4>
              <div className="space-y-1">
                {registeredOnly.map((student) => (
                  <div
                    key={student.studentId}
                    className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-2 rounded text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-blue-900 dark:text-blue-300">{student.studentName}</p>
                        <p className="text-blue-700 dark:text-blue-400 font-mono text-xs">{student.idCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-800 dark:text-blue-400 text-xs">
                          {formatDateTime(student.registeredAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {registeredStudents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users size={32} weight="duotone" className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No students registered yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

