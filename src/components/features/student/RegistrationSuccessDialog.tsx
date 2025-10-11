import { CheckCircle, DeviceMobile, Eye, IdentificationCard } from 'phosphor-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface RegistrationSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examName: string;
  pin: string;
}

export default function RegistrationSuccessDialog({
  open,
  onOpenChange,
  examName,
  pin,
}: RegistrationSuccessDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-full bg-green-100 p-2">
              <CheckCircle size={32} weight="bold" className="text-green-600" />
            </div>
            <AlertDialogTitle className="text-2xl">Registration Successful!</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base pt-4">
            You have successfully registered for <strong>{examName}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 my-4">
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <IdentificationCard size={20} weight="duotone" className="text-primary" />
              <p className="font-semibold">Your Exam PIN</p>
            </div>
            <p className="text-3xl font-bold font-mono text-center py-3">{pin}</p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex gap-3 items-start">
              <Eye size={20} weight="regular" className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">View in Exam System</p>
                <p className="text-muted-foreground">
                  You can view your PIN anytime in the "My Exams" tab of this system.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <DeviceMobile size={20} weight="regular" className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">SMS Confirmation</p>
                <p className="text-muted-foreground">
                  You will receive an SMS with your PIN before the exam starts.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">
                ℹ️ <strong>Note:</strong> Your teacher can also see your PIN if you need assistance during the exam.
              </p>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogAction className="w-full">Got it!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

