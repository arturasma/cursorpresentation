import { useState } from 'react';
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
import type { Exam } from '@/types/exam';

interface StudentRegistrationModalProps {
  exam: Exam;
  open: boolean;
  onClose: () => void;
  onRegister: (idCardLastDigits: string) => void;
}

export default function StudentRegistrationModal({
  exam,
  open,
  onClose,
  onRegister,
}: StudentRegistrationModalProps) {
  const [idCardLastDigits, setIdCardLastDigits] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  // Mocked Estonian ID card data (in real environment this comes from authentication)
  const mockedData = {
    name: 'Mari Maasikas',
    idCode: '50001010001', // Estonian Isikukood format
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(idCardLastDigits);
    handleClose();
  };

  const handleClose = () => {
    setIdCardLastDigits('');
    setIsDirty(false);
    onClose();
  };

  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        handleClose();
      }
    } else {
      handleClose();
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && isDirty) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        handleClose();
      }
    } else if (!newOpen) {
      handleClose();
    }
  };

  const handleInputChange = (value: string) => {
    // Only allow digits and max 3 characters
    const filtered = value.replace(/\D/g, '').slice(0, 3);
    setIdCardLastDigits(filtered);
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
              <Label htmlFor="idCardDigits">
                ID Card Document Number (last 3 digits) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="idCardDigits"
                type="text"
                inputMode="numeric"
                placeholder="e.g., 123"
                value={idCardLastDigits}
                onChange={(e) => handleInputChange(e.target.value)}
                maxLength={3}
                required
                className="font-mono text-lg"
              />
              <p className="text-xs text-muted-foreground">
                Enter the last 3 digits from your ID card document number for PIN generation
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={idCardLastDigits.length !== 3}>
              Register for Exam
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

