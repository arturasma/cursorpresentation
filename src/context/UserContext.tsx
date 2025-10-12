import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type UserRole = 'teacher' | 'student' | null;

interface UserContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleRoleSelect: (role: 'teacher' | 'student', afterSelect?: () => void) => void;
  handleLogout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRoleSelect = (role: 'teacher' | 'student', afterSelect?: () => void) => {
    setUserRole(role);
    setIsDialogOpen(false);
    afterSelect?.();
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <UserContext.Provider
      value={{
        userRole,
        setUserRole,
        isDialogOpen,
        setIsDialogOpen,
        handleRoleSelect,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

