import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';

export default function Homepage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Student Exam Login Prototype
          </h1>

          <div className="space-y-6 text-lg text-muted-foreground mb-8">
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
              <h2 className="text-2xl font-semibold text-foreground mb-3">What This Prototype Demonstrates</h2>
              <p className="text-foreground/90">
                This interactive prototype showcases a streamlined student exam login flow using PIN authentication. 
                Students register once, receive a unique PIN generated from their data, and use it along with a 
                teacher-provided room code to authenticate at exam locations. The system includes teacher verification 
                to ensure security.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-semibold text-foreground mb-3">How to Test the Prototype</h2>
              <ol className="list-decimal list-inside space-y-3 text-foreground/90">
                <li className="pl-2">
                  <strong>Choose Teacher Role</strong> - Select "Teacher" from the header to access the exam management dashboard
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
                <li className="pl-2">
                  <strong>Leave feedback (Teacher/Student)</strong> - After trying the flow leave the feedback or vote on already left feedback on the feedback page which you can find in header
                </li>
              </ol>
              <h3 className="text-2xl font-semibold text-foreground mb-4 mt-6">Process Flow</h3>
              
              <div className="bg-white dark:bg-slate-900 p-4 rounded-md mb-4 font-mono text-xs sm:text-sm overflow-x-auto">
                <pre className="text-foreground/90 leading-relaxed">
{`      TEACHER                       SYSTEM                       STUDENT
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
          </div>
        </div>
      </main>
    </>
  );
}

