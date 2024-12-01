import { FC, PropsWithChildren, useState } from 'react';
import { AuthContext } from './AuthContex';

export interface User {
  userName: string;
  role: string
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const isAuthenticated = auth.token !== undefined;
    return isAuthenticated;
  });
  const [user, setUser] = useState(() => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const user = auth.user || {};
    return user;
  });


  const setAuth = ({ isAuthenticated, user }: { isAuthenticated: boolean; user: User }) => {
    setIsAuthenticated(isAuthenticated);
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

type Props = PropsWithChildren;
