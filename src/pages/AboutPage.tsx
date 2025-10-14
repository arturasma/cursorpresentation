import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowSquareOut } from 'phosphor-react';

export default function AboutPage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 break-words">
            About This Project
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 break-words">
            Learn more about this examination system prototype
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                  A real-world case study from the Estonian public sector
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  This prototype is based on my real experience working at the Estonian 
                  Ministry of Education and Research, where I was involved in the 
                  national examination system. The challenges described in this case 
                  study—from authentication friction to limited IT support during 
                  high-stakes exams—are not hypothetical. They are actual problems 
                  I witnessed firsthand while working with schools and students across Estonia.
                </p>
                <p className="text-muted-foreground">
                  I created this demonstration to showcase how rapid prototyping and 
                  AI-assisted development could have accelerated our validation process 
                  and stakeholder feedback cycles. This project was initially prepared 
                  for a Cursor meetup event and is primarily aimed at public sector 
                  project and product managers, as well as professionals in development 
                  agencies with public contracts—though the principles apply universally 
                  to anyone building software that matters.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About the Creator</CardTitle>
                <CardDescription>A brief introduction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  My name is <Link to="https://www.linkedin.com/in/arturas-mat%C5%A1enas/" className="text-primary hover:underline inline-flex items-center gap-1">
                    Arturas
                    <ArrowSquareOut size={16} weight="bold" />
                  </Link>, and I am an international e-governance project
                  manager with nearly a decade of experience in the B2G, G2C, and G2G
                  software sectors. Throughout my career, I have gained extensive
                  insight into the architecture and development of large-scale information
                  systems and high-availability applications.
                </p>
                <p className="text-muted-foreground">
                  I have witnessed firsthand the challenges of technical debt and the 
                  significant costs associated with building the wrong solutions or 
                  failing to build the right ones. These experiences have shaped my 
                  approach to project management and reinforced the importance of 
                  early validation, rapid prototyping, and continuous stakeholder 
                  feedback in delivering successful digital solutions.
                </p>
                <p className="text-muted-foreground">
                  While this project was originally built with the public sector in mind, 
                  this approach can be utilized by any project manager, product manager, 
                  or "product engineer" who works with context-driven coding. The 
                  principles of rapid prototyping and stakeholder collaboration are 
                  universal and applicable across all sectors and industries.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  Explore the different sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To view the case study, please visit the{' '}
                  <Link to="/presentation" className="text-primary hover:underline inline-flex items-center gap-1">
                    Presentation page
                    <ArrowSquareOut size={16} weight="bold" />
                  </Link>
                  . To test the application's flow, please proceed to the{' '}
                  <Link to="/" className="text-primary hover:underline inline-flex items-center gap-1">
                    Homepage
                    <ArrowSquareOut size={16} weight="bold" />
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
