import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SEOHead from '@/components/shared/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VerticalFlowStepper from '@/components/features/exam/VerticalFlowStepper';
import { 
  Chalkboard, 
  UserCircle, 
  Database, 
  Key, 
  User,
  IdentificationCard,
  CheckCircle,
  CaretRight,
  ClipboardText,
  ShieldCheck
} from 'phosphor-react';

export default function Homepage() {
  const location = useLocation();
  const navigate = useNavigate();
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollToFlow = () => {
    flowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const flowSteps = [
    {
      teacher: {
        role: 'teacher' as const,
        title: 'Create Exam',
        description: 'Set up exam with date, location, and details',
        icon: <Chalkboard size={24} weight="duotone" />,
      },
      system: {
        role: 'system' as const,
        title: 'Store Exam Details',
        description: 'Save exam configuration in database',
        icon: <Database size={24} weight="duotone" />,
      },
    },
    {
      student: {
        role: 'student' as const,
        title: 'Register for Exam',
        description: 'Student enrolls using their ID card',
        icon: <UserCircle size={24} weight="duotone" />,
      },
      system: {
        role: 'system' as const,
        title: 'Generate PIN',
        description: 'Create unique PIN from student + exam data hash',
        icon: <Key size={24} weight="duotone" />,
      },
    },
    {
      teacher: {
        role: 'teacher' as const,
        title: 'Activate Session',
        description: 'Start exam and generate 4-digit room code',
        icon: <ShieldCheck size={24} weight="duotone" />,
      },
      system: {
        role: 'system' as const,
        title: 'Generate Room Code',
        description: 'Create temporary access code for classroom',
        icon: <Key size={24} weight="duotone" />,
      },
    },
    {
      student: {
        role: 'student' as const,
        title: 'Take Exam (Room + PIN)',
        description: 'Enter room code and personal PIN to authenticate',
        icon: <IdentificationCard size={24} weight="duotone" />,
      },
      system: {
        role: 'system' as const,
        title: 'Validate Codes',
        description: 'Verify room code and PIN match exam session',
        icon: <CheckCircle size={24} weight="duotone" />,
      },
    },
    {
      teacher: {
        role: 'teacher' as const,
        title: 'Verify Identity',
        description: 'Confirm student identity in person',
        icon: <User size={24} weight="duotone" />,
      },
      system: {
        role: 'system' as const,
        title: 'Grant Access',
        description: 'Enable exam interface for verified student',
        icon: <CheckCircle size={24} weight="duotone" />,
      },
      student: {
        role: 'student' as const,
        title: 'Complete Exam',
        description: 'Access exam and submit answers',
        icon: <ClipboardText size={24} weight="duotone" />,
      },
    },
  ];

  return (
    <>
      <SEOHead
        title="Rapid Prototyping with AI - Student Exam Login System Demo | HowToProto.ee"
        description="Interactive prototype demonstrating how public sector teams can rapidly validate digital solutions using AI tools like Cursor and Claude. Built for Estonian education system - showcases exam authentication flow from concept to working demo."
        keywords="AI prototyping, Cursor AI, Claude Sonnet, public sector innovation, exam authentication system, rapid prototyping methodology, government digital services, Estonia education technology, product management, AI development tools, React prototype"
        canonical="https://www.howtoproto.ee/"
      />
      <Header />
      <main className="flex-1 container mx-auto px-6 py-16 animate-page-enter">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Student Exam Login Prototype
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience a working prototype built in 8 hours. This interactive exam login system demonstrates 
            fast AI-powered prototyping for public sector validation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={scrollToFlow}>
              See How It Works
              <CaretRight size={20} weight="bold" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/presentation')}>
              Read Case Study
              <CaretRight size={20} weight="bold" />
            </Button>
          </div>
        </div>

        {/* Testing Tip Box */}
        <div ref={flowRef} className="max-w-4xl mx-auto mb-8">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <div className="text-blue-600 dark:text-blue-400 text-2xl flex-shrink-0">
                  💡
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Testing Tip
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Use the role switcher in the header to experience both Teacher and Student perspectives 
                    as you follow the authentication flow below. Each step shows what happens behind the scenes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visual Flow Diagram */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
            Process Flow
          </h2>
          <VerticalFlowStepper steps={flowSteps} />
        </div>

        {/* CTA Card to Presentation */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/40">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-3">
                Want to Learn How This Was Built?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Discover how this prototype saved weeks of development time and validated 
                stakeholder needs in just 8 hours
              </p>
              <Button size="lg" onClick={() => navigate('/presentation')}>
                View Full Case Study
                <CaretRight size={20} weight="bold" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

