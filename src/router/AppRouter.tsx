import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { DashboardRouter } from './DashboardRouter';
import { useAuth } from '@/hooks/use-auth';

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  const prefix = isAuthenticated ? '/dashboard/inicio' : '/auth/login';

  return (
    <Routes>
      {isAuthenticated && <Route path='/dashboard/*' element={<DashboardRouter />} />}
      {!isAuthenticated && <Route path='/auth/*' element={<AuthRouter />} />}
      <Route path='/*' element={<Navigate to={prefix} />} />
    </Routes>
  );
};
