import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowSquareOut } from 'phosphor-react';
/**
 * HowBuiltPage Component
 * 
 * Displays technical documentation about how this prototype was built,
 * including the tech stack, tools, and deployment process.
 * 
 * This page is publicly accessible without authentication and explains
 * the development approach and technologies used in this project.
 * 
 * @component
 * @returns {JSX.Element} The rendered How Built page with technical details
 * 
 * @example
 * // Used in routing configuration
 * <Route path="/how-built" element={<HowBuiltPage />} />
 */
export default function HowBuiltPage() {
  const location = useLocation();
  const consoleLogSectionRef = useRef<HTMLDivElement>(null);
  const hasLoggedRef = useRef(false);

  /**
   * Effect to scroll to top when page loads
   * Ensures users start at the top of the page when navigating
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /**
   * Effect to demonstrate console.log when user scrolls to that section
   * Meta-demonstration: shows console.log in action when reading about it
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoggedRef.current) {
            console.log('Hey there! You just scrolled to the Console.log section. This is console.log in action - pretty handy for debugging, right?');
            hasLoggedRef.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (consoleLogSectionRef.current) {
      observer.observe(consoleLogSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 break-words">
            How This Presentation Was Built
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 break-words">
            Technical stack and tools used to create this prototype
          </p>

          <div className="space-y-8">
            {/* 1. Cursor setup */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">1.</span>
                Cursor IDE
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <a 
                  href="https://cursor.sh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Cursor <ArrowSquareOut size={16} className="inline" />
                </a> is the most prominent and established AI-powered code editor for LLM-assisted development. It lets you build software by describing what you want in plain English. Instead of memorizing syntax and typing every line manually, you tell Cursor "add a loading spinner" or "validate this email field" and it writes the code for you. Think of it like having an expert developer who understands your entire project and can instantly implement your ideas.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Similar tools include <a 
                  href="https://code.visualstudio.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  VS Code <ArrowSquareOut size={16} className="inline" />
                </a> with AI extensions (free and highly customizable), <a 
                  href="https://windsurf.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Windsurf <ArrowSquareOut size={16} className="inline" />
                </a> (another AI-first editor), <a 
                  href="https://replit.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Replit <ArrowSquareOut size={16} className="inline" />
                </a> (works in your browser with zero setup), or <a 
                  href="https://lovable.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Lovable <ArrowSquareOut size={16} className="inline" />
                </a> (generates entire apps without touching code). The key difference: Cursor, Windsurf, and VS Code let you see and control every line of code, while Lovable builds everything behind the scenes. For learning and customization, seeing the code matters.
              </p>
            </section>
{/* 2. React Vite Project with TypeScript */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">2.</span>
                React + Vite Project with TypeScript
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <a 
                  href="https://react.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  React <ArrowSquareOut size={16} className="inline" />
                </a> is a popular framework for building interactive web applications. Think of it as a set of building blocks that makes it easier to create dynamic websites where things update without refreshing the page. While there are alternatives like <a 
                  href="https://angular.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Angular <ArrowSquareOut size={16} className="inline" />
                </a>, React has become the most widely adopted choice, which means more resources, more community support, and better AI assistance when building.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <a 
                  href="https://vitejs.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Vite <ArrowSquareOut size={16} className="inline" />
                </a> is the build tool that packages everything together—it's fast, simple, and perfect for single-page applications (SPAs) like this one. The alternative many developers use is <a 
                  href="https://nextjs.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Next.js <ArrowSquareOut size={16} className="inline" />
                </a>, which adds powerful features like server-side rendering, built-in routing, and API endpoints. But for a simple clickable prototype, Next.js would be overkill—it's like using a semi-truck when you just need a bicycle. Vite gives us exactly what we need: a lightweight setup that loads instantly and lets us focus on building the interface, not configuring infrastructure.
              </p>
            </section>

            {/* 3. PRD and Context Files */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">3.</span>
                PRD and Context Files
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Product Requirements Documents (PRDs) and context files are like instruction manuals for AI assistants. Without them, even the smartest AI might build something that doesn't match your vision. These documents tell the AI what you're building, how it should work, and why certain decisions were made.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A well-structured PRD typically includes:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Project Vision</strong> - What you're building, who it's for, and what problems it solves</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Feature List</strong> - Detailed descriptions of how each feature should work</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">User Flows</strong> - Step-by-step interactions from the user's perspective</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Technical Constraints</strong> - What technologies to use and what limitations exist</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Success Metrics</strong> - What "done" looks like for each feature</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Context files extend this by providing reference materials the AI can consult:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Architecture Decisions</strong> - Why certain technical choices were made</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Component Relationships</strong> - How different parts of the system work together</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Data Models</strong> - The structure and relationships of your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Edge Cases</strong> - Scenarios that need special handling</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                These documents become your "single source of truth." Instead of repeatedly explaining the same concepts, you reference the context file once, and the AI maintains consistency across all generated code. This dramatically reduces errors, ensures features work together properly, and speeds up development by eliminating repetitive explanations.
              </p>
            </section>

            {/* 4. Cursor Workflow Strategy */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">4.</span>
                Cursor Workflow Strategy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Working effectively with Cursor means understanding how to break down complex tasks and communicate clearly with the AI. Here's the workflow that maximizes results:
              </p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Plan Mode vs Agent Mode</h3>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Plan Mode</strong> - Use this for exploring ideas and getting suggestions. Perfect for questions like "How should I structure this feature?" or "What's the best approach for user authentication?" Plan mode helps you think through problems before writing code.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Agent Mode</strong> - This is where actual implementation happens. Agent mode can modify multiple files, create new components, and refactor existing code. It's powerful when you have a clear goal and want the AI to handle implementation details.</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Small Chunks Strategy</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Breaking work into smaller pieces isn't just about organization - it's about working within the AI's limits:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">File Size Matters</strong> - Keep individual files under 200-300 lines. Smaller files are easier for the AI to fully understand and modify accurately.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Single Responsibility</strong> - Each component or function should do one thing well. This makes it easier for the AI to understand context and suggest appropriate changes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Incremental Changes</strong> - Instead of asking for massive refactors, make small, testable changes. This reduces the chance of breaking existing functionality.</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Granular Flow Descriptions</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The more specific your descriptions, the better the AI performs. Here's the difference:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-muted-foreground mb-2">
                  <span className="text-red-500 font-semibold">Bad:</span> "Add user authentication"
                </p>
                <p className="text-muted-foreground">
                  <span className="text-green-500 font-semibold">Good:</span> "Create a login form with email and password fields. Validate email format on blur. Show password strength indicator. Display error messages below each field. On successful login, redirect to dashboard and store session token in localStorage."
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Detailed descriptions work better because:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>LLMs work better with concrete requirements than abstract concepts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Specific instructions reduce ambiguity and prevent incorrect assumptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Clear criteria make it obvious when a feature is complete</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Edge cases and error handling get addressed upfront rather than discovered later</span>
                </li>
              </ul>
            </section>

            {/* 5. TSDoc for Comments */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">5.</span>
                TSDoc for Comments
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                <a 
                  href="https://tsdoc.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  TSDoc <ArrowSquareOut size={16} className="inline" />
                </a> is a standardized way to write comments in your code that explain what each function does, what inputs it expects, and what it returns. Think of it like leaving clear instructions for your future self—or in this case, for AI assistants. When you use TSDoc comments, tools like Cursor can read them and understand exactly what your code is supposed to do. This means when you ask the AI to modify or extend a function, it already knows the context and can make smarter suggestions that actually work with your existing code. It's like giving the AI a user manual for your project, so it doesn't have to guess what things do or accidentally break something that was working.
              </p>
            </section>

            {/* 6. Console.log for Debugging */}
            <section ref={consoleLogSectionRef}>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">6.</span>
                Console.log for Debugging
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Console.log prints messages to your browser's developer console (press F12 to see it). It's the fastest way to check if things are working—like leaving breadcrumbs that show what's happening behind the scenes. For a prototype, it's perfect because you can instantly verify features are working without building fancy error tracking systems. As a PM, you can even open the console yourself during demos to see real-time feedback, making it easier to spot issues and validate that the prototype is doing what it's supposed to do.
              </p>
            </section>

            {/* 7. Local Storage for Everything */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">7.</span>
                Local Storage for Everything
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                For a clickable prototype, Local Storage is the fastest way to get a working demo without any infrastructure. Unlike production databases like PostgreSQL, SQLite, or Supabase that require server setup, credentials, hosting costs, and backend configuration, Local Storage works instantly in the browser with zero setup. There's no authentication to configure, no database schemas to design, and no API endpoints to build—data is saved directly on the user's device and available immediately. This means you can iterate rapidly, demonstrate core functionality, and validate ideas without getting bogged down in backend complexity. It's perfect for prototypes where the goal is to show <em>how something works</em> rather than building production-ready infrastructure. Of course, for a real application, you'd migrate to a proper database that handles multi-user access, data persistence, and security—but for proving a concept quickly, Local Storage is unbeatable.
              </p>
            </section>

            {/* 8. Design System */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">8.</span>
                Design System
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These design tools were specifically chosen because AI assistants like Claude and ChatGPT are exceptionally well-trained on them. This means the AI can generate accurate, production-ready components without requiring extensive manual adjustments—less code, better visual results. Here's what each component brings to the table:
              </p>
              <ul className="space-y-3 text-muted-foreground list-none">
                <li className="flex gap-3">
                  <span className="text-primary font-semibold shrink-0">•</span>
                  <div>
                    <strong className="text-foreground">TailwindCSS</strong> — A styling framework that uses simple, descriptive class names instead of writing custom CSS. Think of it like building with LEGO blocks: instead of crafting each piece from scratch, you combine pre-made utility classes to create exactly what you need. AI assistants are extremely proficient at assembling these classes into beautiful layouts.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold shrink-0">•</span>
                  <div>
                    <strong className="text-foreground">Shadcn UI</strong> — A collection of pre-built, accessible interface components like buttons, forms, dialogs, and cards. Rather than building every button or modal from the ground up, Shadcn provides battle-tested components that work out of the box and look professional. AI can instantly integrate these without worrying about accessibility or edge cases.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold shrink-0">•</span>
                  <div>
                    <strong className="text-foreground">TweakCN</strong> — A customization tool that makes it easy to adjust Shadcn components to match specific design needs. It bridges the gap between using ready-made components and making them feel unique to this application, giving flexibility without the overhead of building everything custom.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold shrink-0">•</span>
                  <div>
                    <strong className="text-foreground">Google Fonts</strong> — Professional, web-optimized typefaces that load quickly and look great across all devices. Using established fonts means the app feels polished and readable without the complexity of managing custom typography files or licenses.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-semibold shrink-0">•</span>
                  <div>
                    <strong className="text-foreground">Phosphor Icons</strong> — A comprehensive library of over 6,000 consistent icons covering everything from basic actions (edit, delete) to specific concepts (exams, students). Having a unified icon set ensures visual consistency throughout the app, and AI can reference these by name to quickly add the perfect icon for any situation.
                  </div>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Together, these tools create a powerful ecosystem where AI can quickly assemble polished interfaces that would traditionally take much longer to build from scratch. It's about working smarter by leveraging what AI already knows best.
              </p>
            </section>

            {/* 9. React Router DOM */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">9.</span>
                React Router DOM
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Handles navigation between different pages in the app. Makes URLs work like a traditional website while keeping everything fast and responsive.
              </p>
            </section>

            {/* 10. Folder Structure */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">10.</span>
                Folder Structure
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The application is organized into logical folders that separate different concerns, making it easier to find and update specific features. Here's how everything is structured:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`src/
├── components/          All the visual pieces users interact with
│   ├── features/        The core functionality organized by user type and purpose
│   │   ├── exam/        Everything for displaying and accessing exams
│   │   ├── feedback/    Forms and displays for collecting user opinions
│   │   ├── student/     Student-facing screens for joining and taking exams
│   │   └── teacher/     Teacher dashboard tools for creating and monitoring exams
│   ├── shared/          Reusable pieces that appear throughout the app (header, footer, etc.)
│   └── ui/              Foundation elements like buttons and forms that maintain consistency
│
├── context/             The "memory" that keeps track of what's happening across the app
│   ├── ExamContext      Remembers which exams exist, their status, and who's in them
│   ├── StudentContext   Tracks which students are registered and their current sessions
│   └── UserContext      Knows who you are and what permissions you have (teacher vs student)
│
├── layout/              Templates that ensure the app looks good on phones, tablets, and desktops
│
├── pages/               The main screens users navigate to (home, teacher dashboard, student view)
│
├── routes/              The navigation map that connects URLs to the right pages
│
├── types/               Definitions that ensure data is consistent and error-free throughout
│
└── utils/               Behind-the-scenes helpers that handle the heavy lifting
    ├── examStorage      Saves and retrieves exam data from the browser
    ├── feedbackStorage  Manages storing and loading user feedback
    ├── mockExamData     Pre-built sample exams for demos and testing
    ├── roomCodeGenerator Generates those unique 6-character exam codes
    └── studentRegistration Processes new student sign-ups and validates their info`}
              </pre>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Components</strong> are split into three categories: feature-specific ones organized by user role (teacher, student, exam), shared ones used across the app, and base UI elements that serve as building blocks.
                </p>
                <p>
                  <strong className="text-foreground">Context</strong> folders hold the "global state" - information that multiple parts of the app need to access, like which exams are active or who the current user is.
                </p>
                <p>
                  <strong className="text-foreground">Utils</strong> contain the business logic and data handling - everything from generating unique room codes to managing how data is saved and retrieved from browser storage.
                </p>
                <p>
                  This structure makes it straightforward to locate features: teacher tools live in <code className="text-sm bg-muted px-1.5 py-0.5 rounded">components/features/teacher</code>, student features in their own folder, and shared utilities are centralized for easy maintenance.
                </p>
              </div>
            </section>
{/* 11. Cursor rules*/}
<section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">11.</span>
                Cursor Rules
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <a 
                  href="https://docs.cursor.com/context/rules-for-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Cursor Rules <ArrowSquareOut size={16} className="inline" />
                </a> are instructions you give to the AI that apply to your entire project. Think of them as a style guide that ensures every piece of code the AI generates follows your preferences and standards. Without rules, the AI might use inconsistent formatting, add unnecessary comments, or make choices that don't match your project's conventions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For this project, the rules ensure consistency across all generated code. Here's a simple prompt that captures the essential guidelines:
              </p>
              <div className="relative">
                <button
                  onClick={() => {
                    const ruleText = `You are an expert TypeScript and React developer. Follow these rules for all code:

1. Use TSDoc comments for all functions, components, and complex logic
2. Organize code into logical folders (components/features, context, utils, pages)
3. Use TypeScript for type safety - define interfaces in src/types
4. Follow React best practices with functional components and hooks
5. Use Tailwind CSS for styling with responsive design patterns
6. Keep components focused and reusable
7. Store data in browser localStorage for persistence
8. Use meaningful variable and function names that explain their purpose

Style preferences:
- No emojis in code or comments
- Avoid em dashes (—) in documentation, use regular dashes (-) instead
- Use clear, professional language in all comments
- Prefer simple, readable code over clever shortcuts

These rules ensure the codebase remains maintainable and consistent.`;
                    navigator.clipboard.writeText(ruleText);
                    const button = document.activeElement as HTMLButtonElement;
                    const originalContent = button.innerHTML;
                    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>';
                    setTimeout(() => {
                      button.innerHTML = originalContent;
                    }, 2000);
                  }}
                  className="absolute top-2 right-2 p-2 bg-background/80 hover:bg-background rounded-md transition-colors"
                  title="Copy to clipboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-muted-foreground hover:text-foreground">
                    <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path>
                  </svg>
                </button>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`You are an expert TypeScript and React developer. Follow these rules for all code:

1. Use TSDoc comments for all functions, components, and complex logic
2. Organize code into logical folders (components/features, context, utils, pages)
3. Use TypeScript for type safety - define interfaces in src/types
4. Follow React best practices with functional components and hooks
5. Use Tailwind CSS for styling with responsive design patterns
6. Keep components focused and reusable
7. Store data in browser localStorage for persistence
8. Use meaningful variable and function names that explain their purpose

Style preferences:
- No emojis in code or comments
- Avoid em dashes (—) in documentation, use regular dashes (-) instead
- Use clear, professional language in all comments
- Prefer simple, readable code over clever shortcuts

These rules ensure the codebase remains maintainable and consistent.`}
                </pre>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                By setting these rules once, every AI-generated suggestion automatically follows your project's standards. This saves time reviewing code and prevents inconsistencies from creeping in as the project grows. The rules act as a contract between you and the AI, ensuring it understands not just what to build, but how to build it in a way that matches your existing codebase.
              </p>
            </section>
            {/* 12. GitHub */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">12.</span>
                GitHub
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This project uses a straightforward Git workflow as only one person is working on it with the following commands:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <code className="text-sm bg-muted px-1.5 py-0.5 rounded">git init</code>
                    <span className="ml-2">- Initialize the repository</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <code className="text-sm bg-muted px-1.5 py-0.5 rounded">git add .</code>
                    <span className="ml-2">- Stage all changes for commit</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <code className="text-sm bg-muted px-1.5 py-0.5 rounded">git commit -m "descriptive message"</code>
                    <span className="ml-2">- Commit staged changes with a clear description</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <code className="text-sm bg-muted px-1.5 py-0.5 rounded">git push</code>
                    <span className="ml-2">- Push commits to GitHub once features are complete</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <code className="text-sm bg-muted px-1.5 py-0.5 rounded">git reset --hard</code>
                    <span className="ml-2">- Roll back to previous versions when needed to maintain a clean history</span>
                  </div>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                For more information on Git basics, check out <a href="https://docs.github.com/en/get-started/using-git/about-git#basic-git-commands" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">GitHub's official documentation <ArrowSquareOut size={16} weight="bold" /></a>.
              </p>
            </section>

            {/* 13. Domain */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">13.</span>
                Domain
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The domain was purchased on <a href="https://www.zone.ee" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">zone.ee <ArrowSquareOut size={16} weight="bold" /></a> for 8.37€ + VAT, providing a professional web address for the application.
              </p>
            </section>

            {/* 14. Cloudflare Domain */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">14.</span>
                Cloudflare Domain Management
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                After purchasing the domain on zone.ee, the DNS management was transferred to <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Cloudflare <ArrowSquareOut size={16} weight="bold" /></a>. This provides several key benefits: automatic protection against malicious traffic and attacks, faster global access through their worldwide network, and seamless integration with deployment tools. Additionally, Cloudflare offers built-in analytics that track important performance metrics like INP (Interaction to Next Paint) and LCP (Largest Contentful Paint), which help monitor how quickly the site responds to user interactions and loads content. You can also see traffic patterns showing which countries visitors are coming from, providing valuable insights into your audience. Think of it as moving your domain's "control center" to a more robust platform that handles security and performance automatically while giving you visibility into how your site is performing globally, all without additional configuration.
              </p>
            </section>

            {/* 15. Cloudflare Pages */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">15.</span>
                Cloudflare Pages
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <a href="https://pages.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Cloudflare Pages <ArrowSquareOut size={16} weight="bold" /></a> is a hosting platform that makes deploying websites remarkably simple, though it's not the only option available. Popular alternatives include <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Vercel <ArrowSquareOut size={16} weight="bold" /></a> (known for its excellent Next.js integration and preview deployments) and <a href="https://www.hetzner.com/cloud/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Hetzner <ArrowSquareOut size={16} weight="bold" /></a> (offering more traditional VPS hosting with greater control but requiring more technical setup).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For this clickable prototype, Cloudflare Pages was chosen mainly since the domain is already on Cloudflare, everything works seamlessly together - DNS, SSL certificates, and deployment all in one place
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                For a simple React + Vite prototype focused on demonstrating functionality quickly, Cloudflare Pages offers the perfect balance: professional hosting with zero complexity. You commit your code, and it's live globally within minutes - no DevOps knowledge required. The automatic GitHub integration means you can focus entirely on building features rather than managing infrastructure.
              </p>
            </section>
              {/* 16. Contact me */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 flex items-baseline gap-3">
                <span className="text-primary">16.</span>
                Contact Me
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Feel free to find me on <a href="https://www.linkedin.com/in/arturas-mat%C5%A1enas/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">LinkedIn <ArrowSquareOut size={16} weight="bold" /></a> if you have questions on this prototype or you have any other consultancy needs.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

