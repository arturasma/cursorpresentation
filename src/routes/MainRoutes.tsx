import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import Homepage from '@/pages/Homepage';
import AboutPage from '@/pages/AboutPage';
import FeedbackPage from '@/pages/FeedbackPage';
import StudentPage from '@/pages/StudentPage';
import TeacherPage from '@/pages/TeacherPage';
import ExamPage from '@/pages/ExamPage';

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole: 'student' | 'teacher' | 'both' }) {
  const { userRole } = useUser();
  
  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRole !== 'both' && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function RoleBasedRedirect() {
  const { userRole } = useUser();
  
  // Simple redirect based on role - no useEffect needed
  if (userRole === 'student') {
    return <Navigate to="/student" replace />;
  }
  
  if (userRole === 'teacher') {
    return <Navigate to="/teacher" replace />;
  }
  
  // No role selected - show homepage
  return <Homepage />;
}

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleBasedRedirect />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route 
          path="/student" 
          element={
            <ProtectedRoute allowedRole="student">
              <StudentPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher" 
          element={
            <ProtectedRoute allowedRole="teacher">
              <TeacherPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/exam/:id" 
          element={
            <ProtectedRoute allowedRole="both">
              <ExamPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

