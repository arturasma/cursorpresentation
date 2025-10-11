import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type PendingAction = 
  | { type: 'none' }
  | { type: 'roleSwitch'; newRole: 'teacher' | 'student' }
  | { type: 'logout' }
  | { type: 'home' };

interface ExamContextType {
  isInExam: boolean;
  setIsInExam: (inExam: boolean) => void;
  showExitConfirmation: boolean;
  setShowExitConfirmation: (show: boolean) => void;
  pendingAction: PendingAction;
  setPendingAction: (action: PendingAction) => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [isInExam, setIsInExam] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>({ type: 'none' });

  return (
    <ExamContext.Provider
      value={{
        isInExam,
        setIsInExam,
        showExitConfirmation,
        setShowExitConfirmation,
        pendingAction,
        setPendingAction,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
}

