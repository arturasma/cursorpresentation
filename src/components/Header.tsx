import { House } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUser } from '@/context/UserContext';

export default function Header() {
  const { userRole, isDialogOpen, setIsDialogOpen, handleRoleSelect, handleLogout } = useUser();
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          <House size={32} weight="regular" />
        </Button>

        <div className="flex items-center gap-4">
          {userRole ? (
            <>
              <span className="text-sm font-medium capitalize">
                Role: {userRole}
              </span>
              <Button onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Login</Button>
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

