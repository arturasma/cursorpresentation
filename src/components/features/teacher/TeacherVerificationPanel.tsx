import { CheckCircle, UserCircle, Clock } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StudentRegistration } from '@/types/exam';

interface TeacherVerificationPanelProps {
  pendingStudents: StudentRegistration[];
  verifiedStudents: StudentRegistration[];
  onVerifyStudent: (idCode: string) => void;
}

export default function TeacherVerificationPanel({
  pendingStudents,
  verifiedStudents,
  onVerifyStudent,
}: TeacherVerificationPanelProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Card className="border-primary">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <UserCircle size={20} weight="duotone" className="text-primary" />
          Teacher Verification Panel
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Verify student identity before granting exam access
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <div className="bg-orange-50 border border-orange-200 px-3 py-2 rounded-lg flex-1">
            <p className="text-orange-900 font-semibold">{pendingStudents.length}</p>
            <p className="text-orange-700 text-xs">Awaiting Verification</p>
          </div>
          <div className="bg-green-50 border border-green-200 px-3 py-2 rounded-lg flex-1">
            <p className="text-green-900 font-semibold">{verifiedStudents.length}</p>
            <p className="text-green-700 text-xs">Verified</p>
          </div>
        </div>

        {/* Pending verifications */}
        {pendingStudents.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-semibold">Pending Verifications:</p>
            {pendingStudents.map((student) => (
              <div
                key={student.studentId}
                className="border border-orange-200 bg-orange-50 p-3 rounded-lg space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{student.studentName}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      ID: {student.idCode}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock size={12} weight="regular" />
                      <span>
                        Entered at {student.registeredAt ? formatTime(student.registeredAt) : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onVerifyStudent(student.idCode)}
                    className="gap-2 ml-2"
                  >
                    <CheckCircle size={16} weight="bold" />
                    Verify
                  </Button>
                </div>
                <p className="text-xs text-orange-800 bg-orange-100 p-2 rounded">
                  <strong>Action Required:</strong> Visually confirm this student's identity before clicking Verify
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <UserCircle size={32} weight="duotone" className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No students awaiting verification</p>
          </div>
        )}

        {/* Verified students */}
        {verifiedStudents.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <p className="text-sm font-semibold text-green-700">
              Verified Students ({verifiedStudents.length}):
            </p>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {verifiedStudents.map((student) => (
                <div
                  key={student.studentId}
                  className="border border-green-200 bg-green-50 p-2 rounded text-xs flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-green-900">{student.studentName}</p>
                    <p className="text-green-700 font-mono">{student.idCode}</p>
                  </div>
                  <CheckCircle size={16} weight="fill" className="text-green-600" />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

