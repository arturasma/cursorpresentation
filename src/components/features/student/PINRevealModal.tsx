import { IdentificationCard, DeviceMobile, Fingerprint } from 'phosphor-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PINRevealModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReveal: () => void;
  examName: string;
}

export default function PINRevealModal({
  open,
  onOpenChange,
  onReveal,
  examName,
}: PINRevealModalProps) {
  const handleReveal = () => {
    onReveal();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Authentication Required</DialogTitle>
          <DialogDescription className="pt-2">
            To view your exam PIN for <strong>{examName}</strong>, please authenticate using one of Estonia's national identification methods.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-900 font-semibold mb-3">
              🇪🇪 Estonian National Authentication Methods
            </p>
            <p className="text-xs text-blue-800 mb-4">
              In the production environment, you would authenticate using one of these secure methods:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white p-3 rounded border border-blue-100">
                <IdentificationCard size={24} weight="duotone" className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 text-sm">ID Card</p>
                  <p className="text-xs text-blue-700">
                    Authenticate using your physical Estonian ID card with a card reader
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3 rounded border border-blue-100">
                <DeviceMobile size={24} weight="duotone" className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 text-sm">Mobile-ID / Smart-ID</p>
                  <p className="text-xs text-blue-700">
                    Authenticate securely using your mobile device
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3 rounded border border-blue-100">
                <Fingerprint size={24} weight="duotone" className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 text-sm">Face ID / Touch ID</p>
                  <p className="text-xs text-blue-700">
                    Use biometric authentication if configured on your device
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              <strong>This is a prototype demonstration.</strong> For this showcase, you can reveal your PIN by clicking the button below. In production, one of the authentication methods above would be required.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleReveal}>
            Reveal PIN
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

