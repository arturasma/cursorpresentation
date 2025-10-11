import MainLayout from '@/layout/MainLayout';
import MainRoutes from '@/routes/MainRoutes';
import { UserProvider } from '@/context/UserContext';
import { ExamProvider } from '@/context/ExamContext';

function App() {
  return (
    <UserProvider>
      <ExamProvider>
        <MainLayout>
          <MainRoutes />
        </MainLayout>
      </ExamProvider>
    </UserProvider>
  );
}

export default App;
