import MainLayout from '@/layout/MainLayout';
import MainRoutes from '@/routes/MainRoutes';
import { UserProvider } from '@/context/UserContext';
import { ExamProvider } from '@/context/ExamContext';
import { RatingProvider } from '@/context/RatingContext';

function App() {
  return (
    <UserProvider>
      <ExamProvider>
        <RatingProvider>
          <MainLayout>
            <MainRoutes />
          </MainLayout>
        </RatingProvider>
      </ExamProvider>
    </UserProvider>
  );
}

export default App;
