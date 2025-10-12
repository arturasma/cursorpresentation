import { useState, useEffect } from 'react';
import { IdentificationCard } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import type { Exam } from '@/types/exam';

interface StudentRegistrationModalProps {
  exam: Exam;
  open: boolean;
  onClose: () => void;
  onRegister: () => void;
}

export default function StudentRegistrationModal({
  exam,
  open,
  onClose,
  onRegister,
}: StudentRegistrationModalProps) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  // Mocked Estonian ID card data (in real environment this comes from authentication)
  const mockedData = {
    name: 'Mari Maasikas',
    idCode: '50001010001', // Estonian Isikukood format
  };

  // Generate a random 3-digit code when the modal opens
  useEffect(() => {
    if (open) {
      const randomCode = Math.floor(100 + Math.random() * 900).toString();
      setGeneratedCode(randomCode);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmationCode === generatedCode) {
      onRegister();
      handleClose();
    }
  };

  const handleClose = () => {
    setConfirmationCode('');
    setGeneratedCode('');
    setIsDirty(false);
    setShowUnsavedDialog(false);
    onClose();
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      handleClose();
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && isDirty) {
      setShowUnsavedDialog(true);
    } else if (!newOpen) {
      handleClose();
    }
  };

  const handleInputChange = (value: string) => {
    // Only allow digits and max 3 characters
    const filtered = value.replace(/\D/g, '').slice(0, 3);
    setConfirmationCode(filtered);
    setIsDirty(filtered.length > 0);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <IdentificationCard size={24} weight="duotone" className="text-primary" />
            <DialogTitle>Register for Exam</DialogTitle>
          </div>
          <DialogDescription>
            Complete your registration using your Estonian ID card credentials.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <h3 className="font-semibold mb-3">Exam Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exam:</span>
                <span className="font-medium">{exam.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subject:</span>
                <span className="font-medium capitalize">{exam.subject?.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium capitalize">{exam.examType?.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Grade Level:</span>
                <span className="font-medium">{exam.gradeLevel?.replace('grade-', '') + 'th Grade'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">School:</span>
                <span className="font-medium">{exam.school?.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room:</span>
                <span className="font-medium">{exam.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">
                  {new Date(exam.scheduledDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{exam.scheduledTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Teacher:</span>
                <span className="font-medium">{exam.teacherName}</span>
              </div>
              {exam.durationMinutes && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{exam.durationMinutes} minutes</span>
                </div>
              )}
              {exam.numberOfBreaks && exam.breakDurationMinutes && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Breaks:</span>
                  <span className="font-medium">{exam.numberOfBreaks} × {exam.breakDurationMinutes} min</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-xs text-blue-800 mb-3">
                ℹ️ In production, this data is automatically retrieved from your authenticated ID card
              </p>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-blue-900">Full Name (from ID card)</Label>
                  <Input
                    value={mockedData.name}
                    disabled
                    className="mt-1 bg-white"
                  />
                </div>

                <div>
                  <Label className="text-xs text-blue-900">Isikukood (from ID card)</Label>
                  <Input
                    value={mockedData.idCode}
                    disabled
                    className="mt-1 font-mono bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <Label htmlFor="confirmationCode" className="text-sm font-semibold text-amber-900">
                  Attention Check <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-amber-800 mt-2 mb-3">
                  In order to confirm you have read the exam information, please type these numbers below:
                </p>
                <div className="bg-white border-2 border-amber-300 rounded-lg p-4 mb-3 text-center">
                  <span className="font-mono text-3xl font-bold text-amber-900 tracking-wider">
                    {generatedCode}
                  </span>
                </div>
                <Input
                  id="confirmationCode"
                  type="text"
                  inputMode="numeric"
                  placeholder="Type the numbers here"
                  value={confirmationCode}
                  onChange={(e) => handleInputChange(e.target.value)}
                  maxLength={3}
                  required
                  className="font-mono text-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={confirmationCode !== generatedCode}>
              Register for Exam
            </Button>
          </div>
        </form>
      </DialogContent>

      <ConfirmDialog
        open={showUnsavedDialog}
        onOpenChange={setShowUnsavedDialog}
        title="Unsaved Changes"
        description="You have unsaved changes. Are you sure you want to leave? You will need to start registration again."
        confirmText="Leave"
        cancelText="Stay"
        onConfirm={handleClose}
        variant="destructive"
      />
    </Dialog>
  );
}

