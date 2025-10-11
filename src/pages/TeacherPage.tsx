import Header from '@/components/Header';

export default function TeacherPage() {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Teacher Dashboard</h1>
          
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold mb-4">Welcome, Teacher!</h2>
              <p className="text-muted-foreground mb-4">
                Manage exam sessions and monitor student access.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold mb-3">Active Exams</h3>
                <p className="text-muted-foreground mb-4">
                  Monitor students currently taking exams
                </p>
                <div className="bg-background p-4 rounded border border-border">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Students online</p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-3">Exam Sessions</h3>
                <p className="text-muted-foreground mb-4">
                  Create and manage exam sessions
                </p>
                <div className="bg-background p-4 rounded border border-border">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Scheduled exams</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-3">Student Management</h3>
              <p className="text-muted-foreground mb-4">
                View student registrations and PIN assignments
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm font-medium">Total Students</span>
                  <span className="text-sm text-muted-foreground">15,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm font-medium">Students per Class</span>
                  <span className="text-sm text-muted-foreground">30</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-medium">Active PINs</span>
                  <span className="text-sm text-muted-foreground">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

