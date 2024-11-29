import { AuthContext } from '@/context/AuthContex';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context == undefined) {
    throw new Error('Envolve your application into an AuthProvider');
  }

  return context;
};
