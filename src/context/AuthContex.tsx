import { createContext } from 'react';
import { User } from './AuthProvider';

type Context = {
  isAuthenticated: boolean;
  user: User;
  setAuth: (data: { isAuthenticated: boolean; user: User }) => void;
};

export const AuthContext = createContext<Context>({} as Context);
