import { LoginPage } from '@/pages/UserLogin/LoginPage';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
