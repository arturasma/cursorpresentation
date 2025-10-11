import Header from '@/components/Header';
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

export default function Homepage() {
  const { userRole, isDialogOpen, setIsDialogOpen, handleRoleSelect } = useUser();

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Streamlining Student Exam Logins
          </h1>
          
          <div className="space-y-6 text-lg text-muted-foreground mb-8">
            <p>
              This is a fast prototyping demonstration showcasing an innovative solution 
              to the challenges faced during student exam logins.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/50 p-6 rounded-lg border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-3">Current Challenges</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Mandatory computer login before each exam</li>
                  <li>Exclusive reliance on ID cards (no Face ID, Smart ID, or mobile options)</li>
                  <li>Automatic logout when leaving the classroom</li>
                  <li>Need to re-login after breaks</li>
                  <li>30 students per class with no IT support</li>
                  <li>15,000 total students taking exams</li>
                </ul>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h2 className="text-xl font-semibold text-foreground mb-3">Our Solution</h2>
                <p>
                  By hashing public student data and exam information, we generate a unique PIN 
                  (such as birthday and month) that validates the student's identity. Students 
                  register, receive their PIN, use it to log in at the exam location, and the 
                  system validates the match between exam details and PIN to grant access.
                </p>
              </div>
            </div>

            <p>
              This approach demonstrates how product managers can rapidly prototype solutions, 
              validate them with stakeholders, and save significant development time and public funds.
            </p>
          </div>

          {!userRole && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Started - Select Your Role
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
      </main>
    </>
  );
}

