import Header from '@/components/Header';

export default function Homepage() {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Exam Login System</h1>
        <p className="text-muted-foreground">
          This is a fast prototyping demonstration for streamlining student exam logins.
        </p>
      </main>
    </>
  );
}

