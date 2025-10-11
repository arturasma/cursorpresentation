import { House, CaretDown, UserSwitch, SignOut } from 'phosphor-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/context/UserContext';
import { useExam } from '@/context/ExamContext';

export default function Header() {
  const { userRole, isDialogOpen, setIsDialogOpen, handleRoleSelect, handleLogout } = useUser();
  const { isInExam, setShowExitConfirmation } = useExam();
  const location = useLocation();
  
  const isHomepage = location.pathname === '/';

  const handleHomeClick = () => {
    if (isInExam) {
      setShowExitConfirmation(true);
    } else {
      handleLogout();
    }
  };

  const handleRoleSwitchClick = (role: 'teacher' | 'student') => {
    if (isInExam) {
      setShowExitConfirmation(true);
    } else {
      handleRoleSelect(role);
    }
  };

  const handleLogoutClick = () => {
    if (isInExam) {
      setShowExitConfirmation(true);
    } else {
      handleLogout();
    }
  };

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleHomeClick}
          aria-label="Home"
        >
          <House size={32} weight="regular" />
        </Button>

        <div className="flex items-center gap-4">
          {userRole ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <span className="capitalize">{userRole}</span>
                  <CaretDown size={16} weight="bold" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Current Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleRoleSwitchClick('teacher')}
                  disabled={userRole === 'teacher'}
                  className="gap-2"
                >
                  <UserSwitch size={16} weight="regular" />
                  Switch to Teacher
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleRoleSwitchClick('student')}
                  disabled={userRole === 'student'}
                  className="gap-2"
                >
                  <UserSwitch size={16} weight="regular" />
                  Switch to Student
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogoutClick}
                  className="gap-2 text-destructive focus:text-destructive"
                >
                  <SignOut size={16} weight="regular" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>{isHomepage ? 'Select Role' : 'Login'}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Select Your Role</DialogTitle>
                  <DialogDescription>
                    Please select whether you are a teacher or a student.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <Button
                    onClick={() => handleRoleSelect('teacher')}
                    variant="outline"
                    className="w-full"
                  >
                    Teacher
                  </Button>
                  <Button
                    onClick={() => handleRoleSelect('student')}
                    variant="outline"
                    className="w-full"
                  >
                    Student
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
}

