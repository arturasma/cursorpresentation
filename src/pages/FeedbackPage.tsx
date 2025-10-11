import Header from '@/components/Header';

export default function FeedbackPage() {
  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Feedback page
          </h1>
          <p className="text-xl text-muted-foreground">
            Give feedback or vote on the existing feedback
          </p>
        </div>
      </main>
    </>
  );
}

