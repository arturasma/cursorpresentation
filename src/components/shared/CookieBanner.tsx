import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'phosphor-react';

const COOKIE_CONSENT_KEY = 'cookie-consent-accepted';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-6xl mx-auto bg-background border-2 border-border rounded-lg shadow-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-base mb-2">Privacy Notice</h3>
            <p className="text-sm text-muted-foreground">
              This site uses local storage only and has no real backend. The site does not do any external requests. The site is hosted on 
              Cloudflare and collects non-personalized data that is compliant with GDPR. You can delete all locally stored data at any time 
              using the button in the footer.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button 
              onClick={handleAccept}
              className="flex-1 md:flex-none"
            >
              OK, Got it
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAccept}
              className="md:hidden"
            >
              <X size={20} weight="bold" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

