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
            Fast Prototyping: Streamlining Student Exam Logins
          </h1>
          
          <div className="space-y-6 text-lg text-muted-foreground mb-8">
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
              <h2 className="text-2xl font-semibold text-foreground mb-3">About This Demonstration</h2>
              <p className="text-foreground/90">
                This interactive prototype demonstrates how product managers and public servants can 
                rapidly validate solutions before committing significant development resources. Instead 
                of the traditional approach—involving architects, developers, analysts, sprint planning, 
                and legal reviews—this "Click Proto" was built to validate the concept with stakeholders 
                first, saving substantial man-hours and public funds.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold text-foreground mb-3">Step-by-Step Guide</h2>
              <ol className="list-decimal list-inside space-y-3 text-foreground/90">
                <li className="pl-2">
                  <strong>Choose Teacher Role</strong> - Select "Teacher" to access the exam management dashboard
                </li>
                <li className="pl-2">
                  <strong>Create an Exam</strong> - Set up a new exam with details like date, location, and exam type
                </li>
                <li className="pl-2">
                  <strong>Switch to Student Role</strong> - Change your role to "Student" and register for the exam
                </li>
                <li className="pl-2">
                  <strong>Reveal Your PIN (Student)</strong> - As a student, view and reveal your unique exam PIN
                </li>
                <li className="pl-2">
                  <strong>Activate Session (Teacher)</strong> - Switch to "Teacher", click on the exam, and activate the exam session to generate a 4-digit room code
                </li>
                <li className="pl-2">
                  <strong>Enter Exam (Student)</strong> - As student, click "Take Exam", enter the room code and your PIN
                </li>
                <li className="pl-2">
                  <strong>Verify Identity (Teacher)</strong> - Teacher verifies the student's identity in person by clicking "Verify" in the verification panel
                </li>
                <li className="pl-2">
                  <strong>Complete Exam (Student)</strong> - After verification, student can access and complete the exam
                </li>
              </ol>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Process Flow</h3>
              
              <div className="bg-white dark:bg-slate-900 p-4 rounded-md mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                <pre className="text-foreground/90 leading-relaxed">
{`    👨‍🏫 TEACHER                    ⚙️  SYSTEM                     👨‍🎓 STUDENT
         │                            │                            │
         │                            │                            │
    ┌────▼─────┐                      │                            │
    │ Create   │──────────────────────▼                            │
    │ Exam     │              Store Exam Details                   │
    └──────────┘                      │                            │
         │                            │                       ┌────▼──────┐
         │                            │◄──────────────────────│ Register  │
         │                            │                       │ for Exam  │
         │                      Generate Hash                 └───────────┘
         │                   (Student + Exam Data)                 │
         │                            │                            │
         │                      Generate PIN ─────────────────────►│
         │                            │                       Reveal PIN
         │                            │                            │
    ┌────▼─────┐                      │                            │
    │ Activate │──────────────────────▼                            │
    │ Session  │              Generate Room Code                   │
    └──────────┘                      │                            │
         │                            │                       ┌────▼──────┐
         │                            │                       │ Take Exam │
         │                            │◄──────────────────────│ Enter:    │
         │                            │                       │ Room+PIN  │
         │                      Validate Codes                └───────────┘
         │                            │                            │
         │                            │                       Await Verify
    ┌────▼─────┐                      │                            │
    │ Verify   │──────────────────────▼                            │
    │ Student  │              Mark as Verified                     │
    │ (in person)                     │                            │
    └──────────┘                      │                            │
         │                            │                            │
         │                      Grant Access ─────────────────────►│
         │                            │                       Complete Exam
         │                            │                            │
         │                      Delete Hashes                      │
         │                            │                            │
         ▼                            ▼                            ▼`}
                </pre>
              </div>

              
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/50 p-6 rounded-lg border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-3">The Problem</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Mandatory computer login before each exam</li>
                  <li>Only ID cards accepted (no Face ID, Smart ID, or mobile options)</li>
                  <li>Automatic logout when leaving the classroom</li>
                  <li>Re-login required after breaks</li>
                  <li>30 students per class with no IT support</li>
                  <li>15,000 total students taking exams</li>
                </ul>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h2 className="text-xl font-semibold text-foreground mb-3">The Solution</h2>
                <p className="mb-3">
                  By hashing public student data (name, birthday, student ID) with exam information 
                  (location, date, type), we generate a unique PIN that validates identity. Students 
                  register once, receive their PIN, and use it to authenticate at the exam location.
                </p>
                <p className="font-semibold text-foreground mb-2">Security Enhancements:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Room Code Validation:</strong> Teacher-generated codes prevent wrong classroom access</li>
                  <li><strong>Teacher Verification:</strong> In-person identity confirmation prevents impersonation</li>
                  <li><strong>Time Window Validation:</strong> (Production) Access only during designated exam periods</li>
                </ul>
                <p className="text-sm mt-3">
                  After exam completion, all hashes are deleted for privacy.
                </p>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h2 className="text-xl font-semibold text-foreground mb-3">The Value of Fast Prototyping</h2>
              <p className="text-foreground/90">
                Traditional development would require a Proof of Concept from developers, at least one 
                sprint, development branches, test environments, legal review, and teacher validation—all 
                before knowing if the solution works. This prototype enabled immediate feedback from teachers 
                and legal teams, allowing for informed decisions and precise questions rather than generic concerns. 
                The result: significant savings in time, resources, and public money.
              </p>
            </div>
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

