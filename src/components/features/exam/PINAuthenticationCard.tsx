import { useState } from 'react';
import { Key, LockOpen, ShieldCheck } from 'phosphor-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PINAuthenticationCardProps {
  studentName: string;
  studentIdCode: string;
  teacherName: string;
  correctPIN: string;
  onAuthenticated: () => void;
}

export default function PINAuthenticationCard({
  studentName,
  studentIdCode,
  teacherName,
  correctPIN,
  onAuthenticated,
}: PINAuthenticationCardProps) {
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState('');

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
    if (pinInput === correctPIN) {
      onAuthenticated();
    } else {
      setError('Incorrect PIN. Please try again.');
      setPinInput('');
    }
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pin-input" className="flex items-center gap-2">
                <ShieldCheck size={16} weight="duotone" className="text-primary" />
                Enter Your Exam PIN
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
                required
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Enter your 8-digit PIN to begin the exam
              </p>
            </div>

            <Button type="submit" className="w-full gap-2" size="lg">
              <LockOpen size={18} weight="bold" />
              Start Exam
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

