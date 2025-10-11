import MainLayout from '@/layout/MainLayout';
import MainRoutes from '@/routes/MainRoutes';
import { UserProvider } from '@/context/UserContext';

function App() {
  return (
    <UserProvider>
      <MainLayout>
        <MainRoutes />
      </MainLayout>
    </UserProvider>
  );
}

export default App;
