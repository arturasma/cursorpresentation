import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import Homepage from '@/pages/Homepage';
import StudentPage from '@/pages/StudentPage';
import TeacherPage from '@/pages/TeacherPage';

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole: 'student' | 'teacher' }) {
  const { userRole } = useUser();
  
  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  
  if (userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function RoleBasedRedirect() {
  const { userRole } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userRole === 'student') {
      navigate('/student', { replace: true });
    } else if (userRole === 'teacher') {
      navigate('/teacher', { replace: true });
    }
  }, [userRole, navigate]);
  
  if (userRole === 'student') {
    return <Navigate to="/student" replace />;
  }
  
  if (userRole === 'teacher') {
    return <Navigate to="/teacher" replace />;
  }
  
  return <Homepage />;
}

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleBasedRedirect />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

