import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Warning, CaretRight } from 'phosphor-react';
import { useUser } from '@/context/UserContext';

export default function AboutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = useUser();
  
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('about-page-active-tab') || 'challenge';
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('about-page-active-tab', value);
  };

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

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
                        <li>Physical ID cards are the ONLY authentication method for high-stakes tests</li>
                        <li>No biometrics, Smart ID, or Mobile ID (phones are confiscated before exams)</li>
                        <li>Aging examination platform makes experimentation with existing codebase extremely difficult</li>
                        <li>Computer issues arise, but schools rarely have IT staff on call due to budget constraints</li>
                        <li>Schools sometimes lack basic technical knowledge (e.g., "How many outlets do we need?")</li>
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
                          <p className="text-3xl font-bold text-primary">15k</p>
                          <p className="text-sm text-muted-foreground">Governmental exams simultaneously</p>
                        </div>
                        <div className="bg-primary/10 p-4 rounded-lg">
                          <p className="text-3xl font-bold text-primary">50k</p>
                          <p className="text-sm text-muted-foreground">Students using system for mid-high stakes exams</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-lg mt-4">
                    <p className="font-semibold text-destructive mb-2">Impact</p>
                    <p className="text-sm text-foreground/90">
                      The aged authentication system clashes with modern expectations, creating friction at the worst possible time. 
                      Students are already under immense pressure—high-stakes exams can determine whether they graduate at all. 
                      Login issues, forgotten ID cards, searching for pin codes before exam, and computer problems compound this stress, with minimal IT support available 
                      to resolve issues quickly across 30+ students per room.
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
                      <div className="mt-4 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          <strong>Hourly Rate:</strong> 40-80€ per working hour
                        </p>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Infrastructure & Tech Stack</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Kubernetes & Docker containerization</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>CI/CD pipelines</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Load balancers: HAProxy, Nginx</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Own server infrastructure (sometimes)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>PostgreSQL database, Redis cache</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Message queues: RabbitMQ, Kafka</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Frontend: Angular, React frameworks</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Backend: Java, C, Python</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Monitoring: Prometheus, Zabbix</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Error tracking: Sentry</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>X-Road (Estonian data exchange layer)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>e-Identity/Digital ID integration</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          <span>Development & test environments</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                      The Cost Factor
                    </p>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                      Everything is cost. Every sprint, every team member, every hour spent on development 
                      that might not be used represents public money. In Estonian public sector, careful 
                      resource allocation is critical.
                    </p>
                    <div className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
                      <p>
                        <strong>Getting even a simple prototype is expensive:</strong> Requires Jira tickets, 
                        Confluence documentation, potentially Figma flow diagrams—all adding to the cost before 
                        a single line of code is written.
                      </p>
                      <p>
                        <strong>Internal resources are slim:</strong> Teams must balance new development with 
                        ongoing bug fixes and operations, leaving little capacity for experimentation.
                      </p>
                      <p>
                        <strong>Opportunity cost is real:</strong> Every hour spent on an unvalidated prototype 
                        means other features in the pipeline—features with waiting, potentially unhappy end users—get 
                        delayed.
                      </p>
                    </div>
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
                        <p className="text-sm">Student receives PIN via SMS before exam start and can view it in the portal (after validating with national ID). Teacher can also see the PIN.</p>
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
                        <p className="text-sm">Data handling is done on the approval of lawyers in accordance with European and national laws</p>
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
                          <span>PM identifies flow isn't working for modern day, needs stakeholder buy-in</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">2.</span>
                          <span>Write Confluence page with proposal</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">3.</span>
                          <span>Create Jira tickets for agency review</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">4.</span>
                          <span>Analyst reviews and validates requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">5.</span>
                          <span>UI/UX specialist designs, conducts Teams calls for validation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">6.</span>
                          <span className="flex items-center gap-1">
                            <Warning size={16} weight="fill" className="text-red-600 dark:text-red-400 flex-shrink-0" />
                            Communication chain grows: PM → Agency PM → Analyst → UI/UX → Real beneficiaries → UI/UX/Analyst → Agency PM → PM
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">7.</span>
                          <span>Figma and Jira delivered, closed, paid for</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">8.</span>
                          <span>Create new Jira tickets for developers based on analyst/UI-UX work</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">9.</span>
                          <span>Developers find time, analyze requirements before starting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">10.</span>
                          <span>Development, testing, deployment to test environment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">11.</span>
                          <span>PM searches for buy-in from actual users</span>
                        </li>
                      </ol>
                      <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded">
                        <p className="text-xs font-semibold text-red-900 dark:text-red-100">
                          Timeline: 2-4 weeks minimum (1-2 sprints). Significant costs and man-hours BEFORE knowing if real users will accept it.
                        </p>
                      </div>
                    </div>

                    <div className="border-2 border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50/50 dark:bg-green-950/20">
                      <h3 className="font-semibold text-lg mb-4 text-green-900 dark:text-green-100">
                        Click Proto Approach
                      </h3>
                      <div className="mb-3 p-2 bg-green-100 dark:bg-green-900/40 rounded text-xs">
                        <strong>Stack:</strong> React + TypeScript + Vite SPA hosted on Cloudflare Pages
                      </div>
                      <ol className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">1.</span>
                          <span>PM prepares PRD in Confluence</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">2.</span>
                          <span>Scaffold project in Cursor on personal computer</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">3.</span>
                          <span>Create SPA using Confluence PRD as guide</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">4.</span>
                          <span>Publish to Cloudflare Pages for teachers to test</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">5.</span>
                          <span>Gather feedback from teachers and refine</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">6.</span>
                          <span>Present validated solution to legal</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">7.</span>
                          <span>If buy-in: Go straight to development (skip analyst, skip Figma—systems have established design frameworks)</span>
                        </li>
                      </ol>
                      <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded">
                        <p className="text-xs font-semibold text-green-900 dark:text-green-100">
                          Timeline: 8 hours (one full workday for PM). Validate concept FIRST, then commit resources.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">What to consider</h3>
                    <p className="text-sm text-foreground/90 mb-4">
                      Gornmental strict PC policy:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>Fast Development:</strong>Strict cybersecurity policies with VPN access requirements
                       
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>Type Safety:</strong>Heavy PC proccesses monitoring for cybersecurity
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>Instant Deployment:</strong>No software installation permitted (including Cursor, IDEs, development tools)
                       </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>Only HTML pages and basic web browsers accessible</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>
                          <strong>Strong security lockdown tackles the effective approach from product manager</strong>
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
                      <div>
                        <p className="font-semibold text-sm mb-2">Easy mobile testing</p>
                        <p className="text-sm text-muted-foreground">
                          The prototype's responsive design allowed easy testing across many screen sizes as well asmobile devices, helping identify 
                          and address cross-platform issues early in the validation process rather than discovering them 
                          during development.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-2">Public feedback and voting system</p>
                        <p className="text-sm text-muted-foreground">
                          The prototype included an easy-to-use feedback form where teachers and students could leave comments 
                          and vote on others' feedback. This helped surface the most valuable insights and prioritize 
                          improvements based on actual user needs during the prototyping phase.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/40 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">Try It Yourself</h3>
                    <p className="text-sm text-foreground/90 mb-4">
                      Test the prototype yourself and experience the flow firsthand. Navigate to the home page 
                      and select a role from the header in the upper left corner to explore the different user perspectives.
                    </p>
                    <Button 
                      onClick={() => {
                        handleLogout();
                        navigate('/');
                      }}
                      size="lg"
                      className="group"
                    >
                      Go to Home Page
                      <CaretRight size={20} weight="bold" className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
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
                      "Nothing really happened afterwards - things are today as they were back then."
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
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">8h</p>
                        <p className="text-sm text-muted-foreground">Not weeks or months</p>
                      </div>
                      <div className="bg-white dark:bg-green-950/40 p-4 rounded-lg border border-green-200 dark:border-green-700">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">1 Person</p>
                        <p className="text-sm text-muted-foreground">Not entire team</p>
                      </div>
                      <div className="bg-white dark:bg-green-950/40 p-4 rounded-lg border border-green-200 dark:border-green-700">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">0 €</p>
                        <p className="text-sm text-muted-foreground">On wrong solution</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
                    <h3 className="font-semibold text-lg mb-4">Key Lessons for Public Sector Development</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-base mb-2">Validate Before Investing</h4>
                        <p className="text-sm text-muted-foreground">
                          Fast prototyping enables stakeholder validation before committing significant development 
                          resources, reducing the risk of building the wrong solution.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-base mb-2">Enable Informed Decisions</h4>
                        <p className="text-sm text-muted-foreground">
                          Working prototypes empower stakeholders and legal teams to ask specific questions rather 
                          than generic concerns, leading to faster and more accurate decision-making.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-base mb-2">Reduce Discovery Overhead</h4>
                        <p className="text-sm text-muted-foreground">
                          By creating detailed prototypes upfront, you eliminate lengthy discovery phases and can 
                          deliver fully-specified user stories directly to development teams.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-base mb-2">Respect Budget Constraints</h4>
                        <p className="text-sm text-muted-foreground">
                          In public sector, every euro counts. Fast prototyping ensures taxpayer money is spent 
                          only on validated solutions with proven stakeholder buy-in.
                        </p>
                      </div>
                    </div>
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

