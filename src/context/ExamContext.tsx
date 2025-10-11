import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ExamContextType {
  isInExam: boolean;
  setIsInExam: (inExam: boolean) => void;
  showExitConfirmation: boolean;
  setShowExitConfirmation: (show: boolean) => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [isInExam, setIsInExam] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  return (
    <ExamContext.Provider
      value={{
        isInExam,
        setIsInExam,
        showExitConfirmation,
        setShowExitConfirmation,
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

