import { useState } from 'react';
import { GithubLogo, LinkedinLogo } from 'phosphor-react';
import ConfirmDialog from './ConfirmDialog';

export default function Footer() {
  const [showPurgeDialog, setShowPurgeDialog] = useState(false);

  const handlePurgeCache = () => {
    localStorage.clear();
    setShowPurgeDialog(false);
    window.location.href = '/';
  };

  return (
    <>
      <footer className="w-full border-t border-border bg-background mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Author info */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2025 Arturas Matšenas</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/arturas-mat%C5%A1enas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinLogo size={20} weight="fill" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href="https://github.com/arturasma/cursorpresentation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub Repository"
              >
                <GithubLogo size={20} weight="fill" />
                <span className="hidden sm:inline">Source Code</span>
              </a>
              <button
                onClick={() => setShowPurgeDialog(true)}
                className="text-sm text-red-600 hover:text-red-700 transition-colors"
                aria-label="Purge Cache"
              >
                Purge Cache
              </button>
            </div>
          </div>
        </div>
      </footer>

      <ConfirmDialog
        open={showPurgeDialog}
        onOpenChange={setShowPurgeDialog}
        title="Clear All Data?"
        description="This will permanently delete all stored data including exams, student registrations, feedback, and your user session. This action cannot be undone."
        confirmText="Purge Cache"
        cancelText="Cancel"
        onConfirm={handlePurgeCache}
        variant="destructive"
      />
    </>
  );
}

