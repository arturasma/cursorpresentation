import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import SEOHead from '@/components/shared/SEOHead';
import FeedbackList from '@/components/features/feedback/FeedbackList';
import AddFeedbackForm from '@/components/features/feedback/AddFeedbackForm';
import SolutionRatingCard from '@/components/features/feedback/SolutionRatingCard';

export default function FeedbackPage() {
  const location = useLocation();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleFeedbackAdded = () => {
    // Trigger re-render of FeedbackList by changing key
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <SEOHead
        title="Give Feedback or Vote - Student Exam Login Prototype | HowToProto.ee"
        description="Share your feedback on this exam authentication prototype or vote on existing suggestions. Community-driven validation helps identify the most valuable improvements and prioritize features based on user needs."
        keywords="user feedback, community validation, prototype feedback, voting system, user testing, stakeholder input, public sector feedback"
        canonical="https://www.howtoproto.ee/feedback"
      />
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
          Give feedback or vote on the existing feedback
          </h1>
         
          {/* Solution Rating */}
          <SolutionRatingCard />

          {/* Feedback List */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">All Feedback</h2>
            <FeedbackList key={refreshKey} />
          </div>

          {/* Add Feedback Form */}
          <div>
            <AddFeedbackForm onFeedbackAdded={handleFeedbackAdded} />
          </div>
        </div>
      </main>
    </>
  );
}

