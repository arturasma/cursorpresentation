import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Streamlining Student Exam Logins
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A Case Study in Fast Prototyping for Estonian Public Sector
          </p>

          <Tabs defaultValue="challenge" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="challenge">Challenge</TabsTrigger>
              <TabsTrigger value="context">Context</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="approach">Approach</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            {/* Challenge Tab */}
            <TabsContent value="challenge" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Challenges with Student Exam Logins</CardTitle>
                  <CardDescription>
                    The existing system creates significant friction during exam periods
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Technical Constraints</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Mandatory computer login before each exam</li>
                        <li>Only ID cards accepted for authentication</li>
                        <li>No Face ID, Smart ID, or mobile options available</li>
                        <li>Automatic logout when leaving the classroom</li>
                        <li>Re-login required after breaks</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Scale of the Problem</h3>
                      <div className="space-y-3">
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="text-3xl font-bold text-primary">30</p>
                          <p className="text-sm text-muted-foreground">Students per class</p>
                        </div>
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="text-3xl font-bold text-primary">15,000</p>
                          <p className="text-sm text-muted-foreground">Total students taking exams</p>
                        </div>
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="text-3xl font-bold text-primary">0</p>
                          <p className="text-sm text-muted-foreground">IT support available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-lg mt-4">
                    <p className="font-semibold text-destructive mb-2">Impact</p>
                    <p className="text-sm text-foreground/90">
                      With 30 students per class and no IT support, login issues cause significant delays, 
                      stress, and reduced exam time for students. The rigid ID card requirement creates 
                      additional barriers for students who may have forgotten or lost their cards.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Context Tab */}
            <TabsContent value="context" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>How Development Works in Estonian Public Sector</CardTitle>
                  <CardDescription>
                    Understanding the traditional development process and stakeholder dynamics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">The Traditional Process</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-semibold">Stakeholder Request</p>
                          <p className="text-sm text-muted-foreground">
                            Problem identified by teachers, administrators, or other stakeholders
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-semibold">IT Department Liaison</p>
                          <p className="text-sm text-muted-foreground">
                            Information passed to IT department product managers who are responsible for Jira tickets
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-semibold">Public Procurement Contract</p>
                          <p className="text-sm text-muted-foreground">
                            Product manager has public procurement contract with private sector agency
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                          4
                        </div>
                        <div>
                          <p className="font-semibold">Team Assembly & Sprint Planning</p>
                          <p className="text-sm text-muted-foreground">
                            Product manager orders and signs off work - everything works in 2-week sprints
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Team Structure</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Architect</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Analyst</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Programmers</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Tester</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>UI/UX Designer</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Project Manager</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Infrastructure</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>PostgreSQL Database</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Redis Cache</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Frontend Applications</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Development Branches</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Test Environments</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                      The Cost Factor
                    </p>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Everything is cost. Every sprint, every team member, every hour spent on development 
                      that might not be used represents public money. In Estonian public sector, careful 
                      resource allocation is critical.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Solution Tab */}
            <TabsContent value="solution" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>The "What If?" - Problem Reframing</CardTitle>
                  <CardDescription>
                    Rethinking authentication using existing data points
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">What We Already Know</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="font-semibold text-sm">Student Data</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Student has registered for the exam</li>
                          <li>• Prior ID card login at home</li>
                          <li>• Confirmed student ID</li>
                          <li>• Student name and birthday</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-sm">Exam Data</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• School where exam takes place</li>
                          <li>• Exam's scheduled time</li>
                          <li>• Type of exam</li>
                          <li>• Exam location/room</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">The Proposed Solution</h3>
                    <p className="mb-4 text-foreground/90">
                      By hashing public student data (name, birthday, student ID) with exam information 
                      (location, date, type), we generate a unique PIN that validates identity.
                    </p>
                    
                    <div className="bg-background p-4 rounded-md border border-border mb-4">
                      <p className="font-mono text-sm mb-2">Hash Function:</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        PIN = hash(studentName + birthday + studentID + examLocation + examDate + examType)
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          1
                        </div>
                        <p className="text-sm">Student registers for exam</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          2
                        </div>
                        <p className="text-sm">System generates unique PIN based on student + exam data</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          3
                        </div>
                        <p className="text-sm">Student receives PIN (e.g., birthday + month combination)</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          4
                        </div>
                        <p className="text-sm">At exam, student enters PIN to authenticate</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          5
                        </div>
                        <p className="text-sm">System validates PIN matches exam details and student</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          6
                        </div>
                        <p className="text-sm">Teacher verifies student identity in person</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          7
                        </div>
                        <p className="text-sm">After exam completion, hashes are deleted for privacy</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Security Enhancements</p>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Room Code Validation:</strong> Teacher-generated codes prevent wrong classroom access
                      </li>
                      <li>
                        <strong>Teacher Verification:</strong> In-person identity confirmation prevents impersonation
                      </li>
                      <li>
                        <strong>Time Window Validation:</strong> (Production) Access only during designated exam periods
                      </li>
                      <li>
                        <strong>Data Privacy:</strong> All hashes deleted immediately after exam completion
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Approach Tab */}
            <TabsContent value="approach" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>The Cursor Hackathon Approach</CardTitle>
                  <CardDescription>
                    Fast prototyping vs. traditional development methodology
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border-2 border-red-200 dark:border-red-800 rounded-lg p-6 bg-red-50/50 dark:bg-red-950/20">
                      <h3 className="font-semibold text-lg mb-4 text-red-900 dark:text-red-100">
                        Traditional Development
                      </h3>
                      <ol className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">1.</span>
                          <span>Request Proof of Concept from developers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">2.</span>
                          <span>Involve architects, developers, analysts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">3.</span>
                          <span>Dedicate at least one sprint (2 weeks)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">4.</span>
                          <span>Set up development branch</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">5.</span>
                          <span>Configure test environment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">6.</span>
                          <span>Legal review</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">7.</span>
                          <span>Teacher validation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">8.</span>
                          <span>Create Jira ticket</span>
                        </li>
                      </ol>
                      <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded">
                        <p className="text-xs font-semibold text-red-900 dark:text-red-100">
                          Problem: Significant man-hours and costs incurred BEFORE knowing if solution works
                        </p>
                      </div>
                    </div>

                    <div className="border-2 border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50/50 dark:bg-green-950/20">
                      <h3 className="font-semibold text-lg mb-4 text-green-900 dark:text-green-100">
                        Click Proto Approach
                      </h3>
                      <ol className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">1.</span>
                          <span>Scaffold project in Cursor</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">2.</span>
                          <span>Detail Product Requirements Document</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">3.</span>
                          <span>Generate vanilla HTML/JS/CSS prototype</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">4.</span>
                          <span>Present to select group of teachers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">5.</span>
                          <span>Gather feedback and refine</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">6.</span>
                          <span>Present to legal with data insights</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">7.</span>
                          <span>Create Jira with documented specs</span>
                        </li>
                      </ol>
                      <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded">
                        <p className="text-xs font-semibold text-green-900 dark:text-green-100">
                          Result: Validate concept FIRST, then commit resources
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Why Vanilla HTML/JS/CSS?</h3>
                    <p className="text-sm text-foreground/90 mb-4">
                      A strategic choice driven by practical constraints in government IT environments:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>No IDE Required:</strong> HTML files can be launched directly on government computers
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>No Installation:</strong> No need for additional software or dependencies
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>Universal Compatibility:</strong> Works on any computer with a web browser
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>Easy Sharing:</strong> Can be shared via email or file system
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Validation Process</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-sm mb-2">Teacher Validation</p>
                        <p className="text-sm text-muted-foreground">
                          Presented to a select group of teachers to gather practical feedback. This allowed 
                          refinement of the user experience based on real-world classroom scenarios before 
                          any development investment.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-2">Legal Review</p>
                        <p className="text-sm text-muted-foreground">
                          Armed with pre-gathered data insights and a working prototype, legal teams could 
                          pose specific, informed questions rather than generic concerns. This accelerated 
                          the compliance review process significantly.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-2">Technical Documentation</p>
                        <p className="text-sm text-muted-foreground">
                          The Jira ticket created at the end included fully documented user stories with 
                          technical specifications, eliminating the need for further discovery phases.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Results & Key Takeaways</CardTitle>
                  <CardDescription>
                    The pragmatic outcome and lessons learned
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 border border-border p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">The Pragmatic Outcome</h3>
                    <p className="text-muted-foreground mb-4">
                      "Nothing really - things are today as they were back then."
                    </p>
                    <p className="text-sm text-foreground/90">
                      While the solution wasn't ultimately implemented, this wasn't a failure. The fast 
                      prototyping approach allowed stakeholders to make informed decisions without significant 
                      resource commitment. Sometimes the best outcome is knowing what NOT to build.
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800 p-6 rounded-lg">
                    <h3 className="font-semibold text-xl mb-4 text-green-900 dark:text-green-100">
                      The Real Success Story
                    </h3>
                    <p className="text-lg font-semibold mb-4">
                      "This approach helped us to save many man-hours and thus also the € of public money."
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-white dark:bg-green-950/40 p-4 rounded-lg border border-green-200 dark:border-green-700">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">Days</p>
                        <p className="text-sm text-muted-foreground">Not weeks or months</p>
                      </div>
                      <div className="bg-white dark:bg-green-950/40 p-4 rounded-lg border border-green-200 dark:border-green-700">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">1 Person</p>
                        <p className="text-sm text-muted-foreground">Not entire team</p>
                      </div>
                      <div className="bg-white dark:bg-green-950/40 p-4 rounded-lg border border-green-200 dark:border-green-700">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">Zero €</p>
                        <p className="text-sm text-muted-foreground">On wrong solution</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Key Lessons for Public Sector Development</h3>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Validate Before Investing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Fast prototyping enables stakeholder validation before committing significant development 
                          resources, reducing the risk of building the wrong solution.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Enable Informed Decisions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Working prototypes empower stakeholders and legal teams to ask specific questions rather 
                          than generic concerns, leading to faster and more accurate decision-making.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Reduce Discovery Overhead</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          By creating detailed prototypes upfront, you eliminate lengthy discovery phases and can 
                          deliver fully-specified user stories directly to development teams.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Respect Budget Constraints</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          In public sector, every euro counts. Fast prototyping ensures taxpayer money is spent 
                          only on validated solutions with proven stakeholder buy-in.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Future Implications</h3>
                    <p className="text-sm text-foreground/90 mb-4">
                      This approach demonstrates how product managers can act as a bridge between stakeholders 
                      and development teams, using modern AI-assisted tools to rapidly validate ideas before 
                      traditional development begins.
                    </p>
                    <p className="text-sm text-foreground/90">
                      The methodology can be applied to any public sector project where requirements are uncertain 
                      or where stakeholder buy-in is critical. By investing days instead of weeks, organizations 
                      can explore multiple solutions and find the optimal approach.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}

