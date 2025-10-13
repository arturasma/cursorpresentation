import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface StudentContextType {
  studentName: string;
  setStudentName: (name: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const STUDENT_NAME_KEY = 'studentName';

export function StudentProvider({ children }: { children: ReactNode }) {
  // Student name persists in localStorage but is tab-specific (not synced)
  const [studentName, setStudentNameState] = useState<string>(() => {
    return localStorage.getItem(STUDENT_NAME_KEY) || '';
  });

  const setStudentName = (name: string) => {
    setStudentNameState(name);
    localStorage.setItem(STUDENT_NAME_KEY, name);
  };

  return (
    <StudentContext.Provider value={{ studentName, setStudentName }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}

