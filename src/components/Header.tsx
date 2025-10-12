import { House, CaretDown, UserSwitch, SignOut, List } from 'phosphor-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useUser } from '@/context/UserContext';
import { useExam } from '@/context/ExamContext';

export default function Header() {
  const { userRole, isDialogOpen, setIsDialogOpen, handleRoleSelect, handleLogout } = useUser();
  const { isInExam, setShowExitConfirmation, setPendingAction } = useExam();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const isHomepage = location.pathname === '/';
  const isAboutPage = location.pathname === '/about';
  const isFeedbackPage = location.pathname === '/feedback';
  const isOnExamPage = location.pathname.startsWith('/exam/');

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide header when scrolling down (after 100px)
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show header when mouse is near the top (within 100px)
      if (e.clientY < 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleDashboardClick = () => {
    if (userRole) {
      const dashboardPath = userRole === 'teacher' ? '/teacher' : '/student';
      // Don't navigate if already on dashboard
      if (location.pathname !== dashboardPath) {
        navigate(dashboardPath);
      }
    } else {
      // Open role selection dialog
      setIsDialogOpen(true);
    }
  };

  const handleRoleSwitchClick = (role: 'teacher' | 'student') => {
    if (isInExam) {
      // Student is actively taking an exam
      // Set pending action and show confirmation
      setPendingAction({ type: 'roleSwitch', newRole: role });
      setShowExitConfirmation(true);
    } else {
      // Switch role immediately (no exam in progress)
      handleRoleSelect(role);
      
      // Navigate to appropriate page for the new role
      if (isOnExamPage) {
        // If on exam page, stay on same exam to see it from new role's perspective
        const examId = location.pathname.split('/exam/')[1];
        if (examId) {
          // Stay on same exam page - it will re-render with new role
          navigate(`/exam/${examId}`, { replace: true });
        } else {
          // Go to appropriate dashboard
          navigate(role === 'teacher' ? '/teacher' : '/student');
        }
      }
      // Otherwise, the default routing will handle it
    }
  };

  const handleLogoutClick = () => {
    if (isInExam) {
      setPendingAction({ type: 'logout' });
      setShowExitConfirmation(true);
    } else {
      handleLogout();
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border bg-background transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Home Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleHomeClick}
          aria-label="Home"
        >
          <House size={32} weight="regular" />
        </Button>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={handleDashboardClick}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/about')}
          >
            About
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/feedback')}
          >
            Feedback
          </Button>
          
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
                <Button>{isHomepage || isAboutPage || isFeedbackPage ? 'Select Role' : 'Login'}</Button>
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
                    onClick={() => handleRoleSelect('teacher', () => {
                      navigate('/teacher');
                    })}
                    variant="outline"
                    className="w-full"
                  >
                    Teacher
                  </Button>
                  <Button
                    onClick={() => handleRoleSelect('student', () => {
                      navigate('/student');
                    })}
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

        {/* Mobile Menu - Visible only on Mobile */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <List size={32} weight="regular" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleDashboardClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate('/about');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start"
                >
                  About
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate('/feedback');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start"
                >
                  Feedback
                </Button>

                {userRole ? (
                  <>
                    <div className="border-t border-border pt-4">
                      <p className="text-sm font-semibold text-muted-foreground mb-2 px-2">
                        Current Role: <span className="capitalize text-foreground">{userRole}</span>
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleRoleSwitchClick('teacher');
                        setMobileMenuOpen(false);
                      }}
                      disabled={userRole === 'teacher'}
                      className="w-full justify-start gap-2"
                    >
                      <UserSwitch size={20} weight="regular" />
                      Switch to Teacher
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleRoleSwitchClick('student');
                        setMobileMenuOpen(false);
                      }}
                      disabled={userRole === 'student'}
                      className="w-full justify-start gap-2"
                    >
                      <UserSwitch size={20} weight="regular" />
                      Switch to Student
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleLogoutClick();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start gap-2 mt-4"
                    >
                      <SignOut size={20} weight="regular" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
                        {isHomepage || isAboutPage || isFeedbackPage ? 'Select Role' : 'Login'}
                      </Button>
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
                          onClick={() => handleRoleSelect('teacher', () => {
                            navigate('/teacher');
                          })}
                          variant="outline"
                          className="w-full"
                        >
                          Teacher
                        </Button>
                        <Button
                          onClick={() => handleRoleSelect('student', () => {
                            navigate('/student');
                          })}
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

