import { createContext } from 'react';

type Context = {
  isAuthenticated: boolean;
  userName: string;
  setAuth: (data: { isAuthenticated: boolean; name: string }) => void;
};

export const AuthContext = createContext<Context>({} as Context);
