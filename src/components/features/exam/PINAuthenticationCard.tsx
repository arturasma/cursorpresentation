import { useState } from 'react';
import { Key, LockOpen, ShieldCheck, Clock } from 'phosphor-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PINAuthenticationCardProps {
  studentName: string;
  studentIdCode: string;
  teacherName: string;
  correctPIN: string;
  examId: string;
  activeRoomCode?: string;
  onAuthenticated: () => void;
  onAwaitingVerification: () => void;
}

export default function PINAuthenticationCard({
  studentName,
  studentIdCode,
  teacherName,
  correctPIN,
  activeRoomCode,
  onAwaitingVerification,
}: PINAuthenticationCardProps) {
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState('');
  const isSessionActive = Boolean(activeRoomCode);

  const handleRoomCodeChange = (value: string) => {
    // Only allow 4 digits
    const digits = value.replace(/\D/g, '').slice(0, 4);
    setRoomCodeInput(digits);
    setError('');
  };

  const handlePINChange = (value: string) => {
    // Format as XXXX-XXXX
    const digits = value.replace(/\D/g, '');
    let formatted = digits.slice(0, 8);
    if (formatted.length > 4) {
      formatted = `${formatted.slice(0, 4)}-${formatted.slice(4)}`;
    }
    setPinInput(formatted);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // First validate room code
    if (!activeRoomCode) {
      setError('Exam session is not active. Please contact your teacher.');
      return;
    }
    
    if (roomCodeInput !== activeRoomCode) {
      setError('Incorrect room code. Please check the code displayed by your teacher.');
      setRoomCodeInput('');
      return;
    }
    
    // Then validate PIN
    if (pinInput !== correctPIN) {
      setError('Incorrect PIN. Please try again.');
      setPinInput('');
      return;
    }
    
    // Both validations passed, now awaiting teacher verification
    onAwaitingVerification();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Key size={20} weight="duotone" className="text-primary" />
          Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Student Name</p>
          <p className="font-medium">{studentName}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Isikukood</p>
          <p className="font-mono font-medium">{studentIdCode}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Teacher</p>
          <p className="font-medium">{teacherName}</p>
        </div>

        <div className="border-t pt-4">
          {/* Session status notification */}
          {!isSessionActive && (
            <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg mb-4 flex gap-2">
              <Clock size={16} weight="regular" className="text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-orange-900 mb-1">Session Not Active</p>
                <p className="text-xs text-orange-800">
                  The teacher has not yet activated the exam session. Please wait for the teacher to generate a room code before entering your PIN.
                </p>
              </div>
            </div>
          )}

          {/* Info box about time validation */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4 flex gap-2">
            <Clock size={16} weight="regular" className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-blue-900 mb-1">Production Feature Note</p>
              <p className="text-xs text-blue-800">
                In production, time and date validation ensures students can only access exams within a specific window 
                (e.g., 15 minutes before to 30 minutes after scheduled time).
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="room-code-input" className="flex items-center gap-2">
                <Key size={16} weight="duotone" className="text-primary" />
                Room Code
              </Label>
              <Input
                id="room-code-input"
                type="text"
                inputMode="numeric"
                placeholder="4-digit code"
                value={roomCodeInput}
                onChange={(e) => handleRoomCodeChange(e.target.value)}
                maxLength={4}
                className="font-mono text-2xl text-center tracking-wider"
                disabled={!isSessionActive}
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter the 4-digit code displayed by your teacher
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pin-input" className="flex items-center gap-2">
                <ShieldCheck size={16} weight="duotone" className="text-primary" />
                Your Exam PIN
              </Label>
              <Input
                id="pin-input"
                type="text"
                inputMode="numeric"
                placeholder="XXXX-XXXX"
                value={pinInput}
                onChange={(e) => handlePINChange(e.target.value)}
                maxLength={9}
                className="font-mono text-2xl text-center tracking-wider"
                disabled={!isSessionActive}
                required
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Enter your 8-digit PIN to begin the exam
              </p>
            </div>

            <Button type="submit" className="w-full gap-2" size="lg" disabled={!isSessionActive}>
              <LockOpen size={18} weight="bold" />
              {isSessionActive ? 'Start Exam' : 'Waiting for Teacher to Activate Session'}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

