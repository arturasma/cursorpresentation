import Header from '@/components/Header';

export default function StudentPage() {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Student Dashboard</h1>
          
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold mb-4">Welcome, Student!</h2>
              <p className="text-muted-foreground mb-4">
                Access your exam information and login credentials here.
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h3 className="text-xl font-semibold mb-3">Your Exam PIN</h3>
              <p className="text-muted-foreground mb-4">
                Use your unique PIN to login at the exam location. Your PIN is generated 
                from your birthday and registration information.
              </p>
              <div className="bg-background p-4 rounded border border-border">
                <p className="text-sm text-muted-foreground mb-2">Your PIN:</p>
                <p className="text-3xl font-bold font-mono">****-****</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Upcoming Exams</h4>
                <p className="text-sm text-muted-foreground">
                  View your scheduled exams and locations
                </p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Exam History</h4>
                <p className="text-sm text-muted-foreground">
                  Review your past exam sessions
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

