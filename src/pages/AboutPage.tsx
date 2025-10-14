import { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowSquareOut, CaretRight } from 'phosphor-react';

export default function AboutPage() {
  const location = useLocation();
  const navigate = useNavigate();

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
                <CardTitle>My Journey with This Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                This prototype grew directly from my real experience at the Estonian Ministry of Education and Research, where I worked on the national examination system. Every challenge you'll see in this case study—the authentication friction, the limited IT support during high-stakes exams, the coordination headaches—these aren't made-up scenarios. I lived through them while working alongside schools and students across Estonia.

                </p>
                <p className="text-muted-foreground">
                I built this demonstration because I kept thinking: what if we could have validated our ideas faster? What if we'd had better tools to gather stakeholder feedback early on? That's what this project explores. I originally created it for a Cursor meetup event, but the lessons here reach far beyond my specific context and apply to anyone building software that truly matters to people.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>A Bit About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                Hi, I'm <Link to="https://www.linkedin.com/in/arturas-mat%C5%A1enas/" className="text-primary hover:underline inline-flex items-center gap-1">
                    Arturas
                    <ArrowSquareOut size={16} weight="bold" />
                  </Link>. I've spent nearly a decade managing international projects across Sweden, Estonia, and Ukraine, working on software that connects governments with businesses, citizens, and other government agencies. Throughout this journey, I've seen both the best and worst of large-scale information systems—the elegant solutions and the painful technical debt, the projects that soared and the ones that stumbled.
                </p>
                <p className="text-muted-foreground">
                I've worked across the entire software lifecycle, from that first meeting where a client describes what they need, through analyzing their requirements and finding the right technical solution, all the way to delivery and support. I've led large, complex projects where getting the architecture right from the start can save—or cost—hundreds of thousands of euros down the line.
                </p>
                <p className="text-muted-foreground">
                That experience taught me something crucial: implementation costs aren't just about counting developer hours. Which technical choices will keep our hosting costs sustainable as we scale? How can we eliminate unnecessary steps from business processes rather than just automating inefficient ones? I've learned to constantly weigh these tradeoffs—sometimes choosing a less trendy technology because the total cost of ownership makes more sense, or redesigning a workflow entirely because removing steps beats building software to support them.
                </p>
                <p className="text-muted-foreground">
                Building the wrong solution, I've learned sometimes the hard way, costs far more than taking time to validate the right one. That's why I'm passionate about early prototyping, rapid feedback loops, and keeping stakeholders genuinely involved throughout development. Whether you're a project manager in the public sector, working at a development agency with government contracts, or a "product engineer" working with context-driven development, I hope you'll recognize these patterns and find something valuable here.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ready to Explore?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  I've organized everything into easy-to-navigate sections. Head to the Presentation page to walk through the full case study, or jump straight to the Homepage to experience the application flow yourself. Feel free to explore at your own pace.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => navigate('/presentation')}
                    size="lg"
                  >
                    Presentation Page
                    <CaretRight size={20} weight="bold" className="ml-2" />
                  </Button>
                  <Button 
                    onClick={() => navigate('/')}
                    variant="outline"
                    size="lg"
                  >
                    Homepage
                    <CaretRight size={20} weight="bold" className="ml-2" />
                  </Button>
                  <Button 
                    onClick={() => navigate('/how-built')}
                    variant="outline"
                    size="lg"
                  >
                    How Was This Site Built?
                    <CaretRight size={20} weight="bold" className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
